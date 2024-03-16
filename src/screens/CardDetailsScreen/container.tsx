import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { openModal } from 'utils/modal';
import { Block, Insurance, Pincode, UpdateCard } from 'assets/SVGs';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { BlockCardModal } from 'components/modals/BlockCardModal/BlockCardModal';
import { RequestStatusModal } from 'components/modals/RequestStatusModal/RequestStatusModal';
import {
  useBlockCardMutation,
  useCancelCardInsuranceMutation,
  useGetCustomerOperationsMutation,
  useRequestForPinMutation,
  useUnblockCardMutation,
} from 'services/apis/productsAPI/productsAPI';
import { closeModal } from 'utils/modal';
import { CARD_INSURANCE } from 'navigation/ScreenNames';
import { CardStatusCode, CardType } from 'services/apis/productsAPI/productsAPI.types';
import { useCulture, useGroupedAccountsByIban } from 'hooks';
import { getCurrentDateISO, getDateThreeMonthAgeISO } from 'utils/formatDate';
import { openToast } from 'utils/toast';
import { OTPModal } from 'components/modals';

export const useCardDetails = () => {
  const { t } = useTranslation();
  const { culture } = useCulture();
  const { groupedAccountsByIban } = useGroupedAccountsByIban();
  const { navigate } = useNavigation<ModalStackScreenProps<'CardInsuranceScreen'>>();
  const { params } = useRoute<ModalStackRouteProps<'CardDetailsScreen'>>();
  const { iban, index } = params || {};
  const [activeIndex, setActiveIndex] = useState(index ?? 0);
  const [activeAccountCards, setActiveAccountCards] = useState<CardType[]>([]);
  const [blockCard] = useBlockCardMutation();
  const [unblockCard] = useUnblockCardMutation();
  const [getLastTransactions, { data: lastTransactions }] = useGetCustomerOperationsMutation();
  const [cancelCardInsurance] = useCancelCardInsuranceMutation();
  const [requestForPin, { isLoading }] = useRequestForPinMutation();
  const [changingPin, setChangingPin] = useState(false);

  const activeAccount = useMemo(() => {
    return groupedAccountsByIban?.find(acc => acc?.iban === iban);
  }, [groupedAccountsByIban, iban]);

  useEffect(() => {
    if (activeAccount) {
      getLastTransactions({
        count: 4,
        startDate: getDateThreeMonthAgeISO(),
        endDate: getCurrentDateISO(),
        accountNumber: activeAccount?.accountNumber,
      });
    }
  }, [activeAccount, getLastTransactions]);

  useEffect(() => {
    if (activeAccount?.cards) {
      setActiveAccountCards(activeAccount?.cards);
    }
  }, [activeAccount, iban]);

  const activeCard = useMemo(() => {
    return activeAccountCards?.[activeIndex];
  }, [activeAccountCards, activeIndex]);

  const blockedAmounts = useMemo(() => {
    return activeAccount?.accounts
      ?.filter(item => item?.blockedAmount)
      ?.map(({ blockedAmount, ccy }) => ({
        blockedAmount,
        ccy,
      }));
  }, [activeAccount?.accounts]);

  const updateCardManually = useCallback(() => {
    const updatedCard: CardType = {
      ...activeCard,
      isInsured: false,
    };

    setActiveAccountCards(prev => {
      return prev.map(card => (card.id === activeCard.id ? updatedCard : card));
    });
  }, [activeCard]);

  const handleCancelInsurance = useCallback(() => {
    if (!activeCard) {
      return;
    }
    cancelCardInsurance({
      culture,
      cardId: activeCard.id,
      anyData: '',
      approvalCode: '',
    })
      .unwrap()
      .then(() => {
        updateCardManually();
        openToast(t('common.successfullyOperation'), 'success');
      });
  }, [activeCard, cancelCardInsurance, culture, t, updateCardManually]);

  const cancelInsurance = useCallback(() => {
    Alert.alert(t('products.cancelInsuranceMessage'), '', [
      {
        text: t('common.no'),
        style: 'cancel',
      },
      {
        text: t('common.yes'),
        onPress: handleCancelInsurance,
        style: 'destructive',
      },
    ]);
  }, [t, handleCancelInsurance]);

  const handleInsurancePress = useCallback(() => {
    if (activeCard) {
      navigate(CARD_INSURANCE, { iban, activeCard });
    }
  }, [activeCard, iban, navigate]);

  const blockPress = useCallback(
    (shouldBlock: boolean) => {
      if (shouldBlock) {
        blockCard({ cardId: activeCard?.id })
          .unwrap()
          .then(() => {
            openModal({
              element: (
                <RequestStatusModal success message="ბარათი დაბლოკილია" onClose={closeModal} />
              ),
              disablePanning: true,
            });
          })
          .catch(() => {
            openModal({
              element: (
                <RequestStatusModal
                  success={false}
                  message="დაფიქსირდა შეცდომა"
                  onClose={closeModal}
                />
              ),
              disablePanning: true,
            });
          });
      } else {
        unblockCard({ cardId: activeCard?.id })
          .unwrap()
          .then(() => {
            openModal({
              element: (
                <RequestStatusModal success message="ბარათი განბლოკილია" onClose={closeModal} />
              ),
              disablePanning: true,
            });
          })
          .catch(() => {
            openModal({
              element: (
                <RequestStatusModal
                  success={false}
                  message="დაფიქსირდა შეცდომა"
                  onClose={closeModal}
                />
              ),
              disablePanning: true,
            });
          });
      }
    },
    [blockCard, activeCard, unblockCard],
  );

  const handleBlockCard = useCallback(
    (shouldBlock: boolean) => {
      const blockAction = shouldBlock ? 'Block' : 'Unblock';
      openModal({
        element: (
          <BlockCardModal
            shouldBlock={shouldBlock}
            onClose={closeModal}
            onPress={() => blockPress(shouldBlock)}
          />
        ),
        title: `products.${blockAction}Card`,
        titlePosition: 'center',
        disablePanning: true,
      });
    },
    [blockPress],
  );

  const onFinished = useCallback(
    (otp: string) => {
      // TODO change condition
      if (otp === '000000') {
        closeModal();
        setChangingPin(true);
        requestForPin({
          otp,
          culture,
          cardId: activeCard?.id,
          sendOtp: false,
          generateNewPin: true,
        })
          .unwrap()
          .then(() => {
            openToast(t('common.successfullyOperation'), 'success');
          })
          .catch(err => {
            if ('data' in err && err?.data?.detail) {
              openToast(err.data.detail, 'error');
            }
          })
          .finally(() => {
            setChangingPin(false);
          });
      }
    },
    [activeCard, culture, requestForPin, t],
  );

  const changePinCode = useCallback(() => {
    requestForPin({
      sendOtp: true,
    });

    openModal({
      element: <OTPModal onFinished={onFinished} />,
      withKeyboard: true,
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [onFinished, requestForPin]);

  const handlePinChange = useCallback(() => {
    Alert.alert(t('products.updatePin'), '', [
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
      {
        text: t('common.confirm'),
        onPress: changePinCode,
        style: 'destructive',
      },
    ]);
  }, [t, changePinCode]);

  const getUpdatedActions = useCallback(
    (isBlocked: boolean, isTemporarilyInactive: boolean) => {
      const defaultActions = [
        {
          title: 'products.updateCard',
          icon: <UpdateCard />,
          isUpdate: true,
          handlePress: () => {},
        },
        {
          title: 'products.insurance',
          icon: <Insurance />,
          handlePress: handleInsurancePress,
        },
        {
          title: 'products.block',
          icon: <Block />,
          handlePress: () => handleBlockCard(true),
        },
        {
          title: 'products.changePin',
          icon: <Pincode />,
          handlePress: handlePinChange,
        },
      ];

      if (isBlocked || isTemporarilyInactive) {
        return defaultActions.slice(1);
      }

      return defaultActions;
    },
    [handleBlockCard, handleInsurancePress, handlePinChange],
  );

  const actions = useMemo(() => {
    const isBlocked = activeCard?.status === CardStatusCode.Blocked;
    const isTemporarilyInactive = activeCard?.status === CardStatusCode.TemporarilyInactive;

    let updatedActions = getUpdatedActions(isBlocked, isTemporarilyInactive);

    if (activeCard?.status === CardStatusCode.Issued) {
      updatedActions = updatedActions.map(action => {
        if (action.title === 'products.block') {
          return {
            title: 'products.unblockCard',
            icon: <Block />,
            handlePress: () => handleBlockCard(false),
          };
        }
        return action;
      });
    }

    if (activeCard?.isInsured) {
      updatedActions = updatedActions.map(action => {
        if (action.title === 'products.insurance') {
          return {
            title: 'products.cancelInsurance',
            icon: <Insurance />,
            handlePress: cancelInsurance,
          };
        }
        return action;
      });
    }

    return updatedActions;
  }, [activeCard, cancelInsurance, getUpdatedActions, handleBlockCard]);

  return {
    actions,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    activeAccountCards,
    activeCard,
    setActiveIndex,
    iban,
    isLoading,
    changingPin,
  };
};

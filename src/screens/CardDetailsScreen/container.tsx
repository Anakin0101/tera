import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { openModal } from 'utils/modal';
import { Block, Insurance, Pincode, UpdateCard } from 'assets/SVGs';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { BlockCardModal } from 'components/modals/BlockCardModal/BlockCardModal';
import { RequestStatusModal } from 'components/modals/RequestStatusModal/RequestStatusModal';
import {
  useBlockCardMutation,
  useCancelCardInsuranceMutation,
  useGetCustomerOperationsMutation,
  useGetOfferByIdQuery,
  useRequestForPinMutation,
  useUnblockCardMutation,
} from 'services/apis/productsAPI/productsAPI';
import { closeModal } from 'utils/modal';
import { CARD_INSURANCE } from 'navigation/ScreenNames';
import { CardStatusCode, CardType } from 'services/apis/productsAPI/productsAPI.types';
import { useCulture, useGroupedAccountsByIban } from 'hooks';
import { getCurrentDateISO, getDateThreeMonthAgeISO, isExpired } from 'utils/formatDate';
import { OTPModal } from 'components/modals';
import { CARD_INSURANCE_ID } from 'constants/common';
import { Colors } from 'theme/Variables';

export const useCardDetails = () => {
  const { culture, isGeo } = useCulture();
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

  const activeCard = useMemo(() => {
    return activeAccountCards?.[activeIndex];
  }, [activeAccountCards, activeIndex]);

  const { data: offers } = useGetOfferByIdQuery(
    {
      culture,
      cardId: activeCard?.id,
      offerId: CARD_INSURANCE_ID,
    },
    { skip: !activeCard },
  );

  const insurancePackage = useMemo(() => {
    const insurance = offers?.cardInsuranceProducts?.find(product => product?.isActive);

    if (insurance) {
      return isGeo ? insurance?.nameKa : insurance?.nameEn;
    }

    return '';
  }, [isGeo, offers?.cardInsuranceProducts]);

  const isActiveCardBlocked = useMemo(() => {
    return (
      activeCard?.status === CardStatusCode.Blocked ||
      activeCard?.status === CardStatusCode.TemporarilyInactive
    );
  }, [activeCard]);

  const isActiveCardExpired = useMemo(() => {
    return isExpired(activeCard?.endDate);
  }, [activeCard]);

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

  const showResponsePopup = useCallback((message: string, isSuccess = true) => {
    openModal({
      element: <RequestStatusModal success={isSuccess} message={message} onClose={closeModal} />,
      disablePanning: true,
    });
  }, []);

  const showConfirmPopup = useCallback((title: string, content: string, onPress: () => void) => {
    openModal({
      element: <BlockCardModal content={content} onPress={onPress} />,
      title,
      titlePosition: 'center',
      disablePanning: true,
    });
  }, []);

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
      return prev.map(card => (card?.id === activeCard?.id ? updatedCard : card));
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
        showResponsePopup('common.successfullyOperation');
      })
      .catch(() => {
        showResponsePopup('cardDetails.error', false);
      });
  }, [activeCard, cancelCardInsurance, culture, showResponsePopup, updateCardManually]);

  const cancelInsurance = useCallback(() => {
    if (isActiveCardBlocked) return;
    showConfirmPopup(
      'cardDetails.cancelInsurance',
      'products.cancelInsuranceMessage',
      handleCancelInsurance,
    );
  }, [handleCancelInsurance, isActiveCardBlocked, showConfirmPopup]);

  const handleInsurancePress = useCallback(() => {
    if (isActiveCardBlocked) return;
    if (activeCard) {
      navigate(CARD_INSURANCE, { iban, activeCard });
    }
  }, [activeCard, iban, isActiveCardBlocked, navigate]);

  const handleBlock = useCallback(() => {
    blockCard({
      culture,
      cardId: activeCard?.id,
    })
      .unwrap()
      .then(() => {
        showResponsePopup('cardDetails.isBlocked');
      })
      .catch(() => {
        showResponsePopup('cardDetails.error', false);
      });
  }, [activeCard?.id, blockCard, culture, showResponsePopup]);

  const onFinishedOtpUnblockCard = useCallback(
    (otp: string) => {
      // TODO change condition
      if (otp === '000000') {
        unblockCard({
          otp,
          culture,
          sendOtp: false,
          cardId: activeCard?.id,
        })
          .unwrap()
          .then(() => {
            showResponsePopup('cardDetails.isUnblocked');
          })
          .catch(() => {
            showResponsePopup('cardDetails.error', false);
          });
      }
    },
    [activeCard?.id, culture, showResponsePopup, unblockCard],
  );

  const handleUnblock = useCallback(() => {
    unblockCard({ sendOtp: true });

    openModal({
      element: <OTPModal onFinished={onFinishedOtpUnblockCard} />,
      withKeyboard: true,
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [onFinishedOtpUnblockCard, unblockCard]);

  const onBlockCardPress = useCallback(() => {
    showConfirmPopup('products.blockCard', 'products.blockCardMessage', handleBlock);
  }, [handleBlock, showConfirmPopup]);

  const onUnlockCardPress = useCallback(() => {
    showConfirmPopup('products.unblockTitle', 'products.unblockCardMessage', handleUnblock);
  }, [handleUnblock, showConfirmPopup]);

  const onFinishedOtpPin = useCallback(
    (otp: string) => {
      // TODO change condition
      if (otp === '000000') {
        closeModal();
        setChangingPin(true);
        requestForPin({
          otp,
          culture,
          sendOtp: false,
          generateNewPin: true,
          cardId: activeCard?.id,
        })
          .unwrap()
          .then(() => {
            showResponsePopup('cardDetails.pinAsSms');
          })
          .catch(() => {
            showResponsePopup('cardDetails.tryLater', false);
          })
          .finally(() => {
            setChangingPin(false);
          });
      }
    },
    [activeCard?.id, culture, requestForPin, showResponsePopup],
  );

  const changePinCode = useCallback(() => {
    requestForPin({ sendOtp: true });

    openModal({
      element: <OTPModal onFinished={onFinishedOtpPin} />,
      withKeyboard: true,
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [onFinishedOtpPin, requestForPin]);

  const handlePinChange = useCallback(() => {
    if (isActiveCardBlocked) return;
    showConfirmPopup('cardDetails.updatePin', 'products.updatePin', changePinCode);
  }, [changePinCode, isActiveCardBlocked, showConfirmPopup]);

  const actions = useMemo(() => {
    const color = isActiveCardExpired || isActiveCardBlocked ? Colors.textBlack400 : Colors.primary;

    const renewalAction = {
      icon: <UpdateCard />,
      title: 'products.updateCard',
      handlePress: () => {},
    };

    const defaultActions = [
      {
        icon: <Insurance color={color} />,
        title: activeCard?.isInsured ? 'products.cancelInsurance' : 'products.insurance',
        handlePress: activeCard?.isInsured ? cancelInsurance : handleInsurancePress,
      },
      {
        icon: <Block color={isActiveCardExpired ? Colors.textBlack400 : Colors.primary} />,
        title: isActiveCardBlocked ? 'products.unblockCard' : 'products.block',
        handlePress: isActiveCardBlocked ? onUnlockCardPress : onBlockCardPress,
      },
      {
        icon: <Pincode color={color} />,
        title: 'products.changePin',
        handlePress: handlePinChange,
      },
    ];

    if (isActiveCardExpired) {
      defaultActions.unshift(renewalAction);
    }

    return defaultActions;
  }, [
    isActiveCardBlocked,
    isActiveCardExpired,
    activeCard,
    cancelInsurance,
    handleInsurancePress,
    onUnlockCardPress,
    onBlockCardPress,
    handlePinChange,
  ]);

  return {
    actions,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    activeAccountCards,
    activeCard,
    setActiveIndex,
    isLoading,
    changingPin,
    insurancePackage,
  };
};

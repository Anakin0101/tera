import React, { useState, useMemo, useCallback } from 'react';
import { openModal } from 'utils/modal';
import { groupCardsByPan } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Block, Insurance, Pincode, UpdateCard } from 'assets/SVGs';
import { ProductsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { BlockCardModal } from 'components/modals/BlockCardModal/BlockCardModal';
import { RequestStatusModal } from 'components/modals/RequestStatusModal/RequestStatusModal';
import {
  useBlockCardMutation,
  useUnblockCardMutation,
} from 'services/apis/productsAPI/productsAPI';
import { closeModal } from 'utils/modal';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';

export const useCardDetails = (index: number) => {
  const [activeIndex, setActiveIndex] = useState(index);
  const { lastTransactions, cards, groupedAccountsByIban } = useAppSelector(
    state => state.products,
  );
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardInsuranceScreen'>>();

  const [BlockCard] = useBlockCardMutation();
  const [UnblockCard] = useUnblockCardMutation();

  const card = useMemo(() => {
    return cards[activeIndex];
  }, [cards, activeIndex]);

  const account = useMemo(() => {
    return groupedAccountsByIban[activeIndex];
  }, [groupedAccountsByIban, activeIndex]);

  const blockedAmounts = useMemo(() => {
    return account?.accounts
      .filter(item => item.blockedAmount)
      .map(({ blockedAmount, ccy }) => ({
        blockedAmount,
        ccy,
      }));
  }, [account?.accounts]);

  const cardsAttachedToAccount = useMemo(() => {
    return account?.accounts.filter(item => item.cards).flatMap(item => item.cards);
  }, [account?.accounts]);

  const groupedCardsByPan = useMemo(() => {
    return groupCardsByPan(cardsAttachedToAccount, 'pan');
  }, [cardsAttachedToAccount]);

  const handleInsurancePress = useCallback(() => {
    navigate('CardInsuranceScreen');
  }, [navigate]);

  const blockPress = (shouldBlock: boolean) => {
    if (shouldBlock) {
      BlockCard({
        cardId: card.id,
      })
        .unwrap()
        .then(response => {
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
      UnblockCard({
        cardId: card.id,
      })
        .unwrap()
        .then(response => {
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
  };

  const handleBlockCard = (shouldBlock: boolean) => {
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
  };

  const getUpdatedActions = (isBlocked: boolean, isTemporarilyInactive: boolean) => {
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
        handlePress: () => {},
      },
    ];

    if (isBlocked || isTemporarilyInactive) {
      return defaultActions.slice(1);
    }

    return defaultActions;
  };

  const actions = useMemo(() => {
    const currentCard = cards[activeIndex];
    console.log(currentCard, 'currentCard');
    const isBlocked = currentCard?.status === CardStatusCode.Blocked;
    const isTemporarilyInactive = currentCard?.status === CardStatusCode.TemporarilyInactive;
    let updatedActions = getUpdatedActions(isBlocked, isTemporarilyInactive);
    if (currentCard?.status === CardStatusCode.Issued) {
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

    return updatedActions;
  }, [cards, activeIndex, handleBlockCard, handleInsurancePress]);

  return {
    account,
    groupedAccountsByIban,
    actions,
    groupedCardsByPan,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    cards,
    card,
    setActiveIndex,
  };
};

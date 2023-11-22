import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { Slider, LastTransactions, Wallet } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { Block, Insurance, Pincode } from 'assets/SVGs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps, ProductsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openModal } from 'utils/modal';
import { BlockCardModal } from 'components/modals/BlockCardModal/BlockCardModal';
import { CardHolderDetails } from './CardHolderDetails';
import { CardSliderItem } from './CardSliderItem';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'information', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'CardDetailsScreen'>>();
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardInsuranceScreen'>>();
  const { lastTransactions, cards } = useAppSelector(state => state.products);
  const [activeIndex, setActiveIndex] = useState(params.index);

  const card = useMemo(() => {
    return cards[activeIndex];
  }, [cards, activeIndex]);

  const handleInsurancePress = useCallback(() => {
    navigate('CardInsuranceScreen', {
      cardId: card.id,
    });
  }, [card.id, navigate]);

  const handleBlockCard = () => {
    openModal({
      element: <BlockCardModal />,
      title: 'products.blockCard',
      titlePosition: 'center',
      disablePanning: true,
    });
  };

  const actions = useMemo(
    () => [
      {
        title: 'products.insurance',
        icon: <Insurance />,
        handlePress: handleInsurancePress,
      },
      {
        title: 'products.block',
        icon: <Block />,
        handlePress: handleBlockCard,
      },
      {
        title: 'products.changePin',
        icon: <Pincode />,
        handlePress: () => {},
      },
    ],
    [handleInsurancePress],
  );

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return (
          <Slider
            data={cards}
            renderItem={CardSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 'wallet':
        return <Wallet />;
      case 'details':
        return (
          <CardHolderDetails
            accountNumber={card.pan}
            endDate={card.endDate}
            cvv={String(card.priority)}
          />
        );
      case 'information':
        return (
          <Details
            information
            cardHolder={card.cardHolder}
            name={card?.cardProductName}
            displayDivider={!!lastTransactions?.length}
          />
        );
      case 'transactions':
        return (
          <LastTransactions
            data={lastTransactions}
            sectionTitle="products.lastTransactions"
            style={styles.transactionsContainer}
            headerLabelStyle={styles.headerLabelStyle}
            headerContaienrStyle={styles.backgroundWhite}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

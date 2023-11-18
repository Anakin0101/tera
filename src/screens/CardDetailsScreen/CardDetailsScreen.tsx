import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { CardsAndAccountsSlider, LastTransactions, Wallet } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { Block, Insurance, Pincode } from 'assets/SVGs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps, ProductsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openModal } from 'utils/modal';
import { BlockCardModal } from 'components/modals/BlockCardModal/BlockCardModal';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'CardDetailsScreen'>>();
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardInsuranceScreen'>>();
  const { lastTransactions, groupedAccountsByIban } = useAppSelector(state => state.products);
  const { cards } = useAppSelector(state => state.products);
  const [activeIndex, setActiveIndex] = useState(params.index);

  const account = useMemo(() => {
    return groupedAccountsByIban[activeIndex];
  }, [groupedAccountsByIban, activeIndex]);

  const handleInsurancePress = useCallback(() => {
    navigate('CardInsuranceScreen');
  }, [navigate]);

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

  if (!account) {
    return null;
  }

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return (
          <CardsAndAccountsSlider
            actions={actions}
            iban={params.iban}
            data={cards}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
            displayCards
          />
        );
      case 'wallet':
        return <Wallet />;
      case 'details':
        return (
          <Details
            name={account?.accountName}
            iban={account?.iban}
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

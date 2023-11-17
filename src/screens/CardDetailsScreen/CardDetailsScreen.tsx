import React, { useCallback, useMemo } from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { CardsSlider } from '../AccountDetailsScreen/CardsSlider';
import { LastTransactions, Wallet } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { Block, Insurance, Pincode } from 'assets/SVGs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps, ProductsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { CardHolderDetails } from './CardHolderDetails';

// const actions = [
//   {
//     title: 'products.insurance',
//     icon: <Insurance />,
//   },
//   {
//     title: 'products.block',
//     icon: <Block />,
//   },
//   {
//     title: 'products.changePin',
//     icon: <Pincode />,
//   },
// ];

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
  const { item } = params;
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardInsuranceScreen'>>();
  const { lastTransactions } = useAppSelector(state => state.products);
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === params.iban),
  );
  const { cards } = useAppSelector(state => state.products);
  console.log(params, 'account');
  const sliderData = useMemo(() => {
    if (!account) {
      return [];
    }
    return cards.map(card => ({
      card,
      accounts: account?.accounts,
    }));
  }, [account, cards]);

  const handleInsurancePress = useCallback(() => {
    navigate('CardInsuranceScreen');
  }, [navigate]);

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
        handlePress: () => {},
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
        return <CardsSlider actions={actions} iban={params.iban} data={sliderData} />;
      case 'wallet':
        return <Wallet />;
      case 'details':
        return (
          <CardHolderDetails
            accountNumber={item.accountNumber}
            endDate={item.endDate}
            cvv={item.priority}
          />
        );
      case 'information':
        return (
          <Details
            information
            cardHolder={item?.cardHolder}
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

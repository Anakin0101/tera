import React, { FC, useCallback, useEffect } from 'react';
import { SectionList, View } from 'react-native';
import { useTheme } from 'hooks';
import { useTeraProducts } from './teraProductsContainer';
import { useIsFocused } from '@react-navigation/native';
import { Button, CardsAndAccounts, DepositsList, Divider, LoansList } from 'components';
import { useStyles } from './ProductsScreen.styles';
import { Plus } from 'assets/SVGs';
import { FooterProps } from './ProductsScreen.types';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'accounts', data: [{}] },
  { title: 'deposits', data: [{}] },
  { title: 'loans', data: [{}] },
];

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} />;
};

const SectionListFooter: FC<FooterProps> = ({ onNewProductsPress }) => {
  const styles = useStyles();
  return (
    <View style={styles.footer}>
      <Button.Primary
        text="products.new"
        fullWidth
        leftIcon={LeftIcon}
        onPress={onNewProductsPress}
      />
      <Button.Secondary
        fullWidth
        text="products.history"
        customWrapperStyle={styles.historyButton}
      />
    </View>
  );
};

const TeraBankProducts = () => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const {
    totalAvailableBalanceGEL,
    deposits,
    totalDeposits,
    totalLoans,
    groupedAccountsByIban,
    allLoans,
    onNewProductsPress,
    refetch,
    creditDisbursements,
  } = useTeraProducts();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  const renderSectionListItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'accounts':
          return (
            <CardsAndAccounts
              accounts={groupedAccountsByIban}
              totalAvailableBalance={totalAvailableBalanceGEL}
              showDivider={!!deposits?.length || !!allLoans?.length}
            />
          );
        case 'deposits':
          return (
            <DepositsList
              data={deposits}
              totalAmount={totalDeposits}
              displayDivider={!!allLoans?.length}
            />
          );
        case 'loans':
          return (
            <LoansList
              data={allLoans}
              creditDisbursements={creditDisbursements}
              totalAmount={totalLoans}
            />
          );
        default:
          return null;
      }
    },
    [
      allLoans,
      deposits,
      groupedAccountsByIban,
      totalAvailableBalanceGEL,
      totalDeposits,
      totalLoans,
      creditDisbursements,
    ],
  );

  return (
    <View style={styles.sectionListWrapper}>
      <Divider color={Colors.white} height={24} />
      <SectionList
        bounces={false}
        sections={sections}
        renderItem={renderSectionListItem}
        ListFooterComponent={<SectionListFooter onNewProductsPress={onNewProductsPress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.sectionListContent}
      />
    </View>
  );
};

export default TeraBankProducts;

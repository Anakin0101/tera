import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { useTheme } from 'hooks';
import { useTeraProducts } from './teraProductsContainer';
import { Button, CardsAndAccounts, DepositsAndLoans, Divider } from 'components';
import { useStyles } from './ProductsScreen.styles';
import { Plus } from 'assets/SVGs';

const sections = [
  { title: 'accounts', data: [{}] },
  { title: 'deposits', data: [{}] },
  { title: 'loans', data: [{}] },
];

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.white} />;
};

const SectionListFooter = () => {
  const styles = useStyles();
  return (
    <View style={styles.footer}>
      <Button.Primary text="products.new" fullWidth leftIcon={LeftIcon} />
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
    loans,
    totalLoans,
    groupedAccountsByIban,
  } = useTeraProducts();

  const renderSectionListItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'accounts':
        return (
          <CardsAndAccounts
            accounts={groupedAccountsByIban}
            totalAvailableBalance={totalAvailableBalanceGEL}
            showDivider={!!deposits?.length || !!loans?.length}
          />
        );
      case 'deposits':
        return (
          <DepositsAndLoans
            data={deposits}
            variant="deposit"
            totalAmount={totalDeposits}
            displayDivider={!!loans?.length}
          />
        );
      case 'loans':
        return <DepositsAndLoans data={loans} variant="loan" totalAmount={totalLoans} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.sectionListWrapper}>
      <Divider color={Colors.white} height={24} />
      <SectionList
        bounces={false}
        sections={sections}
        renderItem={renderSectionListItem}
        ListFooterComponent={SectionListFooter}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.sectionListContent}
      />
    </View>
  );
};

export default TeraBankProducts;

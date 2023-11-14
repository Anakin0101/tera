import React from 'react';
import { View } from 'react-native';
import { AssetsCard, Divider, Text } from 'components';
import { useStyles } from './DashboardAssets.styles';
import useTheme from 'hooks/useTheme';
import { calculateSum } from 'utils/calculateSum';

const filterAssetsAndCalculateSum = (assets: any[], currencyToExclude: string) => {
  const filteredAssets = assets.filter(
    (asset: { currency: any }) => asset.currency !== currencyToExclude,
  );
  return calculateSum(filteredAssets, 'amount');
};

export const DashboardAssets = ({ creditCards, overDraft, getLoanCustomerId, assets }: any) => {
  const styles = useStyles();

  const { Colors } = useTheme();

  const liabilitiesSum = calculateSum(overDraft, 'overdraftLimit');
  const creditCardLoansSum = calculateSum(creditCards, 'creditLimit');
  const getLoanCustomerIdSum = calculateSum(
    getLoanCustomerId !== undefined ? getLoanCustomerId : [],
    'amount',
  );

  const assetsSum = filterAssetsAndCalculateSum(assets !== undefined ? assets : [], 'USD');

  const totalSum = liabilitiesSum + creditCardLoansSum + getLoanCustomerIdSum;

  return (
    <>
      <View
        style={{
          paddingLeft: 24,
          paddingVertical: 32,
          backgroundColor: 'white',
        }}
      >
        <View style={styles.dashboardTemplatesContainer}>
          <View style={styles.headerContainer}>
            <Text
              children={'dashboard.assets'}
              style={styles.titleContainer}
              color={Colors.textBlack}
            />
            <AssetsCard assetsSum={assetsSum} totalSum={totalSum} />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

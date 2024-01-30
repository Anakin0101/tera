import React from 'react';
import { View } from 'react-native';
import { AssetsCard, Divider, Text } from 'components';
import { useStyles } from './DashboardAssets.styles';
import useTheme from 'hooks/useTheme';
import { calculateSum } from 'utils/calculateSum';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconComponent } from 'components';
import Images from 'theme/Images';
import { useDispatch } from 'react-redux';
import { setMaskDebit } from 'store/slices/dashboard';

const filterAssetsAndCalculateSum = (assets: any[], currencyToExclude: string) => {
  const filteredAssets = assets.filter(
    (asset: { currency: any }) => asset.currency !== currencyToExclude,
  );
  const totalAmount = calculateSum(filteredAssets, 'amount');
  const totalCurrency = filteredAssets.length > 0 ? filteredAssets[0].currency : '';
  return { amount: totalAmount, currency: totalCurrency };
};

export const DashboardAssets = ({ creditCards, overDraft, getLoanCustomerId, assets }: any) => {
  const securePension = useAppSelector(state => state.dashboard.maskDebit);
  const styles = useStyles();
  const dispatch = useDispatch();
  const { Colors } = useTheme();

  const handleSecurePensionToggle = () => {
    dispatch(setMaskDebit(!securePension));
  };

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
      {assetsSum.amount > 0 ? (
        <>
          <View style={styles.assetsView}>
            <View style={styles.dashboardTemplatesContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.wrapMask}>
                  <Text
                    children={'dashboard.assets'}
                    style={styles.titleContainer}
                    color={Colors.textBlack}
                  />
                  <TouchableOpacity style={styles.mask} onPress={() => handleSecurePensionToggle()}>
                    <IconComponent
                      pngLocalIcon={!securePension ? Images().OpenEye : Images().CloseEye}
                      customIconComponentStyles={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                <AssetsCard
                  assetsSum={assetsSum.amount}
                  totalSum={totalSum}
                  currency={assetsSum.currency}
                />
              </View>
            </View>
          </View>
          <Divider />
        </>
      ) : null}
    </>
  );
};

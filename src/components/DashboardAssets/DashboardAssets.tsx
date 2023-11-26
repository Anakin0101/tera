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
import { setMaskText } from 'store/slices/dashboard';

const filterAssetsAndCalculateSum = (assets: any[], currencyToExclude: string) => {
  const filteredAssets = assets.filter(
    (asset: { currency: any }) => asset.currency !== currencyToExclude,
  );
  return calculateSum(filteredAssets, 'amount');
};

export const DashboardAssets = ({ creditCards, overDraft, getLoanCustomerId, assets }: any) => {
  const securePension = useAppSelector(state => state.dashboard.maskText);
  const styles = useStyles();
  const dispatch = useDispatch();
  const { Colors } = useTheme();

  const handleSecurePensionToggle = () => {
    dispatch(setMaskText(!securePension));
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
            <AssetsCard assetsSum={assetsSum} totalSum={totalSum} />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

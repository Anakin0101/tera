import React from 'react';
import { View } from 'react-native';
import { CardItem, Divider, Text } from 'components';
import { useStyles } from './DashboardPensionFund.styles';
import useTheme from 'hooks/useTheme';
import Images from 'theme/Images';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setMaskText } from 'store/slices/dashboard';
import { IconComponent } from 'components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
export const DashboardPensionFund = ({ data }: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const securePension = useAppSelector(state => state.dashboard.maskText);

  const handleSecurePensionToggle = () => {
    dispatch(setMaskText(!securePension));
  };

  return (
    <>
      <View style={styles.pensionView}>
        <View style={styles.dashboardTemplatesContainer}>
          <View>
            <View style={styles.dashboardPensionfundWrapper}>
              <Text
                children={'dashboard.pension'}
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
            <View style={styles.wrapper}>
              <CardItem
                title={t('dashboard.savings')}
                fromPension
                value={data}
                iconSource={Images().PensionIcon}
                isSecure
                currency="₾"
              />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './TransferDetailScreen.styles';
import { IconComponent } from 'components';
import Images from 'theme/Images';
import { TransferDetailsList } from './TransferDetailsList';
import { Button } from 'components';
import { verticalScale } from 'utils/config';
export const TransferDetailScreen = () => {
  const styles = useStyleTheme();

  const selectedItemFromStore = useAppSelector(state => state.transfers);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerWrapper}>
          <View style={styles.card}>
            <IconComponent
              pngLocalIcon={Images().LiabilitiesIcon}
              customIconComponentStyles={styles.customIconComponentStyles}
            />
            <View>
              <Text children="პირადი გადარიცხვა/კონვერტაცია" style={{ fontSize: 14 }} />
              <Text children="120₾" style={{ fontSize: 16, fontWeight: 'bold' }} />
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.wrapper}>
            <TransferDetailsList selectedItemFromStore={selectedItemFromStore} />
          </View>
        </View>
        <View style={{ marginTop: verticalScale(100) }}>
          <Button.Primary text="გადარიცხვა" fixedWidth />
        </View>
      </View>
    </>
  );
};

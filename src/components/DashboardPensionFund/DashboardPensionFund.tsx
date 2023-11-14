import React from 'react';
import { View } from 'react-native';
import { CardItem, Divider, Text } from 'components';
import { useStyles } from './DashboardPensionFund.styles';
import useTheme from 'hooks/useTheme';
import Images from 'theme/Images';

export const DashboardPensionFund = ({ data }: any) => {
  const styles = useStyles();

  const { Colors } = useTheme();

  return (
    <>
      <View style={styles.pensionView}>
        <View style={styles.dashboardTemplatesContainer}>
          <View>
            <Text
              children={`dashboard.pension`}
              style={styles.titleContainer}
              color={Colors.textBlack}
            />
            <View style={styles.wrapper}>
              <CardItem title="დანაზოგი" value={data} iconSource={Images().PensionIcon} isSecure />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

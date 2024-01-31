import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './DashboardUpcoming.styles';
import useTheme from 'hooks/useTheme';
import { UpcomingOpsCard } from 'components/UpcomingOpsCard/UpcomingOpsCard';
import { Divider } from 'components';
import { PayListEndCard } from 'components/PayListEndCard/PayListEndCard';

export const DashboardUpcomingOps = ({ data }: any) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  //   TBD - fix type
  const renderItem = ({ item }: { item: any }) => (
    <UpcomingOpsCard {...item} length={data.length} />
  );

  const renderFooter = () => {
    return data.length > 2 ? <PayListEndCard onPress={() => {}} /> : null;
  };

  return (
    <>
      {data?.length > 0 ? (
        <>
          <View style={styles.dashboardUpcomingOpsContainer}>
            <View style={styles.headerContainer}>
              <Text
                children={'dashboard.upcomingTransactions'}
                style={styles.titleContainer}
                color={Colors.textBlack}
              />
            </View>
            <View style={styles.dashboardTemplatesWrapper}>
              <FlatList
                style={styles.dashboardTemplatesContent}
                horizontal
                scrollEnabled={data.length > 2}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={renderFooter}
              />
            </View>
          </View>
          <Divider />
        </>
      ) : null}
    </>
  );
};

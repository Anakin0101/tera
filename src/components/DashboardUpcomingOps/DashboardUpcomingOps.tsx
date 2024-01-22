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
                renderItem={({ item }) => <UpcomingOpsCard {...item} length={data.length} />}
                keyExtractor={item => String(item.id)}
                ListFooterComponent={
                  data.length > 2 ? () => <PayListEndCard onPress={() => {}} /> : null
                }
              />
            </View>
          </View>
          <Divider />
        </>
      ) : null}
    </>
  );
};

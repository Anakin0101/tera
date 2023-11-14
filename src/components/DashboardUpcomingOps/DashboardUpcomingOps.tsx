import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './DashboardUpcoming.styles';
import useTheme from 'hooks/useTheme';
import { UpcomingOpsCard } from 'components/UpcomingOpsCard/UpcomingOpsCard';
import { Divider } from 'components';

export const DashboardUpcomingOps = ({ data }: any) => {
  const styles = useStyles();
  const { Colors } = useTheme();

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
              children={'dashboard.upcomingTransactions'}
              style={styles.titleContainer}
              color={Colors.textBlack}
            />
          </View>
          <View style={styles.dashboardTemplatesWrapper}>
            <FlatList
              style={styles.dashboardTemplatesContent}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => {
                return <UpcomingOpsCard {...item} />;
              }}
              keyExtractor={item => String(item.id)}
            />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

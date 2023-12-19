import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { useStyles } from './DashboardOperations.styles';
import useTheme from 'hooks/useTheme';
import { OperationsCard } from 'components/OperationsCard/OperationsCard';
import { Transactions } from 'services/apis/dashboardAPI/dashboardAPI.types';

type DashboardOperationsProps = {
  data?: Transactions[];
};

export const DashboardOperations: FC<DashboardOperationsProps> = ({ data }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.dashboardView}>
          <View style={styles.dashboardTemplatesContainer}>
            <View style={styles.headerContainer}>
              <Text
                children={'dashboard.transactions'}
                style={styles.titleContainer}
                color={Colors.textBlack}
              />
            </View>
            <View style={styles.dashboardTemplatesWrapper}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                // TODO - check with Back end - opId or opUId do not come from back end
                renderItem={({ item, index }) => (
                  <OperationsCard {...item} showUnderline={data && index < data?.length - 1} />
                )}
                // TODO - key is duplicated!!!
                keyExtractor={item => `test---${item.docDate}`}
              />
            </View>
          </View>
        </View>
        <Button.Outline fixedWidth text="dashboard.all" />
      </View>
      <Divider />
    </>
  );
};

import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { useStyles } from './DashboardOperations.styles';
import useTheme from 'hooks/useTheme';

import { OperationsCard } from 'components/OperationsCard/OperationsCard';
export const DashboardOperations = ({ data }: any) => {
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
                renderItem={({ item, index }) => {
                  return <OperationsCard {...item} index={index} data={data} />;
                }}
                keyExtractor={index => String(index)}
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

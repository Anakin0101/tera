import React, { useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Divider, LoadingInView } from 'components';
import { AtmAndBranchItem } from '../AtmAndBranchItem/AtmAndBranchItem';
import { useAtmsAndBranches } from 'screens/AtmsAndBranchesScreen/container';
import { ServiceCentersResponse } from 'services/apis/profileAPI/profileAPI.types';
import { useStyleTheme } from '../AtmsAndBranchesTabs/AtmsAndBranchesTabs.styles';
import { sortLocationsByDistance } from 'utils/sortLocationsByDistance';

export const BranchesList = ({
  currentLocation,
}: {
  currentLocation: { latitude: number; longitude: number };
}) => {
  const styles = useStyleTheme();
  const { fetchBranches, serviceCenters, handleOpenDetails, isServiceCentersLoading } =
    useAtmsAndBranches();

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const renderItem: ListRenderItem<ServiceCentersResponse> = ({ item }) => {
    return (
      <AtmAndBranchItem
        item={item}
        type={'BRANCHES'}
        handleOpenDetails={handleOpenDetails}
        currentLocation={currentLocation}
      />
    );
  };

  const itemSeparator = () => <Divider height={1} style={styles.itemSeparatorStyle} />;

  const listHeader = () => <View />;

  if (isServiceCentersLoading) {
    return <LoadingInView />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={
          currentLocation
            ? sortLocationsByDistance(currentLocation, serviceCenters)
            : serviceCenters
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

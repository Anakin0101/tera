import React, { useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Divider, LoadingInView } from 'components';
import { AtmAndBranchItem } from '../AtmAndBranchItem/AtmAndBranchItem';
import { AtmsResponse } from 'services/apis/profileAPI/profileAPI.types';
import { useAtmsAndBranches } from 'screens/AtmsAndBranchesScreen/container';
import { useStyleTheme } from '../AtmsAndBranchesTabs/AtmsAndBranchesTabs.styles';
import { sortLocationsByDistance } from 'utils/sortLocationsByDistance';

export const AtmsList = ({
  currentLocation,
}: {
  currentLocation: { latitude: number; longitude: number };
}) => {
  const styles = useStyleTheme();
  const { fetchAtms, atms, handleOpenDetails, isAtmsLoading } = useAtmsAndBranches();

  useEffect(() => {
    fetchAtms();
  }, [fetchAtms]);

  const renderItem: ListRenderItem<AtmsResponse> = ({ item }) => {
    return (
      <AtmAndBranchItem
        item={item}
        type={'ATMS'}
        handleOpenDetails={handleOpenDetails}
        currentLocation={currentLocation}
      />
    );
  };

  const itemSeparator = () => <Divider height={1} style={styles.itemSeparatorStyle} />;

  const listHeader = () => <View />;

  if (isAtmsLoading) {
    return <LoadingInView />;
  }
  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={currentLocation ? sortLocationsByDistance(currentLocation, atms) : atms}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponent={listHeader}
      />
    </View>
  );
};

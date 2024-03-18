import { Button } from 'components/index';
import React from 'react';
import { View } from 'react-native';
import { Location } from 'assets/SVGs';
import { useStyleTheme } from './LocationSelector.styles';
import { useAtmsAndBranches } from 'screens/AtmsAndBranchesScreen/container';

export const LocationSelector = ({ isPermissionGranted }: { isPermissionGranted?: boolean }) => {
  const styles = useStyleTheme();
  const { openLocationSettings } = useAtmsAndBranches();
  return !isPermissionGranted ? (
    <View style={styles.buttonContainer}>
      <Button.Secondary
        hitSlop={10}
        text={'atmsAndBranches.near'}
        onPress={openLocationSettings}
        customWrapperStyle={styles.container}
        leftIcon={Location}
        customLeftIconStyle={styles.leftIcon}
      />
    </View>
  ) : (
    <></>
  );
};

import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './LocationSettingsModal.styles';
import { Button, Text } from 'components';

import { Location } from 'assets/SVGs';
import { closeModal } from 'utils/modal';

export type LocationSettingsModalProps = {
  handlePress: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

export const LocationSettingsModal: FC<LocationSettingsModalProps> = ({
  handlePress,
  title = 'atmsAndBranches.title',
  description = 'atmsAndBranches.description',
  primaryButtonText = 'atmsAndBranches.primaryCTA',
  secondaryButtonText = 'atmsAndBranches.secondaryCTA',
}) => {
  const styles = useStyleTheme();

  const handleCancelButtonPress = () => {
    closeModal?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Location style={styles.icon} width={20} height={20} />
        <Text style={styles.text} children={title} />
        <Text children={description} style={styles.label} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button.Text text={secondaryButtonText} size="large" onPress={handleCancelButtonPress} />
        <Button.Primary text={primaryButtonText} size="large" onPress={handlePress} />
      </View>
    </View>
  );
};

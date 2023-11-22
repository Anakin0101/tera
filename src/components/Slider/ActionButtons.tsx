import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { ActionButtonProps } from './Slider.types';
import { useStyles } from './Slider.styles';

export const ActionButtons: FC<ActionButtonProps> = ({ actions }) => {
  const styles = useStyles();
  return (
    <View style={styles.actionButtonsContainer}>
      {actions?.map(action => (
        <Pressable onPress={action.handlePress} key={action.title}>
          <View style={styles.actionWrapper} key={action.title}>
            <View style={styles.iconContainer}>{action.icon}</View>
            <View style={styles.actionButtonLabel}>
              <Text label children={action.title} center />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

import React, { FC } from 'react';
import { View } from 'react-native';
import { ActionButtonProps } from './AccountDetailsScreen.types';
import { Text } from 'components';
import { useStyles } from './AccountDetailsScreen.styles';

export const ActionButtons: FC<ActionButtonProps> = ({ actions }) => {
  const styles = useStyles();
  return (
    <View style={styles.actionButtonsContainer}>
      {actions?.map(action => (
        <View style={styles.actionWrapper} key={action.title}>
          <View style={styles.iconContainer}>{action.icon}</View>
          <View style={{ maxWidth: 85, marginTop: 12 }}>
            <Text label children={action.title} center />
          </View>
        </View>
      ))}
    </View>
  );
};

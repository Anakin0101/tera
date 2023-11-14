import React from 'react';
import { View } from 'react-native';
import { Card, Note, Share, Swap } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './AccountDetailsScreen.styles';

const actions = [
  {
    title: 'products.transfer',
    icon: <Swap />,
  },
  {
    title: 'products.payments',
    icon: <Card />,
  },
  {
    title: 'products.requisite',
    icon: <Note />,
  },
  {
    title: 'products.share',
    icon: <Share />,
  },
];

export const ActionButtons = () => {
  const styles = useStyles();
  return (
    <View style={styles.actionButtonsContainer}>
      {actions.map(action => (
        <View style={styles.actionWrapper} key={action.title}>
          <View style={styles.iconContainer}>{action.icon}</View>
          <Text label children={action.title} marginTop={12} />
        </View>
      ))}
    </View>
  );
};

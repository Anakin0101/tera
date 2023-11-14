import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { DetailsItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

export const DetailsItem: FC<DetailsItemProps> = ({ label, value, icon, onPress }) => {
  const styles = useStyles();
  const isBlockedFundsSection = label === 'products.blockedFunds';

  return (
    <View style={styles.detailsContainer}>
      <View style={isBlockedFundsSection ? styles.blockedFundsContainer : styles.detailsWrapper}>
        <View>
          <Text children={label} color={Colors.textBlack500} />
          <Text children={value} />
        </View>
        <Pressable
          onPress={onPress}
          style={isBlockedFundsSection ? styles.blockedFundsIcon : styles.detailsIconContainer}
        >
          {icon}
        </Pressable>
      </View>
    </View>
  );
};

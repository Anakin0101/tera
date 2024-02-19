import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './BlockCardModal.styles';
import { blockCardProps } from './BlockCardModal.types';

export const BlockCardModal: FC<blockCardProps> = ({ onPress, shouldBlock }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.header}>
        <Text
          center
          children={!shouldBlock ? 'transactions.unblockCard' : 'transactions.blockCard'}
          color={Colors.textBlack500}
        />
      </View>
      <Button.Primary
        onPress={onPress}
        fixedWidth
        text="common.confirm"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
};

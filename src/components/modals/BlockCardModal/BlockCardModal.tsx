import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './BlockCardModal.styles';
import { blockCardProps } from './BlockCardModal.types';

export const BlockCardModal: FC<blockCardProps> = ({ onPress, content }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.header}>
        <Text center children={content} color={Colors.textBlack500} />
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

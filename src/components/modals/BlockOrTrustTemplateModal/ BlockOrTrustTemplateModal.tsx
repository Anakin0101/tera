import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './BlockOrTrustTemplateModal.styles';
import { templateCardProps } from './BlockOrTrustTemplateModal.types';

export const BlockOrTrustTemplateModal: FC<templateCardProps> = ({ onPress, shouldBlock }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.header}>
        <Text
          center
          children={!shouldBlock ? 'transactions.trustedTemplate' : 'transactions.deleteTemplate'}
          color={Colors.textBlack500}
        />
      </View>
      <Button.Primary
        onPress={() => {
          onPress();
        }}
        fixedWidth
        text="common.confirm"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
};

import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './BlockCardModal.styles';

export const BlockCardModal = () => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.header}>
        <Text
          center
          children={'ნამდვილად გსურთ “ჩემი ბარათის”\nდაბლოკვა?'}
          color={Colors.textBlack500}
        />
      </View>
      <Button.Primary
        fixedWidth
        text="common.confirm"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
};

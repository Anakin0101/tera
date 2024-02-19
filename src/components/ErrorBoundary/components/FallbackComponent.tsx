import { Text } from 'components/Text/Text';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useStyles } from './FallbackComponent.styles';
import { Image } from 'components/Image/Image';
import Images from 'theme/Images';
import { Button } from 'components/Button/Button';

export const FallbackComponent = ({ onRetry }: { onRetry: () => void }) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Image
            source={Images().FallbackComponentImage}
            resizeMode={'cover'}
            style={styles.imageContainer}
          />
          <Text children={'error.component_title'} style={styles.title} />
          <Text children={'error.component_description'} style={styles.text} />
        </View>
        <Button.Primary text="common.try_again" onPress={onRetry} fullWidth />
      </View>
    </SafeAreaView>
  );
};

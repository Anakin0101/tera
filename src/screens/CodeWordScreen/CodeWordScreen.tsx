import React from 'react';
import { useStyles } from './CodeWordScreen.styles';
import { View } from 'react-native';
import { Text } from 'components/index';

export const CodeWordScreen = () => {
  const styles = useStyles();
  //   const { navigate } = useNavigation<RegistrationStackScreenProps<'VerificationScreen'>>();

  return (
    <View style={styles.container}>
      <Text children={'CodeWordScreen'} />
    </View>
  );
};

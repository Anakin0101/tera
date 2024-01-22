import React from 'react';
import { useStyles } from './RegistrationFinishScreen.styles';
import { View } from 'react-native';
import { Text } from 'components/index';

export const RegistrationFinishScreen = () => {
  const styles = useStyles();
  //   const { navigate } = useNavigation<RegistrationStackScreenProps<'VerificationScreen'>>();

  return (
    <View style={styles.container}>
      <Text children={'RegistrationFinishScreen'} />
    </View>
  );
};

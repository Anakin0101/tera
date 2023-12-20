import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'components';
import { useStyles } from './PrivateTransactionScreen.styles';
import { TextInput } from 'components';
import { useDispatch } from 'react-redux';
import { setSelectedData } from 'store/slices/transfers/indext';
import { useNavigation } from '@react-navigation/native';
// import { useRoute } from '@react-navigation/native';
// import { TransactionsStackRouteProps } from 'navigation/types';

export const PrivateTransactionScreen = () => {
  // const { params } = useRoute<TransactionsStackRouteProps<'PrivateTransactionScreen'>>();

  const { goBack } = useNavigation();
  const styles = useStyles();
  const dispatch = useDispatch();

  const [textInputValue, setTextInputValue] = useState<string>('');

  const handleSaveOtherValue = () => {
    dispatch(setSelectedData(textInputValue));
    goBack();
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={{ marginLeft: 20, width: '90%' }}>
          <TextInput
            label="დანიშნულება"
            marginTop={32}
            autoFocus
            inputStyle={{}}
            onChangeText={text => setTextInputValue(text)}
          />
          <View style={{ marginTop: 20 }}>
            <Button.Primary fixedWidth text="შენახვა" onPress={handleSaveOtherValue} />
          </View>
        </View>
      </View>
    </View>
  );
};

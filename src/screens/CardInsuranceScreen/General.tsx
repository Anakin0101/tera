import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './CardInsuranceScreen.styles';

const data = [
  {
    name: 'ანაზღაურებადი ოპერაციების რაოდენობა',
    value: '10 არარეგულარული ოპერაცია',
  },
  {
    name: 'პლასტირუკი ბარათის დაზღვევის ვადა',
    value: 'მიბმულია ბარათის ვადაზე',
  },
];

export const General = () => {
  const styles = useStyles();

  return (
    <View style={styles.generalWrapper}>
      {data.map((item, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.imageContainer} />
          <View style={styles.details}>
            <Text label marginTop={2} children={item.name} color={Colors.textBlack500} />
            <Text children={item.value} medium size={16} marginTop={5} />
            {index !== data.length - 1 && <Divider height={1} marginTop={18} width="100%" />}
          </View>
        </View>
      ))}
    </View>
  );
};

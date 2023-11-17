import React, { Fragment } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './RequisitesModal.styles';
import { EngFlag, GeoFlag } from 'assets/SVGs';

const languages = [
  {
    lng: 'common.georgian',
    icon: <GeoFlag />,
  },
  {
    lng: 'common.english',
    icon: <EngFlag />,
  },
];

export const RequisitesModal = () => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.header}>
        <Text children="products.requestRequisites" color={Colors.textBlack500} />
        <Text>უნივერსალურ ანგარიშზე</Text>
      </View>
      <View style={styles.wrapper}>
        {languages.map((item, index) => (
          <Fragment key={index}>
            <Pressable style={styles.cotainer}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text children={item.lng} />
            </Pressable>
            {!index && <Divider style={styles.divider} height={1} />}
          </Fragment>
        ))}
      </View>
    </View>
  );
};

import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { useStyles } from './CardInsuranceScreen.styles';
import { TermItemProps } from './CardInsuranceScreen.types';
import { Colors } from 'theme/Variables';

export const TermItem: FC<TermItemProps> = memo(({ label, value, showDivider = true }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.terms}>
        <View style={styles.nameContainer}>
          <Text children={label} />
        </View>
        <View style={styles.limitContainer}>
          <Text demiBold children={value} />
        </View>
      </View>
      {showDivider && (
        <Divider
          width="100%"
          height={1}
          marginTop={20}
          marginBottom={20}
          color={Colors.inputBlack50}
        />
      )}
    </View>
  );
});

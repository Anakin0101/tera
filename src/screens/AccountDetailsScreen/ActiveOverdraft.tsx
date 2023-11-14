import React from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { ChevronRight } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { config } from 'utils/config';
import { useStyles } from './AccountDetailsScreen.styles';

const PROGRESS_WIDTH = config.mobileWidth - 48 - 12 - 48;

const AVAILABLE = 300;
const MAX = 1000;

export const ActiveOverdraft = () => {
  const styles = useStyles();
  return (
    <View style={[styles.overdraftWrapper]}>
      <View style={[styles.overdraftContainer]}>
        <Text children="products.overdraft" size={18} demiBold marginTop={32} />
        <View style={styles.overdraftDetailsWrapper}>
          <View style={styles.cardContainer} />
          <View>
            <View style={styles.overdraftDetails}>
              <View>
                <Text children="products.availableAmount" color={Colors.textBlack500} />
                <View style={styles.overdraftAmount}>
                  <Text
                    children={`$ ${formatMoney(AVAILABLE)}`}
                    color={Colors.successToastTextColor}
                    size={16}
                  />
                  <Text children={` / $ ${formatMoney(MAX)}`} size={16} />
                </View>
              </View>
              <Pressable>
                <ChevronRight />
              </Pressable>
            </View>
            <View style={styles.progress}>
              <View style={[styles.indicator, { width: (PROGRESS_WIDTH / MAX) * AVAILABLE }]} />
            </View>
          </View>
        </View>
      </View>
      <Divider marginTop={32} marginBottom={32} />
    </View>
  );
};

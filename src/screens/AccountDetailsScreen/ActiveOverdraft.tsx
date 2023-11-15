import React from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { ChevronRight } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { config } from 'utils/config';
import { useStyles } from './AccountDetailsScreen.styles';
import { RelatedOverdraft } from './AccountDetailsScreen.types';
import { CurrencySignMap } from 'utils/CurrencySignMap';

const PROGRESS_WIDTH = config.mobileWidth - 48 - 12 - 48;

export const ActiveOverdraft = ({ relatedOverdraft }: { relatedOverdraft?: RelatedOverdraft }) => {
  const styles = useStyles();

  if (!relatedOverdraft) {
    return null;
  }

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
                    children={`${CurrencySignMap[relatedOverdraft.currency]} ${formatMoney(
                      relatedOverdraft.usedPrincipalAmount,
                    )}`}
                    color={Colors.success}
                    size={16}
                  />
                  <Text
                    children={` / ${CurrencySignMap[relatedOverdraft.currency]} ${formatMoney(
                      relatedOverdraft.overdraftLimit,
                    )}`}
                    color={Colors.accountText500}
                    size={14}
                  />
                </View>
              </View>
              <Pressable>
                <ChevronRight />
              </Pressable>
            </View>
            <View style={styles.progress}>
              <View
                style={[
                  styles.indicator,
                  {
                    width:
                      (PROGRESS_WIDTH / relatedOverdraft.overdraftLimit) *
                      relatedOverdraft.usedPrincipalAmount,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
      <Divider marginTop={32} />
    </View>
  );
};

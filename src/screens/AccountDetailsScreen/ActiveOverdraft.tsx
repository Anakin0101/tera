import React, { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Divider, ProgressBar, Text } from 'components';
import Images from 'theme/Images';
import { config } from 'utils/config';
import { Colors } from 'theme/Variables';
import { ChevronRight } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { ActiveOverdraftProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

const PROGRESS_WIDTH = config.mobileWidth - 48 - 12 - 48;

export const ActiveOverdraft: FC<ActiveOverdraftProps> = ({ relatedOverdraft }) => {
  const styles = useStyles();

  if (!relatedOverdraft) {
    return null;
  }

  return (
    <View style={[styles.overdraftWrapper]}>
      <View style={[styles.overdraftContainer]}>
        <Text children="products.overdraft" size={18} demiBold marginTop={32} />
        <View style={styles.overdraftDetailsWrapper}>
          <View style={styles.cardContainer}>
            <Image source={Images().Overdraft} />
          </View>
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
            <ProgressBar
              width={PROGRESS_WIDTH}
              max={relatedOverdraft.overdraftLimit}
              used={relatedOverdraft.usedPrincipalAmount}
              marginTop={16}
            />
          </View>
        </View>
      </View>
      <Divider marginTop={32} />
    </View>
  );
};

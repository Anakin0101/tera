import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { useTheme } from 'hooks';
import { Settings } from 'assets/SVGs';
import { Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { HeaderProps } from './CardsAndAccounts.types';
import { useStyles } from './CardsAndAccounts.styles';

export const ListHeader: FC<HeaderProps> = memo(({ amount, showTitle, groupedUserBalance = 0 }) => {
  const styles = useStyles();
  const { Colors, Spacing } = useTheme();

  return (
    <View style={styles.headerWrapper}>
      {showTitle && (
        <View style={styles.headerContainer}>
          <Text
            title
            color={Colors.textBlack500}
            translateProp={{ value: amount }}
            children="products.accountsAndCards"
          />
          <View style={styles.iconContainer}>
            <Settings />
          </View>
        </View>
      )}
      <Text regular size={30} lineHeight={36} marginTop={!showTitle ? Spacing.xl : Spacing.zero}>
        {formatMoney(groupedUserBalance, CurrencyEnum.GEL)}
      </Text>
    </View>
  );
});

import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { ChevronRight, Copy, Edit } from 'assets/SVGs';
import { useStyles } from './AccountDetailsScreen.styles';
import { DetailsItem } from './DetailsItem';

export const Details = () => {
  const styles = useStyles();

  return (
    <View style={styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <Text children="products.details" size={18} demiBold />
        <DetailsItem
          label="products.name"
          value="უნივერსალური ანგარიში"
          icon={<Edit />}
          onPress={() => {}}
        />
        <DetailsItem
          label="products.accountNumber"
          value="GE48ZD000000034769234800"
          icon={<Copy />}
          onPress={() => {}}
        />
        <DetailsItem
          label="products.blockedFunds"
          value={formatMoney(2405)}
          icon={<ChevronRight />}
          onPress={() => {}}
        />
      </View>
      <Divider marginTop={32} />
    </View>
  );
};

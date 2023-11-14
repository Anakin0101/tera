import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { DetailsItem } from './DetailsItem';
import { formatMoney } from 'utils/formatMoney';
import { ChevronRight, Copy, Edit } from 'assets/SVGs';
import { DetailsProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

export const Details: FC<DetailsProps> = ({ name, iban, blockedAmount = 2405 }) => {
  const styles = useStyles();

  return (
    <View style={styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <Text children="products.details" size={18} demiBold />
        <DetailsItem label="products.name" value={name} icon={<Edit />} onPress={() => {}} />
        <DetailsItem
          label="products.accountNumber"
          value={iban}
          icon={<Copy />}
          onPress={() => {}}
        />
        <DetailsItem
          label="products.blockedFunds"
          value={formatMoney(blockedAmount)}
          icon={<ChevronRight />}
          onPress={() => {}}
        />
      </View>
      <Divider marginTop={32} />
    </View>
  );
};

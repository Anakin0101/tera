import React, { FC } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { DetailsItem } from './DetailsItem';
import { formatMoney } from 'utils/formatMoney';
import { ChevronRight, Copy, Edit } from 'assets/SVGs';
import { DetailsProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { openModal } from 'utils/modal';
import { ChangeAccountNameModal } from 'components/modals';
import { useTranslation } from 'react-i18next';

export const Details: FC<DetailsProps> = ({ name, iban, blockedAmount = 2405, displayDivider }) => {
  console.log(name, iban, (blockedAmount = 2405), displayDivider, 'displayDivider');
  const styles = useStyles();
  const { t } = useTranslation();

  const handleChangeName = () => {
    openModal({
      element: <ChangeAccountNameModal name={name} />,
      title: t('products.changeName'),
      titlePosition: 'center',
      enableDynamicSizing: false,
    });
  };

  return (
    <View style={styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <Text children="products.details" size={18} demiBold />
        <DetailsItem
          label="products.name"
          value={name}
          icon={<Edit />}
          onPress={handleChangeName}
        />
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
      {displayDivider && <Divider />}
    </View>
  );
};

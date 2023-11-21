import React, { FC } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { openModal } from 'utils/modal';
import { Divider, Text } from 'components';
import { DetailsItem } from './DetailsItem';
import { ChevronRight, Copy, Edit } from 'assets/SVGs';
import { ChangeAccountNameModal } from 'components/modals';
import { DetailsProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { useCopyToClipboard } from 'hooks/useCopyToClipboard';

export const Details: FC<DetailsProps> = ({
  name,
  iban,
  blockedAmounts,
  displayDivider,
  borderRadius,
  cardHolder,
  information,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { copyToClipboard } = useCopyToClipboard();

  const handleChangeName = () => {
    openModal({
      element: <ChangeAccountNameModal name={name} />,
      title: t('products.changeName'),
      titlePosition: 'center',
      disableDynamicSizing: true,
    });
  };

  const copyIban = () => {
    iban && copyToClipboard(iban, 'products.clipboard');
  };

  return (
    <View style={borderRadius ? styles.wrapperWithBorder : styles.backgroundWhite}>
      {information ? (
        <View style={styles.detailsSectionWrapper}>
          <Text children="products.information" size={18} demiBold />
          <DetailsItem
            label="products.informationName"
            value={name}
            icon={<Edit />}
            onPress={handleChangeName}
          />
          <DetailsItem
            label="products.informationCardOwner"
            value={cardHolder}
            onPress={() => {}}
          />
          {blockedAmounts?.length ? (
            <DetailsItem
              label="products.blockedFunds"
              value={blockedAmounts}
              icon={<ChevronRight />}
              onPress={() => {}}
            />
          ) : null}
        </View>
      ) : (
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
            onPress={copyIban}
          />
          {blockedAmounts?.length ? (
            <DetailsItem
              label="products.blockedFunds"
              value={blockedAmounts}
              icon={<ChevronRight />}
              onPress={() => {}}
            />
          ) : null}
        </View>
      )}
      {displayDivider && <Divider />}
    </View>
  );
};

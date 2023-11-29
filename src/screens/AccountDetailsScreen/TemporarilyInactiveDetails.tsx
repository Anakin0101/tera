import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import { openToast } from 'utils/toast';
import { openModal } from 'utils/modal';
import { Divider, Text } from 'components';
import { DetailsItem } from './DetailsItem';
import { ChangeAccountNameModal } from 'components/modals';
import { DetailsProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

export const TemporarilyInactiveDetails: FC<DetailsProps> = ({
  name,
  iban,
  blockedAmounts,
  displayDivider,
  borderRadius,
}) => {
  const [, setCopiedText] = useState('');
  const styles = useStyles();
  const { t } = useTranslation();

  const copyToClipboard = (ibanLocal?: string) => {
    if (!ibanLocal) {
      return null;
    }
    Clipboard.setString(ibanLocal);
    fetchCopiedText();
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    if (text) {
      openToast('products.clipboard', 'success');
    }
  };

  const handleChangeName = () => {
    openModal({
      element: <ChangeAccountNameModal name={name} />,
      title: t('products.changeName'),
      titlePosition: 'center',
      disableDynamicSizing: true,
    });
  };

  return (
    <View style={borderRadius ? styles.wrapperWithBorder : styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <Text children="products.details" size={18} demiBold />
        <DetailsItem label="products.type" value={name} onPress={handleChangeName} />
        <DetailsItem
          label="products.accountNumber"
          value={iban}
          onPress={() => {
            copyToClipboard(iban);
          }}
        />
        {blockedAmounts?.length ? (
          <DetailsItem label="products.blockedFunds" value={blockedAmounts} onPress={() => {}} />
        ) : null}
      </View>
      {displayDivider && <Divider />}
    </View>
  );
};

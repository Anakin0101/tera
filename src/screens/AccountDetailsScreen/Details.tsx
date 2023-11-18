import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import { openToast } from 'utils/toast';
import { openModal } from 'utils/modal';
import { Divider, Text } from 'components';
import { DetailsItem } from './DetailsItem';
import { formatMoney } from 'utils/formatMoney';
import { ChevronRight, Copy, Edit } from 'assets/SVGs';
import { ChangeAccountNameModal } from 'components/modals';
import { DetailsProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';

export const Details: FC<DetailsProps> = ({
  name,
  iban,
  blockedAmount = 2405,
  displayDivider,
  borderRadius,
}) => {
  const [copiedText, setCopiedText] = useState('');
  const styles = useStyles();
  const { t } = useTranslation();

  const copyToClipboard = (iban?: string) => {
    if (!iban) {
      return null;
    }
    Clipboard.setString(iban);
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
          onPress={() => {
            copyToClipboard(iban);
          }}
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

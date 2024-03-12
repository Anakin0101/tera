import React, { FC, memo, useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Collapsible, Divider, Text } from 'components';
import Images from 'theme/Images';
import { Colors } from 'theme/Variables';
import { closeModal } from 'utils/modal';
import { formatMoney } from 'utils/formatMoney';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { COLLAPSIBLE_ACCOUNT_HEIGHT_WITH_PADDING } from 'constants/common';
import { CheckCircle, ChevronDownLarge, Close } from 'assets/SVGs';
import {
  AccountsProps,
  AccountItemProps,
  CollapsibleHeaderProps,
} from './AccountExtractionModal.types';
import { useStyles } from './AccountExtractionModal.styles';

const Header: FC<CollapsibleHeaderProps> = memo(({ selectedAccount }) => {
  const styles = useStyles();

  const imageId = useMemo(() => {
    if (selectedAccount?.cards?.length) {
      return selectedAccount?.cards?.[0]?.cardLargeImageId;
    }
    return '';
  }, [selectedAccount.cards]);

  return (
    <View style={styles.collapsibleHeader}>
      <Image
        source={imageId ? { uri: `${PUBLIC_IMAGE_URL}${imageId}` } : Images().DefaultCardImage}
        style={styles.image}
      />
      <View style={styles.accountInfo}>
        <View>
          <Text
            children={selectedAccount?.accountName}
            color={Colors.textBlack500}
            lineHeight={20}
          />
          <Text
            medium
            children={formatMoney(selectedAccount?.availableBalance, selectedAccount?.ccy)}
            lineHeight={20}
          />
        </View>
      </View>
    </View>
  );
});

const AccountItem: FC<AccountItemProps> = memo(({ item, selectedAccount, setSelectedAccount }) => {
  const styles = useStyles();

  const handlePress = () => {
    setSelectedAccount(item);
  };

  return (
    <Pressable onPress={handlePress} style={styles.accountItem}>
      <View>
        <Text children={item?.accountName} color={Colors.textBlack500} lineHeight={20} />
        <Text medium children={formatMoney(item?.availableBalance, item?.ccy)} lineHeight={20} />
      </View>
      {selectedAccount?.accountId === item?.accountId && <CheckCircle />}
    </Pressable>
  );
});

const Accounts: FC<AccountsProps> = memo(({ accounts, selectedAccount, setSelectedAccount }) => {
  const styles = useStyles();

  return (
    <View style={styles.accountsContainer}>
      {accounts?.map(account => (
        <AccountItem
          key={account?.accountId}
          item={account}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      ))}
    </View>
  );
});

export const CollapsibleAccounts: FC<AccountsProps> = memo(
  ({ accounts, selectedAccount, setSelectedAccount }) => {
    const styles = useStyles();

    return (
      <View>
        <View style={styles.title}>
          <Text children="products.getExtract" />
          <Pressable onPress={closeModal}>
            <Close />
          </Pressable>
        </View>
        <Collapsible
          headerHeight={65}
          contentHeight={accounts?.length * COLLAPSIBLE_ACCOUNT_HEIGHT_WITH_PADDING}
          renderHeader={<Header selectedAccount={selectedAccount} />}
          renderContent={
            <Accounts
              accounts={accounts}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />
          }
          icon={<ChevronDownLarge />}
          containerStyle={styles.collapsibleContainer}
        />
        <Divider height={12} color={Colors.white} />
      </View>
    );
  },
);

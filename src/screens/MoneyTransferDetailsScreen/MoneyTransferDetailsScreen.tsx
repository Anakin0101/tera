import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';

import { Divider, IconComponent, LoadingView, Text } from 'components/index';
import { useStyles } from './MoneyTransferDetailsScreen.style';
import Images from 'theme/Images';
import { TransferListTypeEnum } from 'components/TransfersHistory/container';
import { MoneyTransferStatusEnum } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { Copy } from 'assets/SVGs';
import { formatDateFullMonth } from 'utils/formatDate';
import { useMoneyTransferDetails } from './container';
import { formatMoney } from 'utils/formatMoney';
import { getCurrencyIcon } from 'utils/currency';
import { Spacing } from 'theme/Variables';
import Clipboard from '@react-native-clipboard/clipboard';

export const MoneyTransferDetailsScreen = () => {
  const styles = useStyles();

  const { isLoading, transferInfo, transfer, transferType, transferDetails } =
    useMoneyTransferDetails();

  const getCurrentImage = () => {
    const images: any = Images();
    return images[transferDetails?.mtSystem] || null;
  };

  const renderStatus = () => {
    switch (transferDetails?.status) {
      case MoneyTransferStatusEnum.pending:
        return <Text style={[styles.itemDesc, styles.pending]} children={'common.pending'} />;
      case MoneyTransferStatusEnum.rejected:
        return <Text style={[styles.itemDesc, styles.rejected]} children={'common.rejected'} />;
      case MoneyTransferStatusEnum.success:
        return <Text style={[styles.itemDesc, styles.success]} children={'common.sent'} />;
      case MoneyTransferStatusEnum.received:
        return <Text style={[styles.itemDesc, styles.success]} children={'common.received'} />;
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(
      (transferType === TransferListTypeEnum.receive
        ? transferInfo?.transferNumber
        : transfer?.transferNumber
      )?.toString() || '',
    );
  };

  if (isLoading) {
    return <LoadingView />;
  }

  const renderDetails = () => {
    if (transferType === TransferListTypeEnum.receive) {
      return (
        <>
          <Text children={'common.status'} style={styles.itemDescTitle} />
          {renderStatus()}
          <Text children={'common.receiver'} style={styles.itemDescTitle} />
          <Text
            children={`${transferDetails.receiverFirstName} ${transferDetails.receiverLastName}`}
            style={styles.itemDesc}
          />
          <Text children={'common.bankAccountNumber'} style={styles.itemDescTitle} />
          <Text children={transferInfo?.receiveBankAccountNumber} style={styles.itemDesc} />
          <Text children={'common.sender'} style={styles.itemDescTitle} />
          <Text
            children={`${transferDetails.senderFirstName} ${transferDetails.senderLastName}`}
            style={styles.itemDesc}
          />
          <Text children={'common.country'} style={styles.itemDescTitle} />
          <Text children={transferInfo?.sendCountry} style={styles.itemDesc} />
        </>
      );
    } else {
      return (
        <>
          <Text children={'common.status'} style={styles.itemDescTitle} />
          {renderStatus()}
          <Text children={'common.receiver'} style={styles.itemDescTitle} />
          <Text
            children={`${transferDetails.receiverFirstName} ${transferDetails.receiverLastName}`}
            style={styles.itemDesc}
          />
          <Text children={'common.country'} style={styles.itemDescTitle} />
          <Text children={transfer?.receiveCountry} style={styles.itemDesc} />
          <Text children={'common.city'} style={styles.itemDescTitle} />
          <Text children={transfer?.receiveCity} style={styles.itemDesc} />
          <Text children={'common.sender'} style={styles.itemDescTitle} />
          <Text
            children={`${transferDetails.senderFirstName} ${transferDetails.senderLastName}`}
            style={styles.itemDesc}
          />
          <Text children={'common.country'} style={styles.itemDescTitle} />
          <Text children={transfer?.sendCountry} style={styles.itemDesc} />
          <Text children={'common.sendedMoney'} style={styles.itemDescTitle} />
          <Text children={transfer?.payoutAmount} style={styles.itemDesc} />
          <Text children={'common.totalFee'} style={styles.itemDescTitle} />
          <Text children={transfer?.totalFee} style={styles.itemDesc} />
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View style={styles.headerInfoWrapper}>
          <View style={styles.itemIconWrapper}>
            <IconComponent
              pngLocalIcon={getCurrentImage()}
              pngLocalIconCustomStyle={styles.iconStyle}
              hasBorder={false}
            />
          </View>
          <View>
            <Text style={styles.headerTitle}>
              {transferDetails.receiverFirstName} {transferDetails.receiverLastName}
            </Text>
            <Text style={styles.amountLabel}>
              {formatMoney(transferDetails.amount)} {getCurrencyIcon(transferDetails.currency)}
            </Text>
            <Text style={styles.dateLabel}>
              {formatDateFullMonth(transferDetails.transactionDate)}
            </Text>
          </View>
        </View>
        <Divider height={1} marginTop={Spacing.lg} marginBottom={Spacing.lg} />
        <View style={styles.actionWrapper}>
          <View>
            <Text style={styles.headerTitle} children={'moneyTransferDetailsScreen.transferCode'} />
            <Text style={styles.transferNumber}>
              {transferType === TransferListTypeEnum.receive
                ? transferInfo?.transferNumber
                : transfer?.transferNumber}
            </Text>
          </View>
          <Pressable
            style={[styles.itemIconWrapper, styles.copyIconWrapper]}
            onPress={copyToClipboard}
          >
            <Copy />
          </Pressable>
        </View>
      </View>

      <Text children={'common.details'} style={styles.detailsLabel} />
      {renderDetails()}
    </ScrollView>
  );
};

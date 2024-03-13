import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './TransfersHistory.styles';
import { Text } from 'components/Text/Text';
import { TransfersHistoryItemProps } from './TransfersHistory.types';
import { IconComponent } from '../index';
import Images from 'theme/Images';
import { formatMoney } from 'utils/formatMoney';
import { formatDate } from 'utils/formatDate';
import { getCurrencyIcon } from 'utils/currency';
import { TransferListTypeEnum } from './container';
import { MoneyTransferStatusEnum } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';

export const TransfersHistorytItem: React.FC<TransfersHistoryItemProps> = memo(
  ({ item, isLast = false, transferType, onPress = () => {} }) => {
    const styles = useStyles();

    const getCurrentImage = () => {
      const images: any = Images();
      return images[item.mtSystem] || null;
    };

    const renderTitle = () => {
      if (transferType === TransferListTypeEnum.receive) {
        return `${item.receiverFirstName} ${item.receiverLastName}`;
      } else {
        return `${item.senderFirstName} ${item.senderLastName}`;
      }
    };

    const renderStatus = () => {
      switch (item.status) {
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

    return (
      <Pressable style={[!isLast && styles.itemWrapperMargin]} onPress={onPress}>
        <View style={styles.itemWrapper}>
          <View style={[styles.itemWrapper, styles.contentWrapper]}>
            <View style={styles.itemIconWrapper}>
              <IconComponent
                pngLocalIcon={getCurrentImage()}
                pngLocalIconCustomStyle={styles.iconStyle}
                hasBorder={false}
              />
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.itemTitle}>{renderTitle()}</Text>
              <View style={styles.itemDescWrapper}>
                <Text
                  style={styles.itemDesc}
                  children={`moneyTransferReceiveScreen.${item.mtSystem}`}
                />
                <View style={styles.descBorder} />
                {renderStatus()}
              </View>
            </View>
          </View>
          <View style={styles.valueDateWrapper}>
            <Text
              style={[
                styles.itemTitle,
                item.status === MoneyTransferStatusEnum.received && styles.success,
              ]}
            >
              {getCurrencyIcon(item.currency)}
              {formatMoney(item?.amount)}
            </Text>
            <Text style={styles.dateLabel}>{formatDate(item?.transactionDate)}</Text>
          </View>
        </View>
        <View style={styles.contentBorder} />
      </Pressable>
    );
  },
);

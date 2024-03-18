import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'hooks';
import { Divider, Text } from '../index';
import { useStyles } from './TransferTemplates.styles';
import { ITemplateProps } from './TransferTemplates.types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { maskIban } from 'utils/maskIban';
const Template: FC<ITemplateProps> = ({
  item,
  fromOtherBanks,
  setSelectedData,
  fromPin,
  setChosenTemplateIban,
}) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  const bankData = item.bankExternal || item.bankInternal || item.internal || item.p2pTransfer;

  const choseTemplate = () => {
    if (fromPin && setChosenTemplateIban) {
      setChosenTemplateIban(bankData?.creditIban);
    }
    setSelectedData(
      fromPin
        ? bankData?.personalId
        : bankData.mobile
        ? bankData.mobile
        : bankData?.creditIban
        ? bankData?.creditIban
        : bankData?.debitIban,
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsHorizontalScrollIndicator={false}>
      {!fromOtherBanks ? (
        <>
          <View style={styles.templateWrapper}>
            <View style={styles.imageContainer} />
            <View style={styles.details}>
              <Text size={14}>{bankData?.receiverName ? bankData.receiverName : item?.name}</Text>
              <Text size={12} color={Colors.textBlack400}>
                {bankData?.creditIban
                  ? `${maskIban(bankData.creditIban)}${bankData.currency}`
                  : `${maskIban(bankData?.debitIban)}${bankData?.currency}`}
              </Text>
              <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
            </View>
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.templateWrapper} onPress={choseTemplate}>
          <View style={styles.imageContainer} />
          <View style={styles.details}>
            <Text size={14}>{bankData?.receiverName || item?.name}</Text>
            <Text size={12} color={Colors.textBlack400}>
              {fromPin
                ? `${maskIban(bankData?.creditIban)} ${bankData?.currency}`
                : `${maskIban(bankData?.debitIban)}${bankData?.currency}`}
            </Text>
            <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Template;

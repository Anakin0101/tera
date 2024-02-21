import React, { FC } from 'react';
import { View } from 'react-native';
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

  const bankData = item.bankExternal || item.bankInternal || item.internal;

  const choseTemplate = () => {
    if (fromPin && setChosenTemplateIban) {
      setChosenTemplateIban(bankData?.creditIban);
    }
    setSelectedData(fromPin ? bankData?.personalId : bankData?.creditIban || bankData?.debitIban);
  };
  return (
    <>
      {!fromOtherBanks ? (
        <>
          <View style={styles.templateWrapper}>
            <View style={styles.imageContainer} />
            <View style={styles.details}>
              <Text size={14}>{bankData?.receiverName || item?.name}</Text>
              <Text size={12} color={Colors.textBlack400}>
                {maskIban(bankData?.creditIban) || maskIban(bankData?.debitIban)}
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
              {(fromPin && maskIban(bankData?.creditIban)) || bankData?.debitIban}
            </Text>
            <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Template;

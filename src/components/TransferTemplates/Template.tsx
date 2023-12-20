import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from 'hooks';
import { Divider, Text } from '../index';
import { useStyles } from './TransferTemplates.styles';
import { ITemplateProps } from './TransferTemplates.types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Template: FC<ITemplateProps> = ({ item, index, fromOtherBanks, setSelectedData }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  const bankData = item.bankExternal || item.bankInternal || item.internal;

  return (
    <>
      {!fromOtherBanks ? (
        <>
          <View style={styles.templateWrapper}>
            <View style={styles.imageContainer} />
            <View style={styles.details}>
              <Text size={14}>{bankData?.receiverName || item?.name}</Text>
              <Text size={12} color={Colors.textBlack400}>
                {bankData?.creditIban || bankData?.debitIban}
              </Text>
              {index < 3 && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
            </View>
          </View>
        </>
      ) : (
        <TouchableOpacity
          style={styles.templateWrapper}
          onPress={() => {
            setSelectedData(bankData?.creditIban || bankData?.debitIban);
          }}
        >
          <View style={styles.imageContainer} />
          <View style={styles.details}>
            <Text size={14}>{bankData?.receiverName || item?.name}</Text>
            <Text size={12} color={Colors.textBlack400}>
              {bankData?.creditIban || bankData?.debitIban}
            </Text>
            {index < 3 && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Template;

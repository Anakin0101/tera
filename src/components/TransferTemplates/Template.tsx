import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from 'hooks';
import { Divider, Text } from '../index';
import { useStyles } from './TransferTemplates.styles';
import { ITemplateProps } from './TransferTemplates.types';

const Template: FC<ITemplateProps> = ({ item, index }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  const bankData = item.bankExternal || item.bankInternal || item.internal;

  return (
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
  );
};

export default Template;

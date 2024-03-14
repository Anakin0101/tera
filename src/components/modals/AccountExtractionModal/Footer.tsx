import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Excel, Pdf } from 'assets/SVGs';
import { Button, Text } from 'components';
import { useStyles } from './AccountExtractionModal.styles';
import { FileFormatEnum } from 'services/apis/productsAPI/productsAPI.types';
import { Colors } from 'theme/Variables';
import { FooterProps } from './AccountExtractionModal.types';

export const Footer: FC<FooterProps> = memo(
  ({ fileFormat, setFileFormat, isDisabledDownload, downloadStatement }) => {
    const styles = useStyles();

    return (
      <View style={styles.footer}>
        <View style={styles.docFormat}>
          <Pressable
            onPress={() => setFileFormat(FileFormatEnum.Pdf)}
            style={[styles.format, fileFormat === FileFormatEnum.Pdf && styles.selected]}
          >
            <Pdf />
            <Text
              children="PDF"
              color={fileFormat === FileFormatEnum.Pdf ? Colors.primary : Colors.textBlack}
            />
          </Pressable>
          <Pressable
            onPress={() => setFileFormat(FileFormatEnum.Excel)}
            style={[styles.format, fileFormat === FileFormatEnum.Excel && styles.selected]}
          >
            <Excel />
            <Text
              children="EXCEL"
              color={fileFormat === FileFormatEnum.Excel ? Colors.primary : Colors.textBlack}
            />
          </Pressable>
        </View>
        <Button.Primary
          text="products.download"
          onPress={downloadStatement}
          fullWidth
          customWrapperStyle={[styles.downloadBtn, isDisabledDownload && styles.disabled]}
        />
      </View>
    );
  },
);

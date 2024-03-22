import React, { FC, memo, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text, DetailsItem } from 'components';
import { Colors } from 'theme/Variables';
import { MM_YYYY } from 'constants/DateTemplates';
import { getFormattedDate } from 'utils/formatDate';
import { CardEye } from 'assets/SVGs';
import { maskCardPan } from 'utils/maskCardPan';
import { CardHolderDetailProps } from './CardHolderDetailsProps.types';
import { useStyles } from './CardDetailsScreen.styles';

export const CardHolderDetails: FC<CardHolderDetailProps> = memo(({ pan, endDate }) => {
  const styles = useStyles();
  const [showNumbers, setShowNumbers] = useState(true);

  const toggleVisibility = () => {
    setShowNumbers(!showNumbers);
  };

  const maskAccountNumber = useMemo(() => {
    return showNumbers ? pan : maskCardPan(pan);
  }, [pan, showNumbers]);

  return (
    <View style={styles.backgroundWhite}>
      <View style={styles.detailsSectionWrapper}>
        <View style={styles.wrapper}>
          <Text children="products.details" size={18} demiBold />
          <Pressable onPress={toggleVisibility} style={styles.pressable}>
            <CardEye />
            <Text
              medium
              size={14}
              lineHeight={20}
              color={Colors.primary}
              children={showNumbers ? 'common.hide' : 'common.show'}
            />
          </Pressable>
        </View>
        <View style={styles.cardView}>
          <DetailsItem
            label="products.cardNumber"
            value={maskAccountNumber}
            valueStyle={styles.text}
          />
          <DetailsItem
            label="products.dueDate"
            value={getFormattedDate(endDate, MM_YYYY)}
            valueStyle={styles.text}
          />
        </View>
      </View>
      <Divider />
    </View>
  );
});

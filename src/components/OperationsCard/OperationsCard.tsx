import React from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './OperationsCard.styles';
import { IconComponent, Text } from 'components';
import Images from 'theme/Images';
import dayjs from 'dayjs';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export const OperationsCard = (
  props: TransactionType & { showUnderline?: boolean; onPress: () => void },
) => {
  const { amount, docDate, description, showUnderline, onPress } = props;
  const inputDate = dayjs(docDate);
  const formattedDate = inputDate.format('D MMM, YYYY, HH:mm');

  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.templateCardContainer}>
        <View style={styles.wrapper}>
          <IconComponent
            pngLocalIcon={Images().PizzaIcon}
            customIconComponentStyles={styles.customIconComponentStyles}
          />
          <View style={[styles.templateCardContentContainer]}>
            {description ? (
              <Text
                children={description}
                style={styles.templateCardTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            ) : (
              <></>
            )}
            {description ? (
              <Text
                children={description}
                style={styles.templateCardContent}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.ops}>
          {amount && (
            <Text
              children={amount}
              style={styles.templateAmount}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          )}
          {formattedDate && (
            <Text
              children={formattedDate}
              style={styles.dateText}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          )}
        </View>
      </View>
      {showUnderline && <View style={styles.underline} />}
    </Pressable>
  );
};

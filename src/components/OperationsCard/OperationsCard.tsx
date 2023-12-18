import React from 'react';
import { View } from 'react-native';
import { useStyles } from './OperationsCard.styles';
import { IconComponent, Text } from 'components';
import Images from 'theme/Images';
import dayjs from 'dayjs';
import { Transactions } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { getCurrencyIcon } from 'utils/currency';

export const OperationsCard = (props: Transactions & { showUnderline?: boolean }) => {
  const { amount, docDate, description, showUnderline, currency } = props;

  const inputDate = dayjs(docDate);
  const formattedDate = inputDate.format('D MMM, YYYY, HH:mm');

  const styles = useStyles();

  return (
    <View>
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
              children={`${amount} ${getCurrencyIcon(currency)}`}
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
    </View>
  );
};

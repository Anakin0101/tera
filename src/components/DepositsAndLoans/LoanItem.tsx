import React, { FC, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, IconComponent, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { useStyles } from './DepositsAndLoans.styles';
import { LoanItemProps } from './DepositsAndLoans.types';
import Images from 'theme/Images';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { LOAN_DETAILS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { CreditDisbursementItem } from './CreditDisbursementItem';

export const LoanItem: FC<LoanItemProps> = memo(({ item, isLast, index }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const isOverdraft = 'overdraftLimit' in item;

  const isCreditCard = 'creditLimit' in item;

  const navigateToLoanDetails = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: LOAN_DETAILS_SCREEN,
      params: { index },
    });
  }, [index, navigate]);

  if ('creditDisbursementId' in item) {
    return <CreditDisbursementItem item={item} />;
  }

  return (
    <Pressable onPress={navigateToLoanDetails} style={styles.account}>
      <IconComponent
        customIconComponentStyles={styles.cardContainer}
        pngLocalIcon={Images().LiabilitiesIcon}
      />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <View style={styles.textContainer}>
            <Text
              regular
              size={14}
              numberOfLines={1}
              color={Colors.textBlack500}
              children={item?.productName}
            />
            <Text size={16}>
              {formatMoney(
                isOverdraft
                  ? item?.overdraftLimit
                  : isCreditCard
                  ? item?.creditLimit
                  : item?.amount,
                item?.currency,
              )}
            </Text>
          </View>
          {item?.nextPaymentAmount ? (
            <View style={styles.fee}>
              <Text children="products.fee" label color={Colors.textBlack500} />
              <Text
                label
                color={Colors.error}
                children={formatMoney(item?.nextPaymentAmount, item?.currency)}
              />
            </View>
          ) : null}
        </View>
        {!isLast && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      </View>
    </Pressable>
  );
});

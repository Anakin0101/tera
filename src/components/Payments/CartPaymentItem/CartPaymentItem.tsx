import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, Animated, View } from 'react-native';

import { useStyles } from './CartPaymentItem.styles';
import { Text } from 'components/Text/Text';
import { CartPaymentItemProps } from './CartPaymentItem.types';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeButtonsActions } from './SwipeButtonsActions';
import { Checkbox } from 'components/Checkbox/Checkbox';
import { useCartPaymentItem } from './container';
import { Provider } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { TextInput } from 'components/TextInput/TextInput';
import { getFee, updateArrayValuesById } from 'utils/paymentUtils';
import { useTranslation } from 'react-i18next';

let row: Array<Swipeable | null> = [];
let prevOpenedRow: Swipeable | null;

export const CartPaymentItem: React.FC<CartPaymentItemProps> = memo(
  ({
    item,
    index,
    providersGroups,
    value,
    onChangeText,
    unSelectCartOnPress,
    selectedCartItemIds,
    selectCartOnPress,
    addToSelectedItemFee,
    addServiceFieldsByid,
    deleteBasketService,
  }) => {
    const styles = useStyles();
    const savedLanguage = getValue(SELECTED_LANGUAGE);
    const { t } = useTranslation();

    const { isLoading, debtVerifyResult } = useCartPaymentItem(item);

    const amountObj = useMemo(
      () => debtVerifyResult?.serviceFields?.find(field => field.key === 'Amount'),
      [debtVerifyResult],
    );

    useEffect(() => {
      if (debtVerifyResult?.payable || debtVerifyResult?.payable === 0) {
        if (debtVerifyResult?.payable > 0) {
          selectCartOnPress(item.id.toString());
        }
        if (amountObj) {
          onChangeText(amountObj.id.toString(), debtVerifyResult?.payable?.toString() || '');
        }
      }
      // აქ სხვა გზა არ მაქვს
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debtVerifyResult, item.id, amountObj]);

    // Find the provider with the specified id in the providersGroups array
    const foundProvider: Provider | undefined = useMemo(
      () =>
        providersGroups
          ?.map(group => group?.providers) // Flatten the providers from all groups into a single array
          ?.flat()
          ?.find(provider => provider?.id === item?.serviceId),
      [providersGroups, item.serviceId],
    );

    /**
     * Closes the swipeable row at the specified index.
     * @param {number} index - The index of the swipeable row to close.
     */
    const closeRow = useCallback(() => {
      if (prevOpenedRow && prevOpenedRow !== row?.[index]) {
        prevOpenedRow?.close();
      }
      prevOpenedRow = row[index];
    }, [index]);

    const deleteBasketOnPress = useCallback(() => {
      try {
        Alert.alert(t('cartPaymentListScreen.deleteCartItemMessage'), '', [
          {
            text: t('common.no'),
            style: 'cancel',
          },
          {
            text: t('common.yes'),
            onPress: () => {
              prevOpenedRow?.close();
              deleteBasketService(item.id.toString());
            },
            style: 'destructive',
          },
        ]);
      } catch (ex) {
        console.warn('Error in deleteBasketOnPress', ex);
      }
    }, [deleteBasketService, item.id, t]);

    /**
     * Renders the right swipe actions for a review item.
     */
    const renderRightActions = useCallback(
      (
        progress: Animated.AnimatedInterpolation<string | number>,
        dragX: Animated.AnimatedInterpolation<string | number>,
      ) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 60, 61],
          outputRange: [-1, 0, 0, 1],
        });
        return (
          <SwipeButtonsActions
            disableButtons={false}
            trans={trans}
            deleteOnPress={deleteBasketOnPress}
          />
        );
      },
      [deleteBasketOnPress],
    );

    const isSelected = useMemo(
      () => !!selectedCartItemIds.find(id => id === item.id.toString()),
      [item.id, selectedCartItemIds],
    );

    const feeValue = useMemo(
      /**
       * Callback function to calculate the latest payment value.
       *
       * @function
       * @returns {string} The formatted latest payment value.
       */
      () => {
        // Calculate the fee using the sum and fee rules
        return getFee(Number(value), foundProvider?.feeRules || []).toString();
        // Return the formatted sum plus the fee
      },
      [foundProvider?.feeRules, value],
    );

    useEffect(() => {
      if (isSelected) {
        addToSelectedItemFee(item.id, Number(feeValue));
      }
    }, [addToSelectedItemFee, feeValue, isSelected, item.id]);

    useEffect(() => {
      if (debtVerifyResult?.serviceFields) {
        const serviceFields = debtVerifyResult?.serviceFields.map(field => ({
          id: field?.id,
          value: field?.value,
        }));
        const fieldValues = item.fieldValues.map(field => ({ id: field?.id, value: field?.value }));

        const resultArray = updateArrayValuesById(serviceFields, fieldValues);

        addServiceFieldsByid(Number(item.id), resultArray);
      }
    }, [addServiceFieldsByid, debtVerifyResult?.serviceFields, item.fieldValues, item.id]);

    const onChangeTextFunc = useCallback(
      (text: string) => {
        onChangeText(amountObj?.id.toString() || '', text.replace(',', '.'));
        if (text && Number(text) > 0) {
          selectCartOnPress(item?.id?.toString());
        } else if ((Number(text) === 0 || text === '') && isSelected) {
          unSelectCartOnPress(item.id.toString());
        }
      },
      [amountObj?.id, isSelected, item.id, onChangeText, selectCartOnPress, unSelectCartOnPress],
    );

    if (isLoading) {
      return (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Swipeable
          key={item.id}
          ref={ref => (row[index] = ref)}
          onSwipeableOpen={closeRow}
          renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}
          childrenContainerStyle={styles.swipeableWrapper}
        >
          <View style={[styles.itemWrapperContainer]}>
            <View style={styles.itemContainer}>
              <Checkbox
                isChecked={isSelected}
                onChange={() => {
                  if (isSelected) {
                    unSelectCartOnPress(item.id.toString());
                  } else {
                    selectCartOnPress(item.id.toString());
                  }
                }}
              />
              <View style={styles.itemWrapper}>
                <View style={styles.itemIconWrapper}>
                  <IconComponent
                    imageId={foundProvider?.largeImageId || foundProvider?.smallImageId}
                  />
                </View>
                <View style={styles.contentWrapper}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {savedLanguage === LanguageKeys.geo
                      ? foundProvider?.name?.ka
                      : foundProvider?.name?.en}
                  </Text>
                  <Text style={styles.itemDesc} numberOfLines={1}>
                    {debtVerifyResult?.customerName}
                  </Text>
                  <Text style={styles.itemDesc}>{debtVerifyResult?.customerNumber}</Text>
                </View>
              </View>
            </View>
            <View style={styles.priceInputWrapper}>
              <TextInput
                value={value}
                onChangeText={onChangeTextFunc}
                inputStyle={[styles.inputStyle, Number(value) > 0 && styles.inputColor]}
                keyboardType="numeric"
                containerStyle={[styles.inputContainerStyle]}
                maxLength={12}
              />
            </View>
          </View>
        </Swipeable>
        <View style={styles.contentBorder} />
      </View>
    );
  },
);

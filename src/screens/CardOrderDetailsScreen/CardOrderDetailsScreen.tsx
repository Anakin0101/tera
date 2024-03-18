import React from 'react';
import { ScrollView, View } from 'react-native';
import { useStyles } from './CardOrderDetailsScreen.styles';
import { Item as Header } from './Item';
import { Divider, Text, Button, ControlledInput } from 'components';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import { useCardOrderDetails } from './container';

export const CardOrderDetailsScreen = () => {
  const styles = useStyles();
  const {
    control,
    selectedCardData,
    selectedIban,
    handleOrderCard,
    selectedBranch,
    userPhoneNumber,
    checkboxValue,
    isLoading,
  } = useCardOrderDetails();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header item={selectedCardData as CardProduct} />
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text children="products.details" medium size={18} />
          <DetailsItem
            label={'products.type'}
            value={`${selectedCardData?.cardKind}`}
            marginTop={24}
          />
          <DetailsItem
            label={`${selectedCardData?.productServiceConditions?.[1]?.title}`}
            value={`${selectedCardData?.productServiceConditions?.[0]?.value}`}
            marginTop={24}
          />
          <DetailsItem
            label={'products.annualServiceFee'}
            value={`${selectedCardData?.serviceFee}`}
            marginTop={24}
          />
          <DetailsItem
            label={'products.nameOnCard'}
            value={`${selectedCardData?.cardHolderName}`}
            marginTop={24}
          />
          <DetailsItem
            label={'products.accountNumber'}
            value={`${selectedIban?.accountIban}`}
            marginTop={24}
          />
        </View>
        <Divider />
        <View style={styles.section}>
          <Text children="products.delivery" medium size={18} />
          <DetailsItem
            label={'products.cardDeliveryType'}
            value={'products.pickupAtBranch'}
            marginTop={24}
          />
          <DetailsItem
            label={'products.pinCodeReceivingMethod'}
            value={'products.SMS'}
            marginTop={24}
          />
          <DetailsItem label={'products.phoneForPin'} value={`${userPhoneNumber}`} marginTop={24} />
          <DetailsItem
            label={'products.branch'}
            value={`${selectedBranch?.branchName}`}
            marginTop={24}
          />
        </View>
        <Divider />
        <View style={styles.section}>
          <Text children="products.cardSecurity" medium size={18} />
          <DetailsItem
            label={'products.cardInsurance'}
            value={'products.noInsuranceWanted'}
            marginTop={24}
          />
        </View>
        <View style={styles.chechboxContainer}>
          <ControlledInput
            control={control}
            type="checkbox"
            name="save"
            label="products.agreeToBankingTerms"
          />
        </View>
        <View style={styles.btn}>
          <Button.Primary
            text={`შეკვეთა - ${selectedCardData?.productServiceConditions?.[0]?.value}`}
            fullWidth
            onPress={handleOrderCard}
            disabled={!checkboxValue}
            isLoading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

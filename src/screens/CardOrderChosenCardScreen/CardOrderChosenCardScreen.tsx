import React from 'react';
import { ScrollView, View } from 'react-native';
import { useStyles } from './CardOrderChosenCardScreen.styles';
import { Item as Header } from './Item';
import { Divider, Text, Button } from 'components';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import { useCardOrderChosenCard } from './container';

export const CardOrderChosenCardScreen = () => {
  const styles = useStyles();
  const { selectedCardData, navigateToChooseIbanScreen } = useCardOrderChosenCard();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header item={selectedCardData as CardProduct} />
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text children="products.cardDetails" medium size={18} />
          <DetailsItem
            label={`${selectedCardData?.cardProcessingConditions?.[0]?.title}`}
            value={`${selectedCardData?.cardProcessingConditions?.[0]?.value}`}
            marginTop={24}
          />
          <DetailsItem
            label={`${selectedCardData?.cardProcessingConditions?.[1]?.title}`}
            value={`${selectedCardData?.cardProcessingConditions?.[1]?.value}`}
            marginTop={24}
          />
          <DetailsItem
            label={`${selectedCardData?.cardProcessingConditions?.[2]?.title}`}
            value={`${selectedCardData?.cardProcessingConditions?.[2]?.value}`}
            marginTop={24}
          />
          <DetailsItem
            label={`${selectedCardData?.cardProcessingConditions?.[4]?.title}`}
            value={`${selectedCardData?.cardProcessingConditions?.[4]?.value}`}
            marginTop={24}
          />
          <DetailsItem
            label={`${selectedCardData?.productServiceConditions?.[1]?.title}`}
            value={`${selectedCardData?.productServiceConditions?.[0]?.value}`}
            marginTop={24}
          />
        </View>
        <Divider />
        <View style={styles.btn}>
          <Button.Primary
            text="personalNumber.next"
            fullWidth
            onPress={navigateToChooseIbanScreen}
          />
        </View>
      </View>
    </ScrollView>
  );
};

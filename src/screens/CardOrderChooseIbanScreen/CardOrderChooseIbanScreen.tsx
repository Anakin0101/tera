import React from 'react';
import { ScrollView, View } from 'react-native';
import { useStyles } from './CardOrderChooseIbanScreen.styles';
import { Item as Header } from './Item';
import { Divider, Text, Button, ControlledInput } from 'components';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import { Plus } from 'assets/SVGs';
import { useTheme } from 'hooks';
import { useCardOrderChooseIban } from './container';

const LeftIcon = () => {
  const { Colors } = useTheme();
  return <Plus color={Colors.primary} />;
};

export const CardOrderChooseIbanScreen = () => {
  const styles = useStyles();
  const {
    selectedCardData,
    uniqueAccountsList,
    selectedIban,
    setSelectedIban,
    navigateToChooseAddressScreen,
    control,
  } = useCardOrderChooseIban();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header item={selectedCardData as CardProduct} />
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text children="products.linkCardToAccount" medium size={18} lineHeight={24} />
          <View style={styles.btnSeconday}>
            <Button.Secondary
              text="products.newIban"
              fullWidth
              leftIcon={LeftIcon}
              onPress={navigateToChooseAddressScreen}
            />
          </View>
          <Text children="products.toExistingAccount" medium size={18} marginTop={40} />
        </View>
        <Divider />
        <View style={styles.sectionIban}>
          {uniqueAccountsList.map((account, index) => (
            <ControlledInput
              control={control}
              key={index}
              type="radio"
              name={account.accountIban}
              subTitle={account.accountIban}
              label={account.accountName}
              value={account.accountIban}
              selectedRadio={selectedIban}
              setSelectedRadio={setSelectedIban}
            />
          ))}
        </View>
        <Divider />
        <View style={styles.btn}>
          <Button.Primary
            text="personalNumber.next"
            fullWidth
            onPress={navigateToChooseAddressScreen}
            disabled={!selectedIban}
          />
        </View>
      </View>
    </ScrollView>
  );
};

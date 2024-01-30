import React from 'react';
import { ScrollView, View } from 'react-native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './CardOrderChooseAddressScreen.styles';
import { useTranslation } from 'react-i18next';
import { Item as Header } from './Item';
import { useForm } from 'react-hook-form';
import { Divider, Text, Button, ControlledInput, LoadingView, SearchComponent } from 'components';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import useBranches from './container';
import { CARD_ORDER_DETAILS_SCREEN } from 'navigation/ScreenNames';

export const CardOrderChooseAddressScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardOrderChosenCardScreen'>>();
  const { control } = useForm();
  const { selectedCardData } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  const {
    filteredBranches,
    searchText,
    setSearchText,
    selectedBranch,
    setSelectedBranch,
    branches,
  } = useBranches();

  const navigateToOrderDetailsScreen = () => {
    if (!selectedBranch) return;
    navigate(CARD_ORDER_DETAILS_SCREEN);
  };

  if (!branches) {
    return <LoadingView />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header item={selectedCardData as CardProduct} />
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text children={t('products.chooseBranch')} medium size={18} lineHeight={24} />
          <Text
            children={t('products.cardDeliveryIssue')}
            size={14}
            lineHeight={20}
            marginTop={16}
          />
        </View>
        <View style={styles.searchSection}>
          <SearchComponent
            placeholder={t('products.findBranch')}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <Divider />
        <View style={styles.section}>
          {filteredBranches.map(branch => (
            <ControlledInput
              control={control}
              key={branch.id}
              type="radio"
              name={`${branch.name.Geo} id:${branch.id}`}
              label={branch.name.Geo}
              value={branch.id.toString()}
              selectedRadio={selectedBranch}
              setSelectedRadio={setSelectedBranch}
            />
          ))}
        </View>
        <Divider />
        <View style={styles.btn}>
          <Button.Primary
            text={t('personalNumber.next')}
            fullWidth
            onPress={navigateToOrderDetailsScreen}
          />
        </View>
      </View>
    </ScrollView>
  );
};

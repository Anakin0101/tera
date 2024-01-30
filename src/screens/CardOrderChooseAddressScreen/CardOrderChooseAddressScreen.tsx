import React from 'react';
import { ScrollView, View } from 'react-native';
import { useStyles } from './CardOrderChooseAddressScreen.styles';
import { useTranslation } from 'react-i18next';
import { Item as Header } from './Item';
import { Divider, Text, Button, ControlledInput, LoadingView, SearchComponent } from 'components';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';
import useBranches from './container';

export const CardOrderChooseAddressScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
    filteredBranches,
    searchText,
    setSearchText,
    selectedBranch,
    setSelectedBranch,
    branches,
    navigateToOrderDetailsScreen,
    selectedCardData,
    control,
  } = useBranches();

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

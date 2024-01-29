import React, { FC, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Item } from './Item';
import { Button } from 'components';
import { closeModal } from 'utils/modal';
import { SelectedProduct } from 'screens/LoanAmountScreen/LoanAmountScreen.types';
import { FooterProps, RenderItem, SelectLoanTypeModalProps } from './SelectLoanTypeModal.types';
import { useStyles } from './SelectLoanTypeModal.styles';
import { LmsProduct } from 'services/apis/productsAPI/productsAPI.types';

const ListFooter: FC<FooterProps> = ({ handleSelectPress }) => {
  const styles = useStyles();
  return (
    <View style={styles.footer}>
      <Button.Primary
        fullWidth
        text="common.select"
        onPress={handleSelectPress}
        customWrapperStyle={styles.button}
      />
    </View>
  );
};

export const SelectLoanTypeModal: FC<SelectLoanTypeModalProps> = ({
  data,
  selectedProduct,
  setSelectedProduct,
}) => {
  const styles = useStyles();
  const [product, setProduct] = useState<SelectedProduct>(selectedProduct);

  const handleSelectPress = useCallback(() => {
    setSelectedProduct(product);
    closeModal();
  }, [product, setSelectedProduct]);

  const renderItem: RenderItem = useCallback(
    ({ item }) => <Item item={item} product={product} setProduct={setProduct} />,
    [product],
  );

  const keyExtractor = useCallback((item: LmsProduct) => String(item.productsGroupId), []);

  return (
    <FlatList
      bounces={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListFooterComponent={<ListFooter handleSelectPress={handleSelectPress} />}
    />
  );
};

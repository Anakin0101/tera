import { ListRenderItem } from 'react-native';
import { SelectedProduct } from 'screens/LoanAmountScreen/LoanAmountScreen.types';
import { LmsProduct } from 'services/apis/productsAPI/productsAPI.types';

export type SelectLoanTypeModalProps = {
  data?: LmsProduct[];
  selectedProduct: SelectedProduct;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProduct>>;
};

export type RenderItem = ListRenderItem<LmsProduct>;

export type ItemProps = {
  item: LmsProduct;
  product: SelectedProduct;
  setProduct: React.Dispatch<React.SetStateAction<SelectedProduct>>;
};

export type FooterProps = {
  handleSelectPress: () => void;
};

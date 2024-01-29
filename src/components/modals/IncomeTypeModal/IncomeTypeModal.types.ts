import { ListRenderItem } from 'react-native';
import { IncomeTypeEnum } from 'screens/LoanRequestAdditionalInfo/LoanRequestAdditionalInfo.types';

export type ItemType = {
  name: string;
  type: IncomeTypeEnum;
};

export type RenderItem = ListRenderItem<ItemType>;

export type SelectedIncomeType = ItemType[];

export type ItemProps = {
  item: ItemType;
  selectedIncomeTypes: SelectedIncomeType;
  setSelectedIncomeTypes: React.Dispatch<React.SetStateAction<SelectedIncomeType>>;
};

export type FooterProps = {
  handleSelectPress: () => void;
};

export type IncomeTypeModalProps = {
  onPress: (selectedIncomeTypes: SelectedIncomeType) => void;
  selectedTypes: SelectedIncomeType;
};

import { SelectedAccountFromCard } from 'components/CardsAndBalance/CardsAndBalance.types';
import { ListRenderItem } from 'react-native';
import { AutomPaymentRes } from 'services/apis/paymentsAPI/paymentsAPI.types';

export type RenderItem = ListRenderItem<AutomPaymentRes>;

export type ItemProps = {
  item: AutomPaymentRes;
  onPress: (id: number, imageId: string) => void;
};

export type AddNewPaymentProps = {
  selectedAccountFromCard: SelectedAccountFromCard;
};

export type EmptyComponentProps = {
  children: React.ReactNode;
};

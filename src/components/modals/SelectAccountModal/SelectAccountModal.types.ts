import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';

export interface SelectAccountModalProps {
  selectedAccount: IGroupedAccountsByIban | null;
  onPress: React.Dispatch<React.SetStateAction<IGroupedAccountsByIban | null>>;
}

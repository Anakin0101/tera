import { ListRenderItem, SectionListRenderItem } from 'react-native';
import {
  Account,
  FileFormatEnum,
  TransactionType,
} from 'services/apis/productsAPI/productsAPI.types';

export type AccountExtractionModalProps = {
  selectedAccountFromCard: Account;
  accounts: Account[];
};

export interface ISections {
  title: string;
  data: TransactionType[];
}
export interface SectionsProps {
  sections?: ISections[];
}
type SectionHeaderProps = {
  title: string;
};

type SelectedTemplatedId = number | null;

export type RenderItem = SectionListRenderItem<TransactionType, ISections>;

export type RenderSectionHeader = (section: { section: SectionHeaderProps }) => JSX.Element;

export type KeyExtractor = (item: TransactionType, index: number) => string;

export type CollapsibleHeaderProps = {
  selectedAccount: Account;
};

export type AccountsProps = {
  accounts: Account[];
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
};

export type AccountItemProps = {
  item: Account;
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
};

export type FooterProps = {
  isDisabledDownload: boolean;
  fileFormat?: FileFormatEnum;
  setFileFormat: React.Dispatch<React.SetStateAction<FileFormatEnum | undefined>>;
  downloadStatement: () => void;
};

export type HeaderProps = {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  endDate: string;
  selectedTemplateId: SelectedTemplatedId;
  setSelectedTemplateId: React.Dispatch<React.SetStateAction<SelectedTemplatedId>>;
};

export type Template = {
  id: number;
  title: string;
  value: number;
};

export type TemplateRenderItem = ListRenderItem<Template>;

export enum CalendarType {
  StartDate,
  EndDate,
}

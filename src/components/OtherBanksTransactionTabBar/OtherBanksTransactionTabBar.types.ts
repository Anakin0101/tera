import { LayoutChangeEvent } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface ITabBarProps {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  zIndex: SharedValue<number>;
  onTabPress: (index: number) => void;
  otherBanksStyle?: boolean;
  activeTab?: number | null;
}

export interface ITabBarLabelProps {
  tab: string;
  index: number;
  translateX: SharedValue<number>;
  onTabPress: (index: number) => void;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
}

export interface SelectedItem {
  selectedPrice: string | number;
  accountFromData: any;
  accountToData: any;
  convertionData: any;
  selectedData: string;
  selectedOtherBankDataTitle: string;
  receiverInfo: any;
  otpData: any;
  selectedIban: string | null;
  invoiceData: any;
  savedTemplateForIban: any;
  accountIban: string | null;
  selectedTransactionType: {
    name: string;
    isFast: boolean;
    selected: number;
  };
  setBudgetPerson: {
    payerCode: string;
    payerName: string;
    payForSomeone: boolean;
  };
  wrappedCode: any;
  treasuryFromCode: any;
}

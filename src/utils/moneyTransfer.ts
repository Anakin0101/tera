export interface MTSystemItemProps {
  id: number;
  name: string;
  key: string;
}

// MT full list
export const mtSystemList: Array<MTSystemItemProps> = [
  { id: 0, name: 'CONTACT', key: 'Contact' },
  { id: 1, name: '', key: 'Anelik' },
  { id: 2, name: 'MONEY_GRAM', key: 'MoneyGram' },
  { id: 3, name: '', key: 'MoneyGramC2A' },
  { id: 4, name: '', key: 'FastTransfer' },
  { id: 5, name: '', key: 'VTBExpress' },
  { id: 6, name: 'RIA', key: 'Ria' },
  { id: 7, name: 'UNISTREAM', key: 'Unistream' },
  { id: 8, name: '', key: 'InterExpress' },
  { id: 9, name: '', key: 'BystrayaPochta' },
  { id: 10, name: '', key: 'Welsend' },
  { id: 11, name: '', key: 'WesternUnion' },
  { id: 12, name: '', key: 'Leader' },
  { id: 13, name: '', key: 'ZolotayaKorona' },
  { id: 14, name: 'INTEL_EXPRESS', key: 'IntelExpress' },
  { id: 15, name: '', key: 'UPT' },
  { id: 16, name: '', key: 'Sigue' },
  { id: 17, name: '', key: 'Blizko' },
  { id: 18, name: 'RICO_GRAM', key: 'RicoGram' },
  { id: 19, name: '', key: 'WIC' },
  { id: 20, name: '', key: 'Elva' },
  { id: 21, name: '', key: 'Mimino' },
];

// MT receive list
export const mtReceiveSystemList: Array<MTSystemItemProps> = [
  { id: 0, name: 'CONTACT', key: 'Contact' },
  { id: 6, name: 'RIA', key: 'Ria' },
  { id: 14, name: 'INTEL_EXPRESS', key: 'IntelExpress' },
  { id: 18, name: 'RICO_GRAM', key: 'RicoGram' },
];

// MT send list
export const mtSendSystemList: Array<MTSystemItemProps> = [
  { id: 0, name: 'CONTACT', key: 'Contact' },
  { id: 14, name: 'INTEL_EXPRESS', key: 'IntelExpress' },
  { id: 18, name: 'RICO_GRAM', key: 'RicoGram' },
];

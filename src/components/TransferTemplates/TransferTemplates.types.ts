export interface ITemplate {
  internal: any;
  bankInternal: any;
  bankExternal: any;
  name: string;
  iban: string;
}

export interface ITemplateProps {
  item: ITemplate;
  index: number;
  fromOtherBanks?: boolean;
  selectedData?: string | null;
  setSelectedData: (iban: string) => void;
}

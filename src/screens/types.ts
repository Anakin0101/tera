import { SectionListRenderItem } from 'react-native';

export type SectionDataT = Record<string, never>;

export interface ISections {
  title: string;
  data: SectionDataT[];
}

export type SectionListRenderItemT = SectionListRenderItem<SectionDataT, ISections>;

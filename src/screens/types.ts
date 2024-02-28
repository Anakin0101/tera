import { SectionListRenderItem } from 'react-native';

export interface ISections {
  title: string;
  data: Record<string, never>[];
}

export type SectionListRenderItemT = SectionListRenderItem<Record<string, never>, ISections>;

import { ImageSourcePropType } from 'react-native';

export type BuiltDashboardTemplatesType = {
  id: number;
  name: string;
  description?: string;
  icon?: string | ImageSourcePropType;
  trusted?: string | null;
};

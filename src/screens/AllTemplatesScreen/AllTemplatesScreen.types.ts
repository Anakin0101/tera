export interface HeaderProps {
  search: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  debouncedValue: string;
}
import { Template } from 'services/apis/dashboardAPI/dashboardAPI.types';

// export interface Template {
//   id: number;
//   name: string;
//   description?: string;
//   icon: number;
//   trusted?: string | null;
//   internalIban?: any;
//   internalAmount?: number | string;
//   currency?: string;
//   isTrusted?: boolean;
// }

export interface TemplatesSectionProps {
  templates: Template;
  index: number;
  templateAddBtn: (data: Template, isDelete: boolean) => void;
  templateDeleteBtn: (data: Template) => void;
}

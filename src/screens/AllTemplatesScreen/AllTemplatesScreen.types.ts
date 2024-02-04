export interface HeaderProps {
  search: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  debouncedValue: string;
}

export interface Template {
  id: number;
  name: string;
  description?: string;
  icon: number;
  trusted?: string | null;
  internalIban?: any;
  internalAmount?: number | string;
  currency?: string;
  isTrusted?: boolean;
}

export interface TemplatesSectionProps {
  templates: Template;
  index: number;
  templateAddBtn: (template: Template) => void;
  templateDeleteBtn: (template: Template) => void;
}

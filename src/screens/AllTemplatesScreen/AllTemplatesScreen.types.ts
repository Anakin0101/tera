import { Template } from 'services/apis/dashboardAPI/dashboardAPI.types';

export interface TemplatesSectionProps {
  templates: Template;
  index: number;
  templateAddBtn: (data: Template, isDelete: boolean) => void;
  templateDeleteBtn: (data: Template) => void;
  isTrustedTemplate: boolean;
}

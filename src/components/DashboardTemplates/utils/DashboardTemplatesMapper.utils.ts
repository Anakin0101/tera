import { BOG_CODE, TBC_BANK_CODE, VTB_BANK_CODE } from 'constants/BankCodes';
import { Template } from 'services/apis/dashboardAPI/dashboardAPI.types';
import Images from 'theme/Images';

const getExternalBankIcon = (externalBankCode: string) => {
  switch (externalBankCode) {
    case BOG_CODE:
      return Images()?.BOGLogoIcon;
    case TBC_BANK_CODE:
      return Images()?.TBCBankLogoIcon;
    case VTB_BANK_CODE:
      return Images()?.VTBBankLogoIcon;
    default:
      return Images()?.TeraBankLogoIcon;
  }
};

const getTemplateIcon = (template: Template) => {
  const hasImage = !!template?.imageUrl;
  const isInternal = template.bankInternal || template.internal;
  const externalBankCode = !isInternal ? template?.bankExternal?.receiverBankCode : null;

  if (hasImage) {
    return template?.imageUrl;
  } else {
    if (isInternal) {
      return Images()?.TeraBankLogoIcon;
    } else if (externalBankCode) {
      return getExternalBankIcon(externalBankCode);
    }
  }
};

export const getDashboardTemplates = (templates: Template[]) => {
  if (!templates) {
    return;
  }
  return templates.map((template: Template, index: number) => {
    const isInternal = template.bankInternal;
    const templateIcon = getTemplateIcon(template);

    const modifiedTemplate = {
      id: template.id,
      name: template.name ?? `Template #${index}`,
      description: isInternal
        ? template.bankInternal?.description
        : template?.bankExternal?.description ?? '',
      icon: templateIcon,
      trusted: isInternal
        ? template?.bankInternal?.trustedAddDate
        : template?.bankExternal?.trustedAddDate,
    };
    return modifiedTemplate;
  });
};

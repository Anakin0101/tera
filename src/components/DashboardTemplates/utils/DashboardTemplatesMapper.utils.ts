import {
  BOG_CODE,
  CREDO_BANK_CODE,
  KHALIK_BANK_CODE,
  LIBERTY_BANK_CODE,
  TBC_BANK_CODE,
  VTB_BANK_CODE,
} from 'constants/BankCodes';
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
    case CREDO_BANK_CODE:
      return Images()?.CredoBankLogoIcon;
    case LIBERTY_BANK_CODE:
      return Images()?.LibertyBankLogoIcon;
    case KHALIK_BANK_CODE:
      return Images()?.KhalikBankLogoIcon;
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
  } else if (isInternal) {
    return Images()?.TeraBankLogoIcon;
  } else if (externalBankCode) {
    return getExternalBankIcon(externalBankCode);
  } else {
    return Images()?.TeraBankLogoIcon;
  }
};

export const getDashboardTemplates = (templates: Template[] = []) => {
  return templates.map((template: Template, index: number) => {
    const isInternal = template.bankInternal;
    const templateIcon = getTemplateIcon(template);

    const conversion = template.conversion
      ? {
          debitIban: template.conversion.debitIban,
          debitCurrency: template.conversion.debitCurrency,
          creditIban: template.conversion.creditIban,
          creditCurrency: template.conversion.creditCurrency,
        }
      : null;
    const internal = template.internal
      ? {
          debitIban: template.internal.debitIban,
          creditIban: template.internal.creditIban,
          currency: template.internal.currency,
          amount: template.internal.amount,
        }
      : null;
    const bankInternal = template.bankInternal
      ? {
          personalId: template.bankInternal.personalId,
          debitIban: template.bankInternal.debitIban,
          creditIban: template.bankInternal.creditIban,
          currency: template.bankInternal.currency,
          amount: template.bankInternal.amount,
          description: template.bankInternal.description,
          extraDescription: template.bankInternal.extraDescription,
          isTrusted: template.bankInternal.isTrusted,
          trustedAddDate: template.bankInternal.trustedAddDate,
        }
      : null;

    const budget = template.budget
      ? {
          debitIban: template.budget.debitIban,
          treasuryCode: template.budget.treasuryCode,
          amount: template.budget.amount,
          payerCode: template.budget.payerCode,
          payerName: template.budget.payerName,
          description: template.budget.description,
          extraDescription: template.budget.extraDescription,
          isTrusted: template.budget.isTrusted,
          trustedAddDate: template.budget.trustedAddDate,
        }
      : null;

    const bankExternal = template.bankExternal
      ? {
          debitIban: template.bankExternal.debitIban,
          receiverIban: template.bankExternal.receiverIban,
          receiverName: template.bankExternal.receiverName,
          receiverAddress: template.bankExternal.receiverAddress,
          receiverBankCode: template.bankExternal.receiverBankCode,
          receiverBankName: template.bankExternal.receiverBankName,
          intermedBankCode: template.bankExternal.intermedBankCode,
          intermedBankName: template.bankExternal.intermedBankName,
          currency: template.bankExternal.currency,
          amount: template.bankExternal.amount,
          description: template.bankExternal.description,
          extraDescription: template.bankExternal.extraDescription,
          insured: template.bankExternal.insured,
          isTrusted: template.bankExternal.isTrusted,
          trustedAddDate: template.bankExternal.trustedAddDate,
        }
      : null;

    const mobilePayment = template.mobilePayment
      ? {
          customerNumber: template.mobilePayment.customerNumber,
          debitAccountId: template.mobilePayment.debitAccountId,
          serviceId: template.mobilePayment.serviceId,
          serviceSubType: template.mobilePayment.serviceSubType,
          amount: template.mobilePayment.amount,
        }
      : null;

    const p2pTransfers = template.p2pTransfers
      ? {
          mobile: template.p2pTransfers.mobile,
          email: template.p2pTransfers.email,
          receiverName: template.p2pTransfers.receiverName,
          debitIban: template.p2pTransfers.debitIban,
          currency: template.p2pTransfers.currency,
          amount: template.p2pTransfers.amount,
          description: template.p2pTransfers.description,
          extraDescription: template.p2pTransfers.extraDescription,
        }
      : null;

    const modifiedTemplate = {
      id: template.id,
      type: template.type,
      name: template.name ?? `Template #${index}`,
      description: isInternal
        ? template.bankInternal?.description
        : template?.bankExternal?.description ?? '',
      icon: templateIcon,
      internalIban:
        conversion?.debitIban ||
        internal?.debitIban ||
        budget?.debitIban ||
        bankInternal?.debitIban ||
        bankExternal?.debitIban ||
        mobilePayment?.debitAccountId ||
        p2pTransfers?.debitIban ||
        '',
      internalAmount:
        internal?.amount ||
        budget?.amount ||
        bankInternal?.amount ||
        bankExternal?.amount ||
        mobilePayment?.amount ||
        p2pTransfers?.amount ||
        '',
      currency:
        internal?.currency ||
        bankInternal?.currency ||
        bankExternal?.currency ||
        p2pTransfers?.currency ||
        '',
      conversion,
      internal,
      bankInternal,
      budget,
      bankExternal,
      mobilePayment,
      p2pTransfers,
    };
    return modifiedTemplate;
  });
};

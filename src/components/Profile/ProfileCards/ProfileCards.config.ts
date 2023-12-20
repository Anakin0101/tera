import { ProfileCardType } from './ProfileCards.types';
import Images from 'theme/Images';

export const ProfileCardsConfig: ProfileCardType[] = [
  {
    id: 'notifications',
    icon: Images().NotificationColored,
    text: 'profile.notifications',
  },
  {
    id: 'currency_rates',
    icon: Images().CurrencyRates,
    text: 'profile.currency_rates',
  },
  {
    id: 'locations',
    icon: Images().Locations,
    text: 'profile.locations',
  },
  {
    id: 'pension_fund',
    icon: Images().PensionFund,
    text: 'profile.pension_fund',
  },
  {
    id: 'my_finances',
    icon: Images().Finances,
    text: 'profile.my_finances',
  },
  {
    id: 'my_documents',
    icon: Images().Documents,
    text: 'profile.my_documents',
  },
];

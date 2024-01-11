import Images from 'theme/Images';

const templates = ['ჯეოსელი', 'გადარიცხვა', 'კომუნალურები', 'ინტერნეტი', 'ანაბარი'];
const payments = [
  {
    id: 1,
    icon: Images().BasisBankLogoIcon,
    title: 'სესხის გადასახადი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 2,
    icon: Images().BasisBankLogoIcon,
    title: 'ჯეოსელი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 3,
    icon: Images().BasisBankLogoIcon,
    title: 'მაგთი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 4,
    icon: Images().BasisBankLogoIcon,
    title: 'კაზინო',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 5,
    icon: Images().BasisBankLogoIcon,
    title: 'შავი დღისთვინა',
    amount: '130.00ლ',
    date: 'დღეს',
  },
];
const assets = ['ანაბრები', 'სესხები'];
const offers = [
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
];

const transactions = [
  'ტრანზაქცია 1',
  'ტრანზაქცია 2',
  'ტრანზაქცია 3',
  'ტრანზაქცია 4',
  'ტრანზაქცია 5',
];
const pensions = 6023.23;

export const tempData = {
  templates,
  payments,
  assets,
  offers,
  transactions,
  pensions,
};

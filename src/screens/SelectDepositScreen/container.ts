import { useGetOffersQuery } from 'services/apis/productsAPI/productsAPI';

export const useSelectDeposit = () => {
  const { data: offers } = useGetOffersQuery();

  const depositTypes = [
    {
      title: 'newDeposit.termDeposit',
      initialAmount: 500,
    },
    {
      title: 'newDeposit.savingDeposit',
      initialAmount: 500,
    },
    {
      title: 'newDeposit.universalDeposit',
      initialAmount: 500,
    },
    {
      title: 'newDeposit.growingDeposit',
      initialAmount: 500,
    },
    {
      title: 'newDeposit.flexDeposit',
      initialAmount: 500,
    },
    {
      title: 'newDeposit.certificateOfDeposit',
      initialAmount: 500,
    },
  ];

  return {
    depositTypes,
    offers,
  };
};

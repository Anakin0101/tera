import { useGetOffersQuery } from 'services/apis/productsAPI/productsAPI';
import { OfferType, OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export const useSelectDeposit = () => {
  const { data: offers } = useGetOffersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((offer: OfferType) => offer.type === OfferTypeEnum.Deposit),
    }),
  });

  return {
    offers,
  };
};

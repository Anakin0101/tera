import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';
import { OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export const useSelectCard = () => {
  const { data: offer } = useGetOfferByIdQuery(OfferTypeEnum.NewCard);

  return {
    offer,
  };
};

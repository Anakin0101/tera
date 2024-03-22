import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';
import { OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { useCulture } from 'hooks';

export const useSelectCard = () => {
  const { culture } = useCulture();

  const { data: offer } = useGetOfferByIdQuery({
    culture,
    offerId: OfferTypeEnum.NewCard,
  });

  return {
    offer,
  };
};

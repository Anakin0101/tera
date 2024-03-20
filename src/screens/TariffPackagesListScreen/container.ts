import { OFFER_ID } from 'constants/OfferId';
import { useCulture } from 'hooks';
import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';

export const useTariffPackages = () => {
  const { culture } = useCulture();

  const {
    data: packagesList,
    isSuccess: packagesSuccess,
    isLoading: packagesIsLoading,
    refetch: packageRefetch,
  } = useGetOfferByIdQuery({
    culture,
    offerId: OFFER_ID,
  });

  return {
    packagesList,
    packagesIsLoading,
    packagesSuccess,
    packageRefetch,
  };
};

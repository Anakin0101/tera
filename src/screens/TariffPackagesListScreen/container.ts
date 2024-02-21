import { OFFER_ID } from 'constants/OfferId';
import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';

export const useTariffPackages = () => {
  const offerId = OFFER_ID;
  const {
    data: packagesList,
    isSuccess: packagesSuccess,
    isLoading: packagesIsLoading,
    refetch: packageRefetch,
  } = useGetOfferByIdQuery(offerId);

  return {
    packagesList,
    packagesIsLoading,
    packagesSuccess,
    packageRefetch,
  };
};

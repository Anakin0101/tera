import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';

export const useTariffPackages = () => {
  const offerId = 34;
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

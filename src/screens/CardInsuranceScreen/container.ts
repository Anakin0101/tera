import { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { ModalStackRouteProps } from 'navigation/types';
import { useCulture } from 'hooks';
import { useGetOfferByIdQuery } from 'services/apis';
import { CARD_INSURANCE_ID } from 'constants/common';

export const useCardInsurance = () => {
  const { culture } = useCulture();
  const { params } = useRoute<ModalStackRouteProps<'CardInsuranceScreen'>>();
  const { iban, activeCard } = params || {};

  const { data: offers } = useGetOfferByIdQuery({
    culture,
    cardId: activeCard?.id,
    offerId: CARD_INSURANCE_ID,
  });

  const packages = useMemo(() => {
    return offers?.cardInsuranceProducts?.sort(item => item.order);
  }, [offers]);

  return {
    iban,
    packages,
    activeCard,
  };
};

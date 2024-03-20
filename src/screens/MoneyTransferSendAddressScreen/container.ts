import { useNavigation, useRoute } from '@react-navigation/native';
import { PaymentAddressFieldItem } from 'components/modals/SelectTransferFieldModal/SelectTransferFieldModal.types';
import { useCulture } from 'hooks/useCulture';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useGetAddressMutation,
  useGetDirectionsQuery,
  useGetMTSystemQuery,
  useLazyGetCitiesQuery,
} from 'services/apis';
import { City, MtPoint } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { openToast } from 'utils/toast';
import { RequiredFieldsForFeeCalculationEnum } from './MoneyTransferSendAddressScreen.types';
import { MONEY_TRANSFER_SEND_INFO_SCREEN } from 'navigation/ScreenNames';

export const useMoneyTransferSendAddress = () => {
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferSendAddressScreen'>>();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { providerItem } = params || {};
  const { culture } = useCulture();

  const [selectedCountry, setSelectedCountry] = useState<PaymentAddressFieldItem>();
  const [cities, setCities] = useState<{
    fieldValues: Array<PaymentAddressFieldItem>;
    originalCities: Array<City>;
  }>({
    fieldValues: [],
    originalCities: [],
  });
  const [selectedCity, setSelectedCity] = useState<PaymentAddressFieldItem>();
  const [mtPoint, setMtPoint] = useState<{
    fieldValues: Array<PaymentAddressFieldItem>;
    originalMtPoints: Array<MtPoint>;
  }>({ fieldValues: [], originalMtPoints: [] });
  const [selecteMTPoint, setSelecteMTPoint] = useState<PaymentAddressFieldItem>();

  const [getCities] = useLazyGetCitiesQuery();
  const [getAddressDetails] = useGetAddressMutation();
  const { data: resp, isLoading } = useGetMTSystemQuery({ mtSystem: providerItem?.key });
  const { data, isLoading: getDirectionIsLoading } = useGetDirectionsQuery({
    mtSystem: providerItem?.id,
  });

  const requiredFieldsForFeeCalculation = useMemo(
    () => resp?.mtSystem?.requiredFieldsForFeeCalculation,
    [resp?.mtSystem?.requiredFieldsForFeeCalculation],
  );

  const isCityRequired = requiredFieldsForFeeCalculation?.some(
    field =>
      field?.fieldId?.toUpperCase() === RequiredFieldsForFeeCalculationEnum.RECEIVECITY ||
      field?.fieldId?.toUpperCase() === RequiredFieldsForFeeCalculationEnum.RECEIVEPOINTCODE,
  );

  const isAddressRequired = requiredFieldsForFeeCalculation?.some(
    field => field?.fieldId?.toUpperCase() === RequiredFieldsForFeeCalculationEnum.RECEIVEPOINTCODE,
  );

  const getCitiesOnPress = useCallback(() => {
    try {
      getCities({ MTSystem: providerItem.id, country: selectedCountry?.key || '' })
        .unwrap()
        .then(response => {
          if (response?.city) {
            const cityList = response?.city?.map(el => ({
              id: el?.cityId,
              value: el?.name,
              label: el?.region,
              key: el?.country,
            }));
            setCities({
              fieldValues: cityList,
              originalCities: response.city,
            });
          }
        })
        .catch(ex => {
          if ('data' in ex && ex?.data?.title) {
            openToast(ex.data.title, 'error');
          }
        });
    } catch (ex) {
      console.warn('Error in getCitiesOnPress: ', ex);
    }
  }, [getCities, providerItem.id, selectedCountry?.key]);

  const getAddressOnPress = useCallback(() => {
    try {
      const currentCities = cities?.originalCities?.find(city => city?.cityId === selectedCity?.id);
      const reqParams = {
        additionalFilter: '',
        channelCode: 'DigitalChannel',
        city: currentCities,
        country: selectedCountry?.key || '',
        culture,
        mtSystem: providerItem.id,
      };

      getAddressDetails(reqParams)
        .unwrap()
        .then(response => {
          if (response?.mtPoint) {
            const mtPointList = response.mtPoint?.map(el => ({
              id: el?.code,
              value: el?.address,
              label: el?.name,
              key: el?.code,
            }));
            setMtPoint({
              fieldValues: mtPointList,
              originalMtPoints: response.mtPoint,
            });
          }
        })
        .catch(ex => {
          if ('data' in ex && ex?.data?.title) {
            openToast(ex.data.title, 'error');
          }
        });
    } catch (ex) {
      console.warn('Error in getAddressOnPress: ', ex);
    }
  }, [
    cities?.originalCities,
    culture,
    getAddressDetails,
    providerItem.id,
    selectedCity?.id,
    selectedCountry?.key,
  ]);

  useEffect(() => {
    if (selectedCountry && isCityRequired) {
      getCitiesOnPress();
    }
  }, [getCitiesOnPress, isCityRequired, selectedCountry]);

  useEffect(() => {
    if (selectedCity && isAddressRequired) {
      getAddressOnPress();
    }
  }, [getAddressOnPress, isAddressRequired, selectedCity]);

  const countries = useMemo(
    () =>
      data?.countries?.map(el => ({
        id: el.code,
        value: el.caption,
        label: el.caption,
        key: el.code,
      })),
    [data?.countries],
  );

  const onSubmit = () => {
    try {
      const currentCity = cities?.originalCities?.find(city => city?.cityId === selectedCity?.id);
      const currentMtPoint = mtPoint?.originalMtPoints?.find(
        point => point?.code === selecteMTPoint?.id,
      );
      const selectedCountryVal = data?.countries?.find(el => el?.code === selectedCountry?.key);

      const navParams = {
        providerItem,
        selectedCountry: selectedCountryVal,
        selectedCity: currentCity,
        mtPoint: currentMtPoint,
      };
      navigate(MONEY_TRANSFER_SEND_INFO_SCREEN, navParams);
    } catch (ex) {
      console.warn('Error in onSubmit: ', ex);
    }
  };

  return {
    countries,
    isLoading: isLoading || getDirectionIsLoading,
    selectedCountry,
    setSelectedCountry,
    cities: cities?.fieldValues || [],
    selectedCity,
    setSelectedCity,
    mtPoints: mtPoint?.fieldValues || [],
    selecteMTPoint,
    setSelecteMTPoint,
    isCityRequired,
    isAddressRequired,
    onSubmit,
  };
};

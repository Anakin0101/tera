import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, ControlledInput, Text } from 'components';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';
import { openURL } from 'utils/openURL';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedPackage } from 'store/slices/products';
import { useTariffPackagesSingle } from './container';
import { PackagesOptionType } from './TariffPackagesSingle.types';
import { PROD_URLS } from 'services/constants/urls';

export const PackagesOption = ({ packageServices, name, id }: PackagesOptionType) => {
  const { handleRequestPackage, checkboxValue, control, activatePackageLoading } =
    useTariffPackagesSingle();
  const [selectedId, setSelectedId] = useState<string>();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { t } = useTranslation();

  const handleTermsAndConditions = () => openURL(PROD_URLS.TERMS_URL);

  const handleButtonClick = (packageService: string | any) => {
    setSelectedId(packageService.id);
  };
  useEffect(() => {
    if (selectedId) {
      dispatch(setSelectedPackage({ packageId: id, packageServiceId: selectedId }));
    }
  }, [selectedId, dispatch, id]);

  return (
    <>
      <Text style={styles.singleCardName}>{name}</Text>
      <View style={styles.paytypeWrapper}>
        <Text style={styles.text}>{t('newDeposit.selectPayType')}</Text>
      </View>
      <View style={styles.container}>
        {packageServices?.map(pservices => (
          <Pressable
            onPress={() => handleButtonClick(pservices)}
            key={pservices.id}
            style={[
              styles.button,
              selectedId === pservices.id ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Text style={styles.buttonText}>{`${pservices.name} (${pservices.price})₾`}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.descWrapper}>
        <Text style={[styles.text, styles.marginBottom]}>{t('newDeposit.confirmationText')}</Text>
      </View>
      <View style={styles.chechboxContainer}>
        <ControlledInput control={control} type="checkbox" name="agree" label="common.accept" />
        <Pressable style={styles.linkContainer} onPress={handleTermsAndConditions}>
          <Text children="common.terms_and_conditions" label special />
        </Pressable>
      </View>
      <Button.Primary
        onPress={handleRequestPackage}
        fullWidth
        text={t('common.confirm')}
        disabled={!checkboxValue}
        isLoading={activatePackageLoading}
      />
    </>
  );
};

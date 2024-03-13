import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { IconComponent, Text } from 'components/index';
import { useStyleTheme } from './AtmAndBranchItem.styles';
import { Branch, ATM } from 'assets/SVGs';
import { AtmsResponse, ServiceCentersResponse } from 'services/apis/profileAPI/profileAPI.types';
import { useCulture } from 'hooks/useCulture';
import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import {
  ATM_AND_BRANCHES_TABS,
  AtmAndBranchTabType,
} from 'screens/AtmsAndBranchesScreen/AtmsAndBranchesScreen.types';
import { openMap } from 'utils/openMap';
import { getDistanceFromLatLonInKm } from 'utils/getDistanceFromLatLonInKm';

type AtmAndBranchItemProps<T> = {
  item: T;
  type?: AtmAndBranchTabType;
  handleOpenDetails: (item: T) => void;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
};

export function AtmAndBranchItem<T extends AtmsResponse | ServiceCentersResponse>({
  item,
  type,
  currentLocation,
}: AtmAndBranchItemProps<T>) {
  const styles = useStyleTheme();
  const { culture } = useCulture();

  const iconElement = type === ATM_AND_BRANCHES_TABS.BRANCHES ? Branch : ATM;

  const contentLocalized = useMemo(() => {
    return {
      address: culture === LanguageKeyForAPIEnum.KA ? item?.addresGeo : item.addresEng,
      description:
        culture === LanguageKeyForAPIEnum.KA ? item?.descriptionGeo : item.descriptionEng,
    };
  }, [culture, item.addresEng, item?.addresGeo, item.descriptionEng, item?.descriptionGeo]);

  return (
    <Pressable
      style={styles.container}
      //   onPress={() => handleOpenDetails(item)} // TODO - in the future, we will have modal, with branch details. For now we're just redirecting to maps
      onPress={() => openMap(item.latitude, item.longitude, contentLocalized.address)}
    >
      <IconComponent
        IconJSX={iconElement}
        customIconComponentStyles={styles.icon}
        hasBorder={false}
      />

      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.centerTextContainer}>
            {contentLocalized.address && (
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {contentLocalized.address}
              </Text>
            )}
            {contentLocalized.description && (
              <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
                {contentLocalized.description}
              </Text>
            )}
          </View>

          {currentLocation?.latitude && currentLocation?.longitude ? (
            <View style={styles.rightContainer}>
              <Text style={styles.distance}>
                {getDistanceFromLatLonInKm(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  item.latitude,
                  item.longitude,
                ).toFixed(2)}
                km
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

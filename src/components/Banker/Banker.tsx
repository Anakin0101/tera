import React from 'react';
import { View } from 'react-native';
import { useStyles } from './Banker.styles';
import { Divider, IconComponent, Text } from 'components';
import Images from 'theme/Images';
import useTheme from 'hooks/useTheme';
import { GetBankerAPIResponseType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { openURL } from 'utils/openURL';

export const Banker = ({
  firstName,
  lastName,
  branchName,
  imageId,
  phone,
  email,
}: GetBankerAPIResponseType) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  if (!firstName || !lastName) {
    return null;
  }

  const fullName = `${firstName} ${lastName}`;
  const handleOpenPhone = () => openURL(`tel:${phone}`);
  const handleOpenEmail = () => openURL(`mailto:${email}`);

  return (
    <>
      <View style={styles.cardwrapper}>
        <View style={styles.dashboardTemplatesContainer}>
          <Text
            children={'dashboard.banker'}
            style={styles.titleContainer}
            color={Colors.textBlack}
          />
          <View style={styles.wrapper}>
            <View style={styles.iconView}>
              <IconComponent
                imageId={imageId}
                customIconComponentStyles={styles.customIconComponentStyles}
              />
              <View style={styles.templateCardContentContainer}>
                <Text
                  children={fullName}
                  style={styles.templateCardTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
                <View style={styles.maskedView}>
                  <Text
                    children={branchName}
                    style={styles.templateCardAmount}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  />
                </View>
              </View>
            </View>
            <View style={styles.iconWrap}>
              <IconComponent
                pngLocalIcon={Images().Phone}
                customIconComponentStyles={styles.eyeIcon}
                handler={handleOpenPhone}
              />
              <IconComponent
                pngLocalIcon={Images().Email}
                customIconComponentStyles={styles.eyeIcon}
                handler={handleOpenEmail}
              />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

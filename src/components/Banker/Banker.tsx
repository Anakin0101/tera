import React from 'react';
import { View } from 'react-native';
import { useStyles } from './Banker.styles';
import { Divider, IconComponent, Text } from 'components';
import Images from 'theme/Images';
import useTheme from 'hooks/useTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Banker = ({ data }: any) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  if (!data) {
    return null;
  }

  const { firstName, lastName, branchName, imageId } = data;

  const fullName = `${firstName} ${lastName}`;

  return (
    <>
      <View style={styles.cardwrapper}>
        <View style={styles.dashboardTemplatesContainer}>
          <Text
            children={`dashboard.banker`}
            style={styles.titleContainer}
            color={Colors.textBlack}
          />
          <TouchableOpacity style={styles.wrapper}>
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
              />
              <IconComponent
                pngLocalIcon={Images().Email}
                customIconComponentStyles={styles.eyeIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
    </>
  );
};

import React from 'react';
import { View } from 'react-native';
import { useStyles } from './CardItem.styles';
import { IconComponent, Text } from 'components';
import Images from 'theme/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardItemProps } from './CardItem.types';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const CardItem: React.FC<CardItemProps> = ({
  title,
  value,
  iconSource,
  isSecure = false,
}) => {
  const styles = useStyles();
  const securePension = useAppSelector(state => state.dashboard.maskText);
  const renderMaskedValue = () => {
    const stringValue = String(value);
    const maskedValue = '•'.repeat(5);
    return isSecure && securePension ? maskedValue : stringValue;
  };
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.iconView}>
        <IconComponent
          pngLocalIcon={iconSource}
          customIconComponentStyles={styles.customIconComponentStyles}
        />
        <View style={styles.templateCardContentContainer}>
          <Text
            children={title}
            style={styles.templateCardTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <View style={styles.maskedView}>
            <Text
              children={renderMaskedValue()}
              style={styles.templateCardAmount}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
        </View>
      </View>
      <View>
        <IconComponent
          native
          hasBorder={false}
          pngLocalIcon={Images().ChevronRight}
          customIconComponentStyles={styles.customIconComponentStyles}
        />
      </View>
    </TouchableOpacity>
  );
};

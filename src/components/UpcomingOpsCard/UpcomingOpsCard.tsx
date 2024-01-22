import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useStyles } from './UpcomingOpsCard.styles';
import { IconComponent, Text } from 'components';

export const UpcomingOpsCard = (props: any) => {
  const { title, icon, amount, date, length } = props;
  const styles = useStyles();

  const getStyles = () => {
    switch (length) {
      case 1:
        return styles.containerOneCard;
      case 2:
        return styles.containertwoCard;
      default:
        return styles.templateCardContainer;
    }
  };
  const renderText = (text?: string, style?: StyleProp<ViewStyle>, numberOfLines: number = 1) =>
    text ? (
      <Text children={text} style={style} numberOfLines={numberOfLines} ellipsizeMode="tail" />
    ) : null;
  return (
    <View style={getStyles()}>
      <IconComponent
        pngLocalIcon={icon}
        customIconComponentStyles={styles.customIconComponentStyles}
      />
      <View style={styles.templateCardContentContainer}>
        {renderText(title, styles.templateCardTitle, 2)}
        {renderText(amount, styles.templateCardContent)}
        {renderText(date, styles.dateText)}
      </View>
    </View>
  );
};

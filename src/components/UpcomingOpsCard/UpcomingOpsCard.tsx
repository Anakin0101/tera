import React from 'react';
import { View } from 'react-native';
import { useStyles } from './UpcomingOpsCard.styles';
import { IconComponent, Text } from 'components';

export const UpcomingOpsCard = (props: any) => {
  const { title, icon, amount, date } = props;
  const styles = useStyles();

  return (
    <View style={styles.templateCardContainer}>
      <IconComponent
        pngLocalIcon={icon}
        customIconComponentStyles={styles.customIconComponentStyles}
      />

      <View style={styles.templateCardContentContainer}>
        {title ? (
          <Text
            children={title}
            style={styles.templateCardTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        ) : (
          <></>
        )}
        {amount ? (
          <Text
            children={amount}
            style={styles.templateCardContent}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        ) : (
          <></>
        )}
        {date ? (
          <Text children={date} style={styles.dateText} numberOfLines={1} ellipsizeMode="tail" />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

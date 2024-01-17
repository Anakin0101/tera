import React, { FC } from 'react';
import { Alert, View } from 'react-native';

import { useStyleTheme } from './CustomHeader.styles';
import { CustomHeaderOptions } from './CustomHeader.types';
import { Search, Chat } from 'assets/SVGs';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { Text } from 'components/index';

export const CustomHeader: FC<Partial<CustomHeaderOptions>> = ({
  title,
  customHeaderContainerStyle,
}) => {
  const styles = useStyleTheme();

  const handleSearch = () => {
    Alert.alert('search!!!');
  };

  const handleMessagesPress = () => {
    Alert.alert('handleMessagesPress!!!');
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, customHeaderContainerStyle]}>
        <Text children={title} style={styles.text} />
        <View style={styles.iconContainer}>
          <IconComponent
            handler={handleSearch}
            IconJSX={Search}
            customIconComponentStyles={styles.icon}
          />
          <View>
            <IconComponent
              handler={handleMessagesPress}
              IconJSX={Chat}
              customIconComponentStyles={styles.icon}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>{4}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

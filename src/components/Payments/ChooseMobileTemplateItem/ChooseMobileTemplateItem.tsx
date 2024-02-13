import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './ChooseMobileTemplateItem.styles';
import { Text } from 'components/Text/Text';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { ArrowRight } from 'assets/SVGs';

export const ChooseMobileTemplateItem = memo(({}) => {
  const styles = useStyles();

  return (
    <Pressable style={[styles.itemWrapperMargin]} onPress={() => {}}>
      <View style={styles.itemWrapper}>
        <View style={styles.itemIconWrapper}>
          <IconComponent imageId={'imageId'} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.itemTitle}>ანა</Text>
            <Text style={styles.itemDesc}>555847364</Text>
          </View>
          <ArrowRight />
        </View>
      </View>
      <View style={styles.contentBorder} />
    </Pressable>
  );
});

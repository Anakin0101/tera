import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { RadioProps } from './Radio.types';
import { useStyleTheme } from './Radio.styles';
import { Text } from 'components/index';

export const Radio: FC<RadioProps> = ({
  isSelected,
  onPress,
  label,
  disabled,
  style,
  subTitle,
}) => {
  const styles = useStyleTheme();

  const handlePress = () => {
    onPress?.(!isSelected);
  };

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <View style={[styles.wrapper, style]}>
        <View style={[styles.outline, isSelected && styles.selected]}>
          {isSelected && <View style={styles.inner} />}
        </View>
        {label && !subTitle && <Text children={label} style={styles.label} />}
        {label && subTitle && (
          <View style={styles.detailsWrapper}>
            {label && <Text children={label} style={styles.label} />}
            {subTitle && <Text children={subTitle} style={styles.label} />}
          </View>
        )}
      </View>
    </Pressable>
  );
};

import React, { useCallback } from 'react';
import { View, Pressable, TouchableOpacity } from 'react-native';
import { Text } from 'components/index';
import { Colors } from 'theme/Variables';
import { useStyles } from './AllTemplatesScreen.styles';
import { getCurrencyIcon } from 'utils/currency';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, { useAnimatedStyle, interpolate, useSharedValue } from 'react-native-reanimated';
import { IconComponent } from 'components/index';
import { Divider } from 'components/index';
import { TemplateDelete, TemplateAdd, TemplateDeleteTrust } from 'assets/SVGs';
import { TemplatesSectionProps } from './AllTemplatesScreen.types';

let rowRefs: Array<any> = [];
let prevOpenedRow: any;

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  templates,
  index,
  templateDeleteBtn,
  templateAddBtn,
}: TemplatesSectionProps) => {
  const styles = useStyles();

  const dragX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(dragX.value, [0, 50, 60, 61], [-1, 0, 0, 100]);

    return {
      transform: [{ translateX }],
    };
  }, []);
  const isTemplateTrusted = (template: any): boolean => {
    const sectionKeys: (keyof any)[] = [
      'conversion',
      'p2pTransfers',
      'bankExternal',
      'mobilePayment',
      'bankInternal',
      'budget',
      'internal',
    ];
    return sectionKeys.some(section => template[section]?.isTrusted === true);
  };
  const trusted = isTemplateTrusted(templates);

  const renderRightActions = useCallback(() => {
    return (
      <Animated.View style={animatedStyle}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.rightAction} onPress={() => templateDeleteBtn(templates)}>
            <TemplateDelete />
          </TouchableOpacity>
          {trusted ? (
            <TouchableOpacity
              style={styles.rightAction}
              onPress={() => {
                templateAddBtn(templates, true);
              }}
            >
              <TemplateDeleteTrust />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.rightAction}
              onPress={() => {
                templateAddBtn(templates, false);
              }}
            >
              <TemplateAdd />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  }, [
    animatedStyle,
    styles.buttonWrapper,
    styles.rightAction,
    trusted,
    templateDeleteBtn,
    templates,
    templateAddBtn,
  ]);

  const closeRow = useCallback(() => {
    if (prevOpenedRow && prevOpenedRow !== rowRefs[index]) {
      prevOpenedRow?.close();
    }
    prevOpenedRow = rowRefs[index];
  }, [index]);

  const { name, icon, internalIban, internalAmount, currency } = templates || {};

  return (
    <Swipeable
      key={index}
      childrenContainerStyle={styles.childrenContainerStyle}
      ref={ref => (rowRefs[index] = ref)}
      onSwipeableOpen={() => closeRow()}
      renderRightActions={renderRightActions}
    >
      <Pressable style={styles.templates}>
        <IconComponent customIconComponentStyles={styles.cardContainer} pngLocalIcon={icon} />
        <View style={styles.detailsWrapper}>
          <View style={styles.details}>
            <View style={styles.textContainer}>
              <Text size={14} numberOfLines={1} color={Colors.textBlack} children={name} />
              <Text children={internalIban} size={12} color={Colors.textBlack400} />
            </View>
            <Text
              children={`${getCurrencyIcon(currency)} ${internalAmount}`}
              label
              color={Colors.textBlack}
            />
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
        </View>
      </Pressable>
    </Swipeable>
  );
};

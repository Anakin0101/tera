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
import {
  TemplateDelete,
  TemplateAdd,
  TemplateDeleteTrust,
  SuccessTemplate,
  PendingTemplate,
} from 'assets/SVGs';
import { TemplatesSectionProps } from './AllTemplatesScreen.types';
import { sectionKeys, trustedTransactions } from 'utils/transactionUtils';
import { Template } from 'services/apis/dashboardAPI/dashboardAPI.types';

let rowRefs: Array<Swipeable | null> = [];
let prevOpenedRow: Swipeable | null;

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  templates,
  index,
  templateDeleteBtn,
  templateAddBtn,
}: TemplatesSectionProps) => {
  const styles = useStyles();

  const dragX = useSharedValue(0);

  const isWithin24Hours = (timestamp: string | number | Date) => {
    const trustedTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    return (currentTime - trustedTime) / (1000 * 60 * 60) <= 24;
  };
  const getEarliestTrustedDate = (template: Template) => {
    const trustedDates = sectionKeys
      .flatMap(section =>
        template[section as keyof Template]?.isTrusted
          ? new Date(template[section as keyof Template]?.trustedAddDate ?? '').getTime()
          : [],
      )
      .filter(date => !isNaN(date));

    if (trustedDates.length === 0) {
      return null;
    }

    const earliestTimestamp = Math.min(...trustedDates);
    return new Date(earliestTimestamp);
  };

  const renderTrustIcon = useCallback(() => {
    const earliestTrustedDate = getEarliestTrustedDate(templates);
    if (earliestTrustedDate) {
      return isWithin24Hours(earliestTrustedDate) ? <PendingTemplate /> : <SuccessTemplate />;
    }
    return null;
  }, [templates]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(dragX.value, [0, 50, 60, 61], [-1, 0, 0, 100]);

    return {
      transform: [{ translateX }],
    };
  }, []);
  const isTemplateTrusted = (template: Template): boolean => {
    return trustedTransactions.some(section => template[section]?.isTrusted === true);
  };
  const trusted = isTemplateTrusted(templates);
  const isTemplateInSection = (template: Template): boolean => {
    return trustedTransactions.some(section => template[section] !== null);
  };
  const templateInSection = isTemplateInSection(templates);

  const renderRightActions = useCallback(() => {
    return (
      <Animated.View style={animatedStyle}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.rightAction} onPress={() => templateDeleteBtn(templates)}>
            <TemplateDelete />
          </TouchableOpacity>
          {templateInSection && (
            <>
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
            </>
          )}
        </View>
      </Animated.View>
    );
  }, [
    animatedStyle,
    styles.buttonWrapper,
    styles.rightAction,
    templateInSection,
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
        <View>
          <IconComponent customIconComponentStyles={styles.cardContainer} pngLocalIcon={icon} />
          {trusted && <View style={styles.trustIcon}>{renderTrustIcon()}</View>}
        </View>
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

import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './FinishScreenContent.styles';
import { FailedSvg, SuccessTransaction } from 'assets/SVGs';
import { FinishScreenContentProps } from './FinishScreenContent.tyoes';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackScreenProps } from 'navigation/types';
import { DASHBOARD_SCREEN } from 'navigation/ScreenNames';

export const FinishScreenContent: FC<FinishScreenContentProps> = ({
  isSuccess = true,
  children,
  ctaHandler,
  ctaTEXT,
  description,
  title,
  titleStyle,
  descriptionStyle,
  titleTranslateProp,
  descriptionTranslateProp,
  buttonStyle,
  containerStyle,
  iconSize = 88,
}) => {
  const styles = useStyleTheme();
  const { navigate } = useNavigation<DashboardStackScreenProps<'DashboardScreen'>>();

  const handleHomePress = useCallback(() => {
    navigate(DASHBOARD_SCREEN);
  }, [navigate]);

  const handlePress = () => {
    if (ctaHandler) {
      ctaHandler();
    } else {
      handleHomePress();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.wrapper}>
        {isSuccess ? (
          <SuccessTransaction width={iconSize} height={iconSize} />
        ) : (
          <FailedSvg width={iconSize} height={iconSize} />
        )}
        {title && (
          <Text style={[styles.title, titleStyle]} translateProp={titleTranslateProp}>
            {title}
          </Text>
        )}
        {description && (
          <Text
            style={[styles.description, descriptionStyle]}
            translateProp={descriptionTranslateProp}
          >
            {description}
          </Text>
        )}
        {children}
        <Button.Primary
          hitSlop={10}
          text={ctaTEXT}
          onPress={handlePress}
          fixedWidth={true}
          customWrapperStyle={[styles.wrapperStyle, buttonStyle]}
        />
      </View>
    </View>
  );
};

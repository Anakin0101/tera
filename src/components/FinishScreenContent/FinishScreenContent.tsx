import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './FinishScreenContent.styles';
import { FailedSvg, SuccessTransaction } from 'assets/SVGs';
import { FinishScreenContentProps } from './FinishScreenContent.tyoes';

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

  const handlePress = () => {
    ctaHandler?.();
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

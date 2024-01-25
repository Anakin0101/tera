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
}) => {
  const styles = useStyleTheme();

  const handlePress = () => {
    ctaHandler?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {isSuccess ? <SuccessTransaction /> : <FailedSvg />}
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
        <Button.Primary
          hitSlop={10}
          text={ctaTEXT}
          onPress={handlePress}
          fixedWidth={true}
          customWrapperStyle={styles.wrapperStyle}
        />
      </View>
    </View>
  );
};

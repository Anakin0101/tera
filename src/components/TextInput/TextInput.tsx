import React, { forwardRef, useState } from 'react';
import { View, TextInput as RNTextInput, Pressable } from 'react-native';
import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import { ControlledInputProps, TextInputProps } from './TextInput.types';
import { useStyleTheme } from './TextInput.styles';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues } from 'react-hook-form';
import { Checkbox, Text } from '../index';
import { OpenEye, CloseEye } from 'assets/SVGs';

const HIT_SLOP = { top: 15, bottom: 15 };

export const TextInput = forwardRef<RNTextInput, TextInputProps & { showErrorUI?: boolean }>(
  (
    {
      value,
      label,
      onChangeText,
      marginTop,
      secureTextEntry,
      keyboardType,
      editable,
      maxLength,
      autoCorrect,
      labelStyle,
      inputStyle,
      containerStyle,
      iconContainerStyle,
      autoFocus,
      showErrorUI,
    },
    ref,
  ) => {
    const styles = useStyleTheme();
    const [secureText, setSecureText] = useState(secureTextEntry);
    const position = useSharedValue(0);
    const { t } = useTranslation();

    const handlePress = () => {
      setSecureText(prev => !prev);
    };

    const handleFocus = () => {
      if (!value) {
        position.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
      }
    };

    const handleLayout = () => {
      if (value) {
        position.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
      }
    };

    const handleBlur = () => {
      if (!value) {
        position.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      }
    };

    const labelAnimatedStyles = useAnimatedStyle(() => ({
      top: interpolate(position.value, [0, 1], [17, 2], Extrapolation.CLAMP),
      fontSize: interpolate(position.value, [0, 1], [16, 12], Extrapolation.CLAMP),
    }));

    return (
      <View
        ref={ref}
        style={[
          styles.inputContainer,
          { marginTop },
          containerStyle,
          showErrorUI && styles.withErrorInputContainer,
        ]}
      >
        <Animated.Text
          children={t(label)}
          style={[styles.label, labelStyle, labelAnimatedStyles]}
        />
        <View style={styles.wrapper}>
          <RNTextInput
            value={value}
            hitSlop={HIT_SLOP}
            editable={editable}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onLayout={handleLayout}
            maxLength={maxLength}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            secureTextEntry={secureText}
            autoFocus={autoFocus}
            autoComplete="off"
            style={[styles.input, inputStyle]}
          />
          {secureTextEntry && value && (
            <Pressable onPress={handlePress} style={[styles.iconContainer, iconContainerStyle]}>
              {secureText ? <OpenEye /> : <CloseEye />}
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

export const ErrorMessage = ({ label, errorMessage }: TextInputProps) => {
  const styles = useStyleTheme();
  const { t } = useTranslation();
  const message = `${t(label)} ${t(errorMessage)}`;
  return <Text children={message} style={styles.errorMessage} />;
};

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  required,
  type = 'text',
  handleChange,
  defaultValue,
  errors,
  ...props
}: ControlledInputProps<T> & {
  handleChange?: () => void;
}) => {
  const showErrorUI = !!errors?.[name];
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required, ...rules }}
        render={({ field: { onChange, value } }) => {
          if (type === 'checkbox') {
            return (
              <Checkbox
                isChecked={value}
                onChange={e => {
                  onChange(e);
                  handleChange?.();
                }}
                label={label}
              />
            );
          }
          return (
            <TextInput
              value={value}
              onChangeText={onChange}
              label={label}
              showErrorUI={showErrorUI}
              {...props}
            />
          );
        }}
      />
      {showErrorUI && <ErrorMessage label={label} {...props} />}
    </>
  );
};

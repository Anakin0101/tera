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
import { Checkbox, Radio, Text } from 'components/index';
import { OpenEye, CloseEye, Invoice } from 'assets/SVGs';

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
      invoice,
      invoiceClick,
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
          {invoice && (
            <Pressable onPress={invoiceClick} style={[styles.iconContainer, iconContainerStyle]}>
              <Invoice />
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

export type ErrorMessageType = {
  name: any;
  errors: any; //TODO - Dea - fix types
  label?: string;
  showErrorUI: boolean;
};

export const ErrorMessage = ({ name, errors, label, showErrorUI }: ErrorMessageType) => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  const errorMessage = `${t(label)} ${t(errors?.[name]?.message)}`;
  const message = showErrorUI ? errorMessage : ' ';
  return (
    <Text
      children={message}
      style={[styles.errorMessage, showErrorUI && styles.errorMessageColor]}
    />
  );
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
  showErrorMessage = true,
  selectedRadio,
  setSelectedRadio,
  ...props
}: ControlledInputProps<T> & {
  handleChange?: (selectedValue?: string | null) => void;
  showErrorMessage?: boolean;
  selectedRadio?: string | null;
  setSelectedRadio?: React.Dispatch<React.SetStateAction<string | null>>;
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
          if (type === 'radio') {
            return (
              <Radio
                isSelected={name === selectedRadio}
                onPress={() => {
                  onChange(name);
                  handleChange?.(name);
                  setSelectedRadio?.(name);
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
      {showErrorMessage && (
        <ErrorMessage
          name={name}
          errors={errors}
          label={label}
          showErrorUI={showErrorUI}
          {...props}
        />
      )}
    </>
  );
};

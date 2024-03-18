import React from 'react';
import { Text, View } from 'react-native';
import { Button, ControlledInput, IconComponent } from 'components';
import { CheckCircle, UserIcon } from 'assets/SVGs';
import { useStyles } from './EditUserInfo.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { REGEX } from 'constants/index';
import { CheckStatic } from 'assets/SVGs/CheckStatic';
import { Colors } from 'theme/Variables';
import { useEditUserInfo } from './container';
import { useTranslation } from 'react-i18next';
import { SettingsEdit } from 'assets/SVGs/SettingsEdit';

export const EditUserInfo = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const {
    fullName,
    isLatin,
    isMinLength,
    inputValue,
    imageId,
    codeInputValue,
    isValidCode,
    validateNameInput,
    validateCodewordInput,
    inputDisplay,
    onSubmit,
    control,
    errors,
    handleSubmit,
  } = useEditUserInfo();

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.userWrapper}>
          {imageId ? (
            <IconComponent imageId={imageId} />
          ) : (
            <IconComponent
              customIconSize={38}
              IconJSX={UserIcon}
              customIconComponentStyles={styles.icon}
              hasBorder={false}
            />
          )}
          <View style={styles.EditIconWrapper}>
            <IconComponent
              customIconSize={22}
              IconJSX={SettingsEdit}
              customIconComponentStyles={styles.EditIcon}
              hasBorder={false}
            />
          </View>
          <Text style={styles.userNameTitle}>{t('settings.userName')}</Text>
          <Text style={styles.userName}>{fullName}</Text>
        </View>
        <View>
          <ControlledInput
            value={inputValue}
            marginTop={8}
            control={control}
            name={'userName'}
            onChangeText={validateNameInput}
            label={t('settings.newName')}
          />

          <View style={styles.doneWrapper}>
            {inputDisplay ? (
              <IconComponent
                IconJSX={() => <CheckCircle height={24} width={24} />}
                hasBorder={false}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.rulesContainer}>
          <View style={styles.rulesWrapper}>
            <IconComponent
              IconJSX={() => (
                <CheckStatic fillColor={isLatin ? Colors.success : Colors.rulesColor} />
              )}
              hasBorder={false}
            />
            <Text style={isLatin ? styles.valid : styles.notValid}>{t('settings.enterlatin')}</Text>
          </View>
          <View style={styles.rulesWrapper}>
            <IconComponent
              IconJSX={() => (
                <CheckStatic fillColor={isMinLength ? Colors.success : Colors.rulesColor} />
              )}
              hasBorder={false}
            />
            <Text style={isMinLength ? styles.valid : styles.notValid}>
              {t('settings.minLength')}
            </Text>
          </View>
        </View>

        <ControlledInput
          label={t('settings.email')}
          control={control}
          name={'userEmail'}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
            pattern: {
              value: REGEX.EMAIL,
              message: t('settings.invalid'),
            },
          }}
        />

        <ControlledInput
          value={codeInputValue}
          onChangeText={validateCodewordInput}
          control={control}
          name="code"
          marginTop={8}
          label={t('settings.codeWord')}
        />
        <View style={styles.rulesWrapper}>
          <IconComponent
            IconJSX={() => (
              <CheckStatic fillColor={isValidCode ? Colors.success : Colors.rulesColor} />
            )}
            hasBorder={false}
          />
          <Text style={isValidCode ? styles.valid : styles.notValid}>
            {t('settings.dontInclude')}
          </Text>
        </View>

        <ControlledInput
          keyboardType={'decimal-pad'}
          control={control}
          name="phone"
          marginTop={8}
          label={t('settings.phone')}
        />

        <ControlledInput
          control={control}
          name="address"
          marginTop={8}
          label={t('settings.address')}
        />
        <Button.Primary text={t('common.save')} onPress={handleSubmit(onSubmit)} fullWidth />
      </View>
    </ScrollView>
  );
};

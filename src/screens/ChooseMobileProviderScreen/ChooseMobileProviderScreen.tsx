import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { pickContact } from 'react-native-contact-pick';

import { Button, Text, TextInput } from 'components/index';
import { useStyles } from './ChooseMobileProviderScreen.style';
import { Contact } from 'assets/SVGs';
import { checkContactsPermissions } from 'utils/persmissionChecker';
import { useChooseMobileProviderScreen } from './container';
import { useKeyboard } from 'utils/useKeyboard';
import { Spacing } from 'theme/Variables';

export const ChooseMobileProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { isKeyboardOpened, keyboardHeight } = useKeyboard();
  const { checkNumberDetails } = useChooseMobileProviderScreen();

  const [mobileNumber, setMobileNumber] = useState<string>('');

  const getContactList = useCallback(async () => {
    try {
      const checkPermission = await checkContactsPermissions();
      if (checkPermission) {
        const res = await pickContact();
        if (res?.phoneNumbers?.[0]?.number) {
          checkNumberDetails(res?.phoneNumbers?.[0]?.number);
        }
      }
    } catch (ex) {
      console.warn(ex);
    }
  }, [checkNumberDetails]);

  const getMobileNumberDetails = useCallback(() => {
    checkNumberDetails(mobileNumber);
  }, [checkNumberDetails, mobileNumber]);

  {
    /* შაბლონების ლისტისთვის არის დროებით და გამოვიყენებთ მალე, ველოდებით სერვისების ინტეგრაციას */
  }
  // const renderItem = useCallback(() => {
  //   return <ChooseMobileTemplateItem />;
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.enterMobileNumber}>
        {t('chooseMobileProviderScreen.enterMobileNumber')}
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.codeWrapper}>
          <Text style={styles.codeTitle}>{t('chooseMobileProviderScreen.code')}</Text>
          <Text style={styles.codeValue}>+995</Text>
          <View style={styles.codeBorder} />
        </View>
        <TextInput
          label={t('chooseMobileProviderScreen.mobileNumber')}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          marginTop={24}
          containerStyle={styles.inputWrapper}
          keyboardType="number-pad"
          maxLength={9}
        />
      </View>
      <Pressable style={styles.chooseFromContactWrapper} onPress={getContactList}>
        <Contact />
        <Text style={styles.chooseFromLabel}>
          {t('chooseMobileProviderScreen.chooseFromContact')}
        </Text>
      </Pressable>
      <Text style={styles.enterMobileNumber}>
        {t('chooseMobileProviderScreen.mobileTemplates')}
      </Text>
      {/* შაბლონების ლისტისთვის არის დროებით და გამოვიყენებთ მალე */}
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        data={['0', '1', '2', '23', '23', '23', '23', '23', '23', '23', '23', '23']}
        renderItem={renderItem}
        contentContainerStyle={styles.templatesList}
      /> */}
      {mobileNumber?.length === 9 && (
        <View
          style={[
            styles.nextButtonWrapper,
            isKeyboardOpened && { bottom: keyboardHeight + Spacing.md },
          ]}
        >
          <Button.Primary text="common.next" fullWidth onPress={getMobileNumberDetails} />
        </View>
      )}
    </View>
  );
};

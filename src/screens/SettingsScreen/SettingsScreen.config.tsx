import {
  Asterisks,
  Email,
  Key,
  NotificationsManage,
  Shield,
  SmartPhoneChecked,
  UserIcon,
} from 'assets/SVGs';
import { SettingsConfigType } from './SettingsScreen.types';
import { AUTHORIZATION_METHODS_SCREEN } from 'navigation/ScreenNames';

export const SettingsScreenConfig: SettingsConfigType[] = [
  {
    title: 'settings.personal_info',
    subContent: [
      {
        title: 'settings.edit_user',
        icon: UserIcon,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        title: 'settings.email',
        icon: Email,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
  {
    title: 'settings.security_settings',
    subContent: [
      {
        title: 'settings.change_password',
        icon: Key,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        title: 'settings.change_code_word',
        icon: Asterisks,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        title: 'settings.security_level',
        icon: Shield,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        title: 'settings.trusted_devices',
        icon: SmartPhoneChecked,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
  {
    title: 'settings.additional_settings',
    subContent: [
      {
        title: 'settings.manage_notifications',
        icon: NotificationsManage,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
];

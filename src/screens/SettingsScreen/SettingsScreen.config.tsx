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
        index: 0,
        id: 'settings.edit_user',
        text: 'settings.edit_user',
        icon: UserIcon,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        index: 1,
        id: 'settings.email',
        text: 'settings.email',
        icon: Email,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
  {
    title: 'settings.security_settings',
    subContent: [
      {
        index: 0,
        id: 'settings.change_password',
        text: 'settings.change_password',
        icon: Key,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        index: 1,
        id: 'settings.change_code_word',
        text: 'settings.change_code_word',
        icon: Asterisks,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        index: 2,
        id: 'settings.security_level',
        text: 'settings.security_level',
        icon: Shield,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
      {
        index: 3,
        id: 'settings.trusted_devices',
        text: 'settings.trusted_devices',
        icon: SmartPhoneChecked,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
  {
    title: 'settings.additional_settings',
    subContent: [
      {
        index: 0,
        id: 'settings.manage_notifications',
        text: 'settings.manage_notifications',
        icon: NotificationsManage,
        navigateTo: AUTHORIZATION_METHODS_SCREEN,
      },
    ],
  },
];

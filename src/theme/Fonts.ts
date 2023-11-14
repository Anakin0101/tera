/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';
import { ThemeVariables } from 'types/declarations/theme';

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.textGray400,
    },
    textSmall: {
      fontSize: FontSize.small,
      fontWeight: '400',
      color: Colors.textGray700,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.textGray400,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.textGray400,
    },
    textBold: {
      fontWeight: 'bold',
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      fontSize: FontSize.small,
      fontWeight: 'bold',
      color: Colors.textBlack,
    },
    titleRegular: {
      fontSize: FontSize.regular,
      fontWeight: 'bold',
      color: Colors.textBlack,
    },
    titleregularPlus: {
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
      color: Colors.textGray700,
    },
    semiLarge: {
      fontSize: FontSize.semiLarge,
      fontWeight: '500',
      color: Colors.textGray700,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.textBlack,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textError: {
      color: Colors.error,
    },
    textSuccess: {
      color: Colors.success,
    },
    textPrimary: {
      color: Colors.primary,
    },
    textLight: {
      color: Colors.textGray200,
    },
    textLobster: {
      fontFamily: 'lobster',
      fontWeight: 'normal',
    },
  });
}

import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from 'hooks';
import { Colors, FontFamily, FontSize } from 'theme/Variables';

export const theme = {
  textSectionTitleColor: Colors.dotGray,
  todayTextColor: Colors.primary,
  arrowColor: Colors.primary,
  monthTextColor: Colors.primary,
  textMonthFontFamily: FontFamily.Regular,
  textDayHeaderFontFamily: FontFamily.Regular,
  textMonthFontWeight: '400' as TextStyle['fontWeight'],
  textDayHeaderFontSize: FontSize.tiny,
  textDayFontFamily: FontFamily.Regular,
  textDayFontSize: FontSize.small,
  textDisabledColor: Colors.dotGray,
  textDayStyle: {
    color: Colors.textBlack,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
};

export const useStyles = () => {
  const { Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      marginTop: Spacing.m,
    },
  });
};

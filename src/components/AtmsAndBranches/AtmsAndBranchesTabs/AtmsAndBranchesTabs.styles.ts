import useTheme from 'hooks/useTheme';
import { StatusBar, StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
    },
    scene: {
      ...Layout.fill,
      alignItems: 'center',
      justifyContent: 'center',
    },

    tabItem: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    activeTabItem: {
      borderBottomColor: Colors.primary,
      borderBottomWidth: 2,
    },
    inActiveTabItem: {},
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      backgroundColor: 'yourActiveTabColor',
    },
    tabBar: {
      flexDirection: 'row',
      paddingTop: StatusBar.currentHeight,
    },
    activeTabText: {
      color: Colors.primary,
      lineHeight: 20,
    },
    inActiveTabText: {
      color: Colors.textBlack400,
      lineHeight: 20,
    },
    listWrapper: { flex: 1 },

    itemSeparatorStyle: {
      maxWidth: '80%',
      marginLeft: Spacing.xxxl + Spacing.m,
    },
  });
};

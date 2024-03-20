import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../index';
import { ALL_ACCOUNTS_AND_CARDS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { FooterProps } from './CardsAndAccounts.types';
import { useStyles } from './CardsAndAccounts.styles';

export const ListFooter: FC<FooterProps> = memo(({ showFooter, groupedUserBalance = 0 }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const onPress = () => {
    navigate(MODAL_STACK, {
      screen: ALL_ACCOUNTS_AND_CARDS_SCREEN,
      params: { groupedUserBalance },
    });
  };

  if (!showFooter) {
    return <></>;
  }

  return (
    <Pressable onPress={onPress} style={styles.seeAll}>
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
});

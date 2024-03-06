import React, { FC, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Text } from '../index';
import { CreditCard, Smartphone, Swap } from 'assets/SVGs';
import { ActionButtonsProps, IButton } from './CardsAndBalance.types';
import useStyles from './CardsAndBalance.styles';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import {
  MODAL_STACK,
  OTHER_BANK_TANSACTION_SCREEN,
  PAYMENTS_SCREEN,
  PAYMENTS_STACK,
  TO_ACCOUNT_SCREEN,
} from 'navigation/ScreenNames';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccountFromData } from 'store/slices/transfers';

const Button: FC<IButton> = ({ icon, label, onPress }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress} style={styles.actionButton}>
      <View style={styles.actionButtonIconContainer}>{icon}</View>
      <Text children={label} center label marginTop={10} />
    </Pressable>
  );
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  children,
  progress,
  onSpacePress,
  selectedAccountFromCard,
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const actionButtons = useAnimatedStyle(() => {
    const value = interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP);
    const height = interpolate(progress.value, [0.5, 1], [0, 140], Extrapolation.CLAMP);

    return {
      transform: [{ scale: value }],
      opacity: value,
      height,
    };
  });

  const transferToOwnAccount = useCallback(() => {
    dispatch(setAccountFromData(selectedAccountFromCard));
    navigate(MODAL_STACK, {
      screen: TO_ACCOUNT_SCREEN,
      params: { selected: selectedAccountFromCard?.accountId },
    });
  }, [dispatch, navigate, selectedAccountFromCard]);

  const transferToSomeone = useCallback(() => {
    dispatch(setAccountFromData(selectedAccountFromCard));
    navigate(MODAL_STACK, {
      screen: OTHER_BANK_TANSACTION_SCREEN,
      params: { otherBanks: true },
    });
  }, [dispatch, navigate, selectedAccountFromCard]);

  const handlePayments = useCallback(() => {
    navigate(PAYMENTS_STACK, {
      screen: PAYMENTS_SCREEN,
      params: { selectedAccountFromCard },
    });
  }, [navigate, selectedAccountFromCard]);

  const handleExtraction = () => {};

  return (
    <Pressable onPress={onSpacePress}>
      <Animated.View style={[actionButtons]}>
        <View style={styles.actionButtonContainer}>
          <Button
            label="dashboard.transferToOwnAcc"
            icon={<Swap />}
            onPress={transferToOwnAccount}
          />
          <Button label="dashboard.transferToSomeone" icon={<Swap />} onPress={transferToSomeone} />
          <Button label="dashboard.payments" icon={<CreditCard />} onPress={handlePayments} />
          <Button label="dashboard.extraction" icon={<Smartphone />} onPress={handleExtraction} />
        </View>
        {children}
      </Animated.View>
    </Pressable>
  );
};

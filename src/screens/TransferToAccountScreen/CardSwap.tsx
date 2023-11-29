import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TinyChevron } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { clearAccountFromData, clearAccountToData } from 'store/slices/transfers/indext';
import { cardSwapProps } from './TransferToAccountScreen.types';

export type cardProps = {
  accountFromData: cardSwapProps | null;
  accountToData: cardSwapProps | null;
};

const CardItem = ({
  title,
  balance,
  onPress,
}: {
  title: string | undefined;
  balance: number | undefined;
  onPress: () => void;
}) => {
  const styles = useStyleTheme();

  return (
    <TouchableOpacity style={styles.buttonCard} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.card} />
      </View>
      <View style={styles.wrapCard}>
        <Text children={title} style={styles.textAccount} numberOfLines={1} />
        <Text children={balance} style={styles.text} />
      </View>
    </TouchableOpacity>
  );
};

export const CardSwap = ({ accountFromData, accountToData }: cardProps) => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'ToAccountScreen'>>();
  const dispatch = useDispatch();
  const styles = useStyleTheme();

  const handlePress = useCallback(
    (arg: number) => {
      if (arg === 1) {
        dispatch(clearAccountFromData());
        navigate('MyAccountsScreen');
      } else {
        dispatch(clearAccountToData());
        navigate('ToAccountScreen', { selected: null });
      }
    },
    [dispatch, navigate],
  );

  return (
    <View style={styles.cardWrapper}>
      <CardItem
        title={accountFromData?.accountName}
        balance={accountFromData?.balance}
        onPress={() => handlePress(1)}
      />
      <TinyChevron style={styles.chevronIcon} />
      <CardItem
        title={accountToData?.accountName}
        balance={accountToData?.balance}
        onPress={() => handlePress(2)}
      />
    </View>
  );
};

export default CardSwap;

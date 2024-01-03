import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TinyChevron } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { clearAccountFromData, clearAccountToData } from 'store/slices/transfers';
import { useAppSelector } from 'store/hooks/useAppSelector';

export type cardProps = {
  accountFromData: any;
  accountToData: any;
};
interface SelectedItem {
  selectedIban: number | null;
}
const CardItem = ({
  title,
  balance,
  onPress,
  reverse,
}: {
  title: string | undefined;
  balance: number | undefined;
  onPress: () => void;
  reverse?: boolean;
}) => {
  const styles = useStyleTheme();

  return (
    <TouchableOpacity style={styles.buttonCard} onPress={onPress}>
      {!reverse ? (
        <>
          <View style={styles.cardContainer}>
            <View style={styles.card} />
          </View>
          <View style={styles.wrapCard}>
            <Text children={title} style={styles.textAccount} numberOfLines={1} />
            <Text children={balance} style={styles.textLine} numberOfLines={1} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.wrapCard}>
            <Text children={title} style={styles.textAccount} numberOfLines={1} />
            <Text children={balance} style={styles.textLine} numberOfLines={1} />
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export const CardSwap = ({ accountFromData, accountToData }: cardProps) => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'ToAccountScreen'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { selectedIban } = selectedItemFromStore;
  const dispatch = useDispatch();
  const styles = useStyleTheme();

  const handlePress = useCallback(
    (arg: number) => {
      if (arg === 1) {
        dispatch(clearAccountFromData());
        navigate('MyAccountsScreen');
      } else {
        dispatch(clearAccountToData());
        navigate('ToAccountScreen', { selected: selectedIban });
      }
    },
    [dispatch, navigate, selectedIban],
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
        reverse
        title={accountToData?.accountName ? accountToData?.accountName : accountToData?.name}
        balance={accountToData?.balance ? accountToData?.balance : accountToData?.iban}
        onPress={() => handlePress(2)}
      />
    </View>
  );
};

export default CardSwap;

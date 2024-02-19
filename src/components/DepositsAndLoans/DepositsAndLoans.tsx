import React, { FC } from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks';
import { ListItem } from './ListItem';
import { Divider, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import {
  FooterProps,
  HeaderProps,
  RenderItemType,
  DepositsAndLoansProps,
} from './DepositsAndLoans.types';
import {
  LOANS_SCREEN,
  DEPOSITS_SCREEN,
  LOAN_DETAILS_SCREEN,
  DEPOSIT_DETAILS_SCREEN,
} from 'navigation/ScreenNames';
import Images from 'theme/Images';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './DepositsAndLoans.styles';

const ListHeader: FC<HeaderProps> = ({ variant, quantity, totalAmount, seeAll }) => {
  const styles = useStyles(seeAll);
  const { Colors } = useTheme();
  return (
    <View style={styles.header}>
      {!seeAll && (
        <Text
          size={14}
          lineHeight={20}
          color={Colors.textBlack500}
          translateProp={{ value: quantity }}
          children={variant === 'deposit' ? 'products.deposits' : 'products.loans'}
        />
      )}
      <Text size={30} regular lineHeight={36} marginTop={8}>
        {formatMoney(totalAmount || 0)} ₾
      </Text>
    </View>
  );
};

const ListFooter: FC<FooterProps> = ({ variant }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'DepositsScreen'>>();

  const navigateToDeposits = () => {
    navigate(DEPOSITS_SCREEN);
  };

  const navigateToLoans = () => {
    navigate(LOANS_SCREEN);
  };

  return (
    <Pressable
      onPress={variant === 'deposit' ? navigateToDeposits : navigateToLoans}
      style={styles.seeAll}
    >
      <Text children="transfers.all" special size={14} lineHeight={20} />
    </Pressable>
  );
};

export const DepositsAndLoans: FC<DepositsAndLoansProps> = ({
  data,
  totalAmount,
  variant,
  seeAll = false,
  displayDivider,
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'DepositDetailsScreen'>>();

  if (!data?.length) {
    return null;
  }

  const navigateToDepositDetails = (index: number) => {
    navigate(DEPOSIT_DETAILS_SCREEN, {
      index,
    });
  };

  const navigateToLoanDetails = (index: number) => {
    navigate(LOAN_DETAILS_SCREEN, {
      index,
    });
  };

  const renderItem: ListRenderItem<RenderItemType> = ({ item, index }) => {
    return (
      <ListItem
        item={item}
        icon={variant === 'deposit' ? Images().AssetsIcon : Images().LiabilitiesIcon}
        onPress={() =>
          variant === 'deposit' ? navigateToDepositDetails(index) : navigateToLoanDetails(index)
        }
        isLast={index === data.length - 1}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={seeAll ? data : data.slice(0, 3)}
        renderItem={renderItem}
        ListFooterComponent={!seeAll ? <ListFooter variant={variant} /> : null}
        ListHeaderComponent={
          <ListHeader
            seeAll={seeAll}
            totalAmount={totalAmount}
            variant={variant}
            quantity={data.length}
          />
        }
        style={styles.list}
      />
      {displayDivider && <Divider marginTop={24} marginBottom={12} />}
    </View>
  );
};

import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './ServiceItem';
import { Divider, Text } from '../index';
import { MY_ACCOUNTS_SCREEN } from 'navigation/ScreenNames';
import { TransactionsStackScreenProps } from 'navigation/types';
import { Budget, Calendar, Refreshing, UserArrowRight, Users } from 'assets/SVGs';
import { Service } from './ChooseService.types';
import { useStyles } from './ChooseService.styles';

const data = [
  {
    name: 'transfers.toOwnAccount',
    icon: <Refreshing />,
    screen: MY_ACCOUNTS_SCREEN,
  },
  {
    name: 'transfers.tera',
    icon: <Users />,
    screen: '',
  },
  {
    name: 'transfers.otherBanks',
    icon: <UserArrowRight />,
    screen: '',
  },
  {
    name: 'transfers.budget',
    icon: <Budget />,
    screen: '',
  },
  {
    name: 'transfers.automatic',
    icon: <Calendar />,
    screen: '',
  },
];

export const ChooseService = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'MyAccountsScreen'>>();

  const renderItem: ListRenderItem<Service> = ({ item }) => {
    const onPress = () => {
      item.screen && navigate(item.screen);
    };
    return <ServiceItem item={item} onPress={onPress} />;
  };

  return (
    <>
      <Text children="transfers.chooseService" style={styles.header} />
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cotentContainer}
      />
      <Divider marginTop={35} />
    </>
  );
};

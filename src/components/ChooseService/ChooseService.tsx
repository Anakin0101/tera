import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './ServiceItem';
import { Divider, Text } from '../index';
import { MY_ACCOUNTS_SCREEN } from 'navigation/ScreenNames';
import { TransactionsStackScreenProps } from 'navigation/types';
import { Budget, Calendar, Refreshing, UserArrowRight } from 'assets/SVGs';
import { Service } from './ChooseService.types';
import { useStyles } from './ChooseService.styles';
import { openModal } from 'utils/modal';
import { SaveTemplateModal } from 'components/modals/SaveTemplate/SaveTemplateModal';

interface ServiceData {
  serviceData?: any;
}
interface ParamTypes {
  transferParams?:
    | {
        conversion?: boolean;
        internal?: boolean;
        budget?: boolean;
        external?: boolean;
        fromOtherBank?: boolean;
        mobileTransaction?: boolean;
        receiver?: string;
      }
    | undefined;
}

interface FromTransaction {
  fromTransaction?: boolean;
}

const data = [
  {
    name: 'transfers.toOwnAccount',
    icon: <Refreshing />,
    screen: MY_ACCOUNTS_SCREEN,
    id: 1,
  },
  {
    name: 'transfers.otherBanks',
    icon: <UserArrowRight />,
    screen: MY_ACCOUNTS_SCREEN,
    id: 2,
  },
  {
    name: 'transfers.budget',
    icon: <Budget />,
    screen: MY_ACCOUNTS_SCREEN,
    id: 3,
  },
  {
    name: 'transfers.automatic',
    icon: <Calendar />,
    screen: '',
    id: 4,
  },
];

export const ChooseService = ({
  fromTransaction,
  serviceData,
  transferParams,
}: FromTransaction & ServiceData & ParamTypes) => {
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'MyAccountsScreen'>>();

  const renderItem: ListRenderItem<Service> = ({ item }) => {
    const onPress = () => {
      const params: Record<string, any> = {};

      switch (item.id) {
        case 2:
          params.otherBanks = true;
          break;
        case 3:
          params.budget = true;
          break;
        default:
          params.otherBanks = false;
          params.budget = false;
      }

      item.screen && navigate(item.screen, params);
    };
    const onTemplatePress = () => {
      openModal({
        element: <SaveTemplateModal />,
        title: 'products.changeName',
        titlePosition: 'center',
        disableDynamicSizing: true,
      });
    };

    return <ServiceItem item={item} onPress={transferParams ? onTemplatePress : onPress} />;
  };

  return (
    <>
      {!fromTransaction && <Text children="transfers.chooseService" style={styles.header} />}
      <FlatList
        horizontal
        data={serviceData ? serviceData : data}
        renderItem={renderItem}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cotentContainer}
      />
      <Divider marginTop={35} />
    </>
  );
};

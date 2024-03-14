import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceItem from './ServiceItem';
import { Divider, Text } from '../index';
import { MODAL_STACK, MONEY_TRANSFERS_SCREEN, MY_ACCOUNTS_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { Budget, Calendar, MoneyTransfers, Refreshing, UserArrowRight } from 'assets/SVGs';
import { AUTOMATIC_PAYMENTS_SCREEN } from 'navigation/ScreenNames';
import { ModalStackParamsList } from 'navigation/types';
import { Service } from './ChooseService.types';
import { useStyles } from './ChooseService.styles';
import { openModal } from 'utils/modal';
import { SaveTemplateModal } from 'components/modals/SaveTemplate/SaveTemplateModal';
import { TransfersTypeEnum } from './enums';

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

export type DataT = {
  name: string;
  icon: React.JSX.Element;
  screen: keyof ModalStackParamsList;
  id: number;
};

const data: DataT[] = [
  {
    name: 'transfers.toOwnAccount',
    icon: <Refreshing />,
    screen: MY_ACCOUNTS_SCREEN,
    id: TransfersTypeEnum.toOwnAccount,
  },
  {
    name: 'transfers.otherBanks',
    icon: <UserArrowRight />,
    screen: MY_ACCOUNTS_SCREEN,
    id: TransfersTypeEnum.otherBanks,
  },
  {
    name: 'transfers.budget',
    icon: <Budget />,
    screen: MY_ACCOUNTS_SCREEN,
    id: TransfersTypeEnum.budget,
  },
  {
    name: 'transfers.moneyTransfers',
    icon: <MoneyTransfers />,
    screen: MONEY_TRANSFERS_SCREEN,
    id: TransfersTypeEnum.moneyTransfers,
  },
  {
    name: 'transfers.automatic',
    icon: <Calendar />,
    id: TransfersTypeEnum.automatic,
    screen: AUTOMATIC_PAYMENTS_SCREEN,
  },
];

export const ChooseService = ({
  fromTransaction,
  serviceData,
  transferParams,
}: FromTransaction & ServiceData & ParamTypes) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const onPress = useCallback(
    (item: Service) => {
      const params: { otherBanks?: boolean; budget?: boolean } = {};

      switch (item.id) {
        case TransfersTypeEnum.otherBanks:
          params.otherBanks = true;
          break;
        case TransfersTypeEnum.budget:
          params.budget = true;
          break;
        default:
          break;
      }

      navigate(MODAL_STACK, {
        screen: item.screen,
        params,
      });
    },
    [navigate],
  );

  const onTemplatePress = useCallback(() => {
    openModal({
      element: <SaveTemplateModal />,
      title: 'products.changeName',
      titlePosition: 'center',
      disableDynamicSizing: true,
    });
  }, []);

  const itemOnPress = useCallback(
    (item: Service) => {
      if (transferParams) {
        onTemplatePress();
      } else {
        onPress(item);
      }
    },
    [onPress, onTemplatePress, transferParams],
  );

  const renderItem: ListRenderItem<Service> = ({ item }) => {
    return <ServiceItem item={item} onPress={() => itemOnPress(item)} />;
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

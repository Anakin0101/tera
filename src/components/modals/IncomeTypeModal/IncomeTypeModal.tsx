import React, { useCallback, FC, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Item } from './Item';
import { Button } from 'components';
import { IncomeTypeEnum } from 'screens/LoanRequestAdditionalInfo/LoanRequestAdditionalInfo.types';
import {
  FooterProps,
  IncomeTypeModalProps,
  ItemType,
  RenderItem,
  SelectedIncomeType,
} from './IncomeTypeModal.types';
import { useStyles } from './IncomeTypeModal.styles';
import i18next from 'i18next';

const INCOME_TYPES = [
  {
    name: i18next.t('loanRequest.salary'),
    type: IncomeTypeEnum.Salary,
  },
  {
    name: i18next.t('loanRequest.rent'),
    type: IncomeTypeEnum.Rent,
  },
  {
    name: i18next.t('loanRequest.remittance'),
    type: IncomeTypeEnum.Remittance,
  },
  {
    name: i18next.t('loanRequest.dividend'),
    type: IncomeTypeEnum.Dividend,
  },
  {
    name: i18next.t('loanRequest.incomeFromProfessionalWork'),
    type: IncomeTypeEnum.IncomeFromProfessionalWork,
  },
  {
    name: i18next.t('loanRequest.other'),
    type: IncomeTypeEnum.Other,
  },
];

const Footer: FC<FooterProps> = ({ handleSelectPress }) => {
  const styles = useStyles();

  return (
    <View style={styles.buttonContainer}>
      <Button.Primary
        fullWidth
        text="common.select"
        onPress={handleSelectPress}
        customWrapperStyle={styles.button}
      />
    </View>
  );
};

export const IncomeTypeModal: FC<IncomeTypeModalProps> = ({ onPress, selectedTypes }) => {
  const styles = useStyles();
  const [selectedIncomeTypes, setSelectedIncomeTypes] = useState<SelectedIncomeType>(selectedTypes);

  const handleSelectPress = useCallback(() => {
    onPress(selectedIncomeTypes);
  }, [onPress, selectedIncomeTypes]);

  const renderItem: RenderItem = useCallback(
    ({ item }) => (
      <Item
        item={item}
        selectedIncomeTypes={selectedIncomeTypes}
        setSelectedIncomeTypes={setSelectedIncomeTypes}
      />
    ),
    [selectedIncomeTypes],
  );

  const keyExtractor = useCallback((item: ItemType) => String(item.type), []);

  return (
    <FlatList
      bounces={false}
      data={INCOME_TYPES}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListFooterComponent={<Footer handleSelectPress={handleSelectPress} />}
    />
  );
};

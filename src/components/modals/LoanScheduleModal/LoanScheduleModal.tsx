import React, { FC } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { Note } from 'assets/SVGs';
import { useLoanSchedules } from './container';
import { ScheduleItem } from './ScheduleItem';
import { useStyles } from './LoanScheduleModal.styles';
import { LoanHistory, LoanSchedule } from 'services/apis/productsAPI/productsAPI.types';
import { HeaderProps, LoanScheduleProps } from './LoanScheduleModal.types';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';

const Header: FC<HeaderProps> = ({ showHistory, total = 0 }) => {
  const styles = useStyles();

  return (
    <>
      <Text
        children={showHistory ? 'loanSchedule.totalPaid' : 'loanSchedule.totalPayable'}
        color={Colors.textBlack500}
        marginTop={24}
      />
      <View style={styles.total}>
        <Text children={formatMoney(total)} size={30} lineHeight={36} marginTop={5} />
        <Pressable style={styles.pdf}>
          <Note />
          <Text children="PDF" special />
        </Pressable>
      </View>
      <Divider marginTop={24} height={1} width={'100%'} />
    </>
  );
};

export const LoanScheduleModal: FC<LoanScheduleProps> = ({ creditId, showHistory }) => {
  const styles = useStyles();
  const { data, total } = useLoanSchedules(creditId, showHistory);

  const renderItem: ListRenderItem<LoanSchedule | LoanHistory> = ({ item }) => {
    return <ScheduleItem item={item} />;
  };

  if (!data?.length) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={<Header total={total} showHistory={showHistory} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

import React, { FC, useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Divider, LoadingInView, Text } from 'components';
import { useLoanSchedules } from './container';
import { ScheduleItem } from './ScheduleItem';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { Note } from 'assets/SVGs';
import { HeaderProps, LoanScheduleProps, RenderItem } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';
import { getCurrencyIcon } from 'utils/currency';

const Header: FC<HeaderProps> = ({ showHistory, downloadPdf, total = 0, currency }) => {
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
        <View style={styles.amountView}>
          <Text
            style={styles.amount}
            children={formatMoney(total)}
            size={30}
            lineHeight={36}
            marginTop={5}
          />
          <Text size={30} lineHeight={36} marginTop={5}>
            {getCurrencyIcon(currency)}
          </Text>
        </View>
        <Pressable style={styles.pdf} onPress={downloadPdf}>
          <Note />
          <Text children="PDF" special />
        </Pressable>
      </View>
      <Divider marginTop={24} height={1} width={'100%'} />
    </>
  );
};

export const LoanScheduleModal: FC<LoanScheduleProps> = ({ creditId, showHistory, currency }) => {
  const styles = useStyles();
  const { data, total, downloadLoanSchedules } = useLoanSchedules(creditId, showHistory);

  const renderItem: RenderItem = useCallback(({ item }) => {
    return <ScheduleItem item={item} />;
  }, []);

  if (!data?.length) {
    return (
      <View style={styles.loader}>
        <LoadingInView />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          <Header
            total={total}
            showHistory={showHistory}
            downloadPdf={downloadLoanSchedules}
            currency={currency}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

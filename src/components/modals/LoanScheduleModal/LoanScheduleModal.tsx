import React, { FC, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, LoadingInView, Text } from 'components';
import { useLoanSchedules } from './container';
import { ScheduleItem } from './ScheduleItem';
import { Note } from 'assets/SVGs';
import { HeaderProps, LoanScheduleProps, RenderItem } from './LoanScheduleModal.types';
import { useStyles } from './LoanScheduleModal.styles';

const Header: FC<HeaderProps> = ({ downloadPdf }) => {
  const styles = useStyles();

  return (
    <View>
      <Pressable style={styles.pdf} onPress={downloadPdf}>
        <Note />
        <Text children="PDF" special />
      </Pressable>
      <Divider marginTop={24} height={1} width={'100%'} />
    </View>
  );
};

export const LoanScheduleModal: FC<LoanScheduleProps> = ({ creditId, showHistory, currency }) => {
  const styles = useStyles();
  const { data, downloadLoanSchedules, currentId } = useLoanSchedules(creditId, showHistory);

  const renderItem: RenderItem = useCallback(
    ({ item }) => <ScheduleItem item={item} currency={currency} currentId={currentId} />,
    [currency, currentId],
  );

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
        ListHeaderComponent={<Header downloadPdf={downloadLoanSchedules} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

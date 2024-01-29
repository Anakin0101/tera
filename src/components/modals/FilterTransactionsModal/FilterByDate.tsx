import React, { FC, useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from 'components';
import { Buttons } from './Buttons';
import { Colors } from 'theme/Variables';
import { formatDate } from 'utils/formatDate';
import { Calendar } from 'components/Calendar/Calendar';
import { TransactionByAccModalProps } from './FilterTransactionsModal.types';
import { useStyles } from './FilterTransactionsModal.styles';
import { closeModal } from 'utils/modal';
import dayjs from 'dayjs';
import { YYYY_MM_DD } from 'constants/DateTemplates';
import i18next from 'i18next';

const templates = [
  {
    id: 1,
    title: i18next.t('filters.lastThreeDays'),
  },
  {
    id: 2,
    title: i18next.t('filters.lastWeek'),
  },
  {
    id: 3,
    title: i18next.t('filters.lastThreeWeeks'),
  },
];

const currentDate = dayjs().format(YYYY_MM_DD);

const getStartDateByTemplateId = (id: number) => {
  switch (id) {
    case 1:
      return dayjs().subtract(2, 'day').format(YYYY_MM_DD);
    case 2:
      return dayjs().subtract(1, 'week').format(YYYY_MM_DD);
    case 3:
      return dayjs().subtract(3, 'week').format(YYYY_MM_DD);
    default:
      return currentDate;
  }
};

export const FilterByDate: FC<TransactionByAccModalProps> = ({ setFilters }) => {
  const styles = useStyles();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  const selectDate = (variant: string) => {
    if (showCalendar && type !== variant) {
      return;
    }
    setShowCalendar(prev => !prev);
    setType(variant);
  };

  const onDayPress = useCallback(
    (dateString: string) => {
      setSelectedTemplateId(null);
      if (type === 'start') {
        setStartDate(dateString);
      } else {
        setEndDate(dateString);
      }
      setShowCalendar(false);
      setType('');
    },
    [type],
  );

  const onTemplatePress = (id: number) => {
    if (startDate) {
      setStartDate('');
    }
    if (endDate) {
      setEndDate('');
    }
    setSelectedTemplateId(id);
  };

  const onClearPress = () => {
    setStartDate('');
    setEndDate('');
    setSelectedTemplateId(null);
  };

  const onSelectPress = () => {
    if (startDate && endDate) {
      setFilters(prev => ({
        ...prev,
        startDate,
        endDate,
      }));
      closeModal();
    }

    if (selectedTemplateId) {
      setFilters(prev => ({
        ...prev,
        startDate: getStartDateByTemplateId(selectedTemplateId),
        endDate: currentDate,
      }));
      closeModal();
    }
  };

  return (
    <View style={styles.filterByDateWrapper}>
      <View style={styles.dateContainer}>
        <View style={styles.date}>
          <Text children="common.from" label color={Colors.textBlack400} />
          <Pressable onPress={() => selectDate('start')}>
            <Text
              children={startDate ? formatDate(startDate, ' YYYY') : 'transactions.selectDate'}
            />
          </Pressable>
        </View>
        <View style={styles.date}>
          <Text children="common.to" label color={Colors.textBlack400} />
          <Pressable onPress={() => selectDate('end')}>
            <Text children={endDate ? formatDate(endDate, ' YYYY') : 'transactions.selectDate'} />
          </Pressable>
        </View>
      </View>
      {showCalendar && (
        <Calendar
          minDate={type === 'end' ? startDate : undefined}
          maxDate={endDate || currentDate}
          onDayPress={onDayPress}
        />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.intervalScrollView}
        contentContainerStyle={styles.intervalContent}
      >
        {templates.map(template => (
          <Pressable
            key={template.id}
            onPress={() => onTemplatePress(template.id)}
            style={[styles.type, selectedTemplateId === template.id && styles.selectedItem]}
          >
            <Text children={template.title} special={selectedTemplateId === template.id} />
          </Pressable>
        ))}
      </ScrollView>
      <Buttons onClearPress={onClearPress} onSelectPress={onSelectPress} />
    </View>
  );
};

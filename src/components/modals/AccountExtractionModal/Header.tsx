import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import dayjs from 'dayjs';
import { Calendar, Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatDate } from 'utils/formatDate';
import { SPACED_YEAR, YYYY_MM_DD } from 'constants/DateTemplates';
import {
  CalendarType,
  HeaderProps,
  Template,
  TemplateRenderItem,
} from './AccountExtractionModal.types';
import { useStyles } from './AccountExtractionModal.styles';

const templates: Template[] = [
  {
    id: 1,
    title: 'products.month',
    value: 3,
  },
  {
    id: 2,
    title: 'products.month',
    value: 6,
  },
  {
    id: 3,
    title: 'products.year',
    value: 1,
  },
];

const CURRENT_DATE = dayjs().format(YYYY_MM_DD);

export const Header: FC<HeaderProps> = memo(
  ({ setStartDate, setEndDate, startDate, endDate, selectedTemplateId, setSelectedTemplateId }) => {
    const styles = useStyles();
    const [showCalendar, setShowCalendar] = useState(false);
    const [type, setType] = useState<CalendarType | null>(null);

    const selectDate = useCallback(
      (variant: CalendarType) => {
        if (showCalendar && type !== variant) {
          return;
        }
        setShowCalendar(prev => !prev);
        setType(variant);
      },
      [showCalendar, type],
    );

    const onDayPress = useCallback(
      (dateString: string) => {
        setSelectedTemplateId(null);
        if (type === CalendarType.StartDate) {
          setStartDate(dateString);
        } else {
          setEndDate(dateString);
        }

        setTimeout(() => {
          setShowCalendar(false);
          setType(null);
        }, 1000);
      },
      [setEndDate, setSelectedTemplateId, setStartDate, type],
    );

    const markedDates = useMemo(() => {
      if (type === CalendarType.StartDate) {
        return {
          [startDate]: {
            selected: true,
            selectedColor: Colors.primary,
          },
        };
      }

      if (type === CalendarType.EndDate) {
        return {
          [endDate]: {
            selected: true,
            selectedColor: Colors.primary,
          },
        };
      }
    }, [endDate, startDate, type]);

    const onTemplatePress = useCallback(
      (id: number) => {
        if (startDate) {
          setStartDate('');
        }
        if (endDate) {
          setEndDate('');
        }
        setSelectedTemplateId(id);
      },
      [endDate, setEndDate, setSelectedTemplateId, setStartDate, startDate],
    );

    const renderItem: TemplateRenderItem = useCallback(
      ({ item }) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => onTemplatePress(item.id)}
            style={[styles.template, selectedTemplateId === item.id && styles.selected]}
          >
            <Text
              children={item.title}
              translateProp={{ value: item.value }}
              special={selectedTemplateId === item.id}
            />
          </Pressable>
        );
      },
      [onTemplatePress, selectedTemplateId, styles.selected, styles.template],
    );

    return (
      <View>
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Text children="common.from" label color={Colors.textBlack400} />
            <Pressable onPress={() => selectDate(CalendarType.StartDate)}>
              <Text
                children={
                  startDate ? formatDate(startDate, SPACED_YEAR) : 'transactions.selectDate'
                }
              />
            </Pressable>
          </View>
          <View style={styles.date}>
            <Text children="common.to" label color={Colors.textBlack400} />
            <Pressable onPress={() => selectDate(CalendarType.EndDate)}>
              <Text
                children={endDate ? formatDate(endDate, SPACED_YEAR) : 'transactions.selectDate'}
              />
            </Pressable>
          </View>
        </View>
        {showCalendar && (
          <Calendar
            minDate={type === CalendarType.EndDate ? startDate : undefined}
            maxDate={endDate || CURRENT_DATE}
            onDayPress={onDayPress}
            markedDates={markedDates}
            hideExtraDays
          />
        )}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={templates}
          renderItem={renderItem}
          style={styles.flatlist}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  },
);

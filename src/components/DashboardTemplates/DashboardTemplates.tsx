import React from 'react';
import { FlatList, View } from 'react-native';
import { TemplateCard, Text } from 'components';
import { useStyles } from './DashboardTemplates.styles';
import { getDashboardTemplates } from './utils/DashboardTemplatesMapper.utils';
import useTheme from 'hooks/useTheme';
import { Divider } from 'components';

export const DashboardTemplates = ({ data }: any) => {
  const styles = useStyles();
  const dashboardTemplates = getDashboardTemplates(data?.templates);
  const { Colors } = useTheme();

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.dashboardTemplatesContainer}>
          <View style={styles.headerContainer}>
            <Text
              children={'dashboard.templates'}
              style={styles.titleContainer}
              color={Colors.textBlack}
            />
          </View>
          <View style={styles.dashboardTemplatesWrapper}>
            <FlatList
              style={styles.dashboardTemplatesContent}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dashboardTemplates}
              renderItem={({ item }) => {
                return <TemplateCard {...item} />;
              }}
              keyExtractor={item => String(item.id)}
            />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

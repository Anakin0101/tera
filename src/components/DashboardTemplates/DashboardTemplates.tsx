import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { TemplateCard, Text } from 'components';
import { useStyles } from './DashboardTemplates.styles';
import { getDashboardTemplates } from './utils/DashboardTemplatesMapper.utils';
import useTheme from 'hooks/useTheme';
import { Divider } from 'components';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { ALL_TEMPLATES_SCREEN } from 'navigation/ScreenNames';

export const DashboardTemplates = ({ data }: any) => {
  const styles = useStyles();
  const dashboardTemplates = getDashboardTemplates(data?.templates);
  const { Colors } = useTheme();
  const { navigate } = useNavigation<MainStackScreenProps<'AllTemplatesScreen'>>();

  const handleNavigateToTemplates = () => {
    navigate(ALL_TEMPLATES_SCREEN);
  };

  return (
    <>
      {data?.templates ? (
        <>
          <View style={styles.wrapper}>
            <View style={styles.dashboardTemplatesContainer}>
              <View style={styles.headerContainer}>
                <Text
                  children={'dashboard.templates'}
                  style={styles.titleContainer}
                  color={Colors.textBlack}
                />
                <TouchableOpacity onPress={handleNavigateToTemplates}>
                  <Text
                    children={'dashboard.all'}
                    style={styles.titleContainer}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
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
      ) : null}
    </>
  );
};

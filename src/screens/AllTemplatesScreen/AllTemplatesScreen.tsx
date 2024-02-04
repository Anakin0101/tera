import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { useAllTemplates } from './container';
import { useStyles } from './AllTemplatesScreen.styles';
import { TemplatesSection } from './TemplatesSection';
import { SearchComponent } from 'components/index';
import { getDashboardTemplates } from 'components/DashboardTemplates/utils/DashboardTemplatesMapper.utils';
import { useTranslation } from 'react-i18next';

export const AllTemplatesScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { templates, search, onChangeText, templateDeleteBtn, templateAddBtn } = useAllTemplates();
  const dashboardTemplates = useMemo(() => {
    return getDashboardTemplates(templates || []);
  }, [templates]);

  return (
    <View style={styles.listWrapper}>
      <View style={styles.headerContainer}>
        <SearchComponent
          placeholder={t('transactions.searchTemplate')}
          value={search}
          onChangeText={onChangeText}
        />
      </View>
      <FlatList
        data={dashboardTemplates}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TemplatesSection
            templates={item}
            index={index}
            templateDeleteBtn={templateDeleteBtn}
            templateAddBtn={templateAddBtn}
          />
        )}
      />
    </View>
  );
};

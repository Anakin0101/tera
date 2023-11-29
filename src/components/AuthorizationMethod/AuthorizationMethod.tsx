import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { useStyles } from './AuthorizationMethod.styles';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';

type AuthorizationMethodBase = {
  children: ReactElement;
  icon?: (props: SvgProps) => React.JSX.Element;
  title: string;
  desc: string;
};

export const AuthorizationMethod = (props: AuthorizationMethodBase) => {
  const { children, icon, title, desc } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.AuthorizationMethodContainer}>
      <View style={styles.AuthorizationMethodLeftContainer}>
        <View style={styles.iconContainer}>
          <IconComponent IconJSX={icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.AuthorizationMethodTitleStyle}>{t(title)}</Text>
          <Text style={styles.AuthorizationMethodDescStyle}>{t(desc)}</Text>
        </View>
      </View>
      <View style={styles.AuthorizationMethodEnablerContainer}>{children}</View>
    </View>
  );
};

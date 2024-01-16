import React from 'react';
import { Text } from 'components/index';
import { useStyles } from './RegistrationTitle.styles';

export const RegistrationTitle = ({ text }: { text: string }) => {
  const styles = useStyles();
  return <Text children={text} size={24} style={styles.title} />;
};

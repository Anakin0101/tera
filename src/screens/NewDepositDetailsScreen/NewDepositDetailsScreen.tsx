import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useNewDepositDetails } from './container';
import { Button, Divider, Image, LoadingView, Text } from 'components';
import { useStyles } from './NewDepositDetailsScreen.styles';
import i18next from 'i18next';

const benefits = [i18next.t('newDeposit.saveFreeMoney'), i18next.t('newDeposit.getMoreInterest')];

export const NewDepositDetailsScreen = () => {
  const styles = useStyles();
  const { handlePress, imageUrl, offer } = useNewDepositDetails();

  const getBenefits = useCallback(() => {
    return benefits.map(item => (
      <View style={styles.benefitItem} key={item}>
        <View style={styles.point} />
        <Text children={item} style={styles.flexOne} secondary />
      </View>
    ));
  }, [styles.benefitItem, styles.flexOne, styles.point]);

  if (!offer) {
    return <LoadingView />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text children={offer?.title} medium size={18} marginTop={24} />
      </View>
      <Divider height={1} marginTop={32} marginBottom={32} />
      <View style={styles.description}>
        <Text children="products.details" medium size={16} />
        <Text children={offer?.description} secondary marginTop={16} />
        <Text children="newDeposit.specialOffer" secondary marginTop={16} />
        <View style={styles.benefitsContainer}>{getBenefits()}</View>
      </View>
      <Button.Primary
        fullWidth
        text="common.next"
        onPress={handlePress}
        customWrapperStyle={styles.button}
      />
    </ScrollView>
  );
};

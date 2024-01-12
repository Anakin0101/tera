import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useNewDepositDetails } from './container';
import { Button, Divider, Text } from 'components';
import { useStyles } from './NewDepositDetailsScreen.styles';
import { Loader } from 'components/Loader/Loader';
import i18next from 'i18next';

const benefits = [i18next.t('newDeposit.saveFreeMoney'), i18next.t('newDeposit.getMoreInterest')];

export const NewDepositDetailsScreen = () => {
  const styles = useStyles();
  const { handlePress, imageUrl, offer } = useNewDepositDetails();

  if (!offer) {
    return <Loader />;
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
        {/* <Text children="საწყისი თანხა 500 ერთეული" secondary /> */}
      </View>
      <Divider height={1} marginTop={32} marginBottom={32} />
      <View style={styles.description}>
        <Text children="products.details" medium size={16} />
        <Text children={offer?.description} secondary marginTop={16} />
        <Text children="newDeposit.specialOffer" secondary marginTop={16} />
        <View style={styles.benefitsContainer}>
          {benefits.map(item => (
            <View style={styles.benefitItem} key={item}>
              <View style={styles.point} />
              <Text children={item} style={styles.flexOne} secondary />
            </View>
          ))}
        </View>
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

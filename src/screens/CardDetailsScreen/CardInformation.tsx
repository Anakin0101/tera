import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { DetailsItem, Divider, Text } from 'components';
import { ChevronRight, Edit } from 'assets/SVGs';
import { CardInformationProps } from './CardDetailsScreen.types';
import { useStyles } from './CardDetailsScreen.styles';

export const CardInformation: FC<CardInformationProps> = memo(
  ({ name, cardHolder, insurance, blockedAmounts }) => {
    const styles = useStyles();

    return (
      <View>
        <View style={styles.cardInfoContainer}>
          <Text children="products.information" size={18} demiBold />
          <DetailsItem
            label="products.informationName"
            value={name}
            icon={<Edit />}
            onPress={() => {}}
          />
          <DetailsItem label="products.informationCardOwner" value={cardHolder} />
          {insurance ? <DetailsItem label="products.insurance" value={insurance} /> : null}
          {blockedAmounts?.length ? (
            <DetailsItem
              label="products.blockedFunds"
              value={blockedAmounts}
              icon={<ChevronRight />}
              onPress={() => {}}
            />
          ) : null}
        </View>
        <Divider />
      </View>
    );
  },
);

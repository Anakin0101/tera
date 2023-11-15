import React, { useLayoutEffect, useRef, useState } from 'react';
import { SectionList, View, TouchableOpacity, Text, SectionListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './MyAccountScrollableScreen.styles';
import Cards from '../AccountDetailsScreen/Cards';
import { Details } from '../AccountDetailsScreen/Details';
import { Divider, LastTransactions } from 'components';
import { CardPayment, Swap } from 'assets/SVGs';
import { FixedButton } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';

export const MyAccountsScrollableScreen = () => {
  const { params } = useRoute<ProductsStackRouteProps<'MyAccountScrollableScreen'>>();
  const styles = useStyles();
  const sectionListRef = useRef<SectionList>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(0);
  const { cards, lastTransactions } = useAppSelector(state => state.products);
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === params.iban),
  );
  if (!account) {
    return null;
  }
  const sections = [
    { title: 'cards', data: [{}], name: 'ბარათები' },
    { title: 'details', data: [{}], name: 'დეტალები' },
    { title: 'transactions', data: [{}], name: 'ტრანზაქციები' },
  ];

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'cards':
        return <Cards cards={cards} iban={params.iban} />;
      case 'details':
        return (
          <Details
            name={account?.accountName}
            iban={account?.iban}
            displayDivider={!!lastTransactions?.length}
          />
        );
      case 'transactions':
        return (
          <View style={{}}>
            <LastTransactions
              data={lastTransactions}
              sectionTitle="products.lastTransactions"
              style={styles.transactionsContainer}
              headerLabelStyle={styles.headerLabelStyle}
              headerContaienrStyle={styles.backgroundWhite}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const { setOptions } = useNavigation<ProductsStackScreenProps<'MyAccountScrollableScreen'>>();

  useLayoutEffect(() => {
    setOptions({
      title: 'navigation.more',
    });
  }, [setOptions]);

  const handlePress = (index: number) => {
    if (sectionListRef.current) {
      setPressedIndex(index);
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: index,
        viewOffset: index > 2 ? 600 : 60,
        animated: true,
        viewPosition: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={pressedIndex === index ? styles.navButton : styles.navButtonHidden}
          >
            <Text style={pressedIndex === index ? styles.pressedItem : styles.item}>
              {section.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        renderItem={renderItem}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      <View style={styles.fixedButton}>
        <FixedButton icon={<Swap />} label="products.pay" />
        <Divider height={40} width={1} />
        <FixedButton icon={<CardPayment />} label="products.transfer" />
      </View>
    </View>
  );
};

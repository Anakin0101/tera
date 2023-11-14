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

export const MyAccountsScrollableScreen = () => {
  const styles = useStyles();
  const sectionListRef = useRef<SectionList>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(0);

  const sections = [
    { title: 'cards', data: [{}], name: 'ბარათები' },
    { title: 'details', data: [{}], name: 'დეტალები' },
    { title: 'transactions', data: [{}], name: 'ტრანზაქციები' },
  ];

  const lastTransactions = [
    {
      title: 'რონის პიცა',
      value: 'კვება',
      amount: 320.5,
      date: '20 სექ, 2021, 12:20',
    },
    {
      title: 'მანქანის დაზღვევა',
      value: 'ფინანსები',
      amount: 410,
      date: '20 სექ, 2021, 12:20',
    },
    {
      title: 'პირადი გადარიცხვა',
      value: 'პირადი გადარიცხვა',
      amount: 250,
      date: '20 სექ, 2021, 12:20',
    },
    {
      title: 'პირადი გადარიცხვა',
      value: 'პირადი გადარიცხვა',
      amount: 25.7,
      date: '20 სექ, 2021, 12:20',
    },
  ];

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'cards':
        return <Cards />;
      case 'details':
        return <Details />;
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

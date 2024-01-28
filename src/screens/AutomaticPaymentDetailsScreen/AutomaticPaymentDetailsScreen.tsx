import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useStyles } from './AutomaticPaymentDetailsScreen.styles';
import { DetailsItem, Divider, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { More } from 'assets/SVGs';

const Header = () => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <View style={styles.itemIconContainer} />
      <View style={styles.info}>
        <Text children="დენი" secondary />
        <Text children={formatMoney(120, 'GEL')} size={16} />
      </View>
      <Pressable style={styles.actionIconContainer}>
        <More />
      </Pressable>
    </View>
  );
};

export const AutomaticPaymentDetailsScreen = () => {
  const styles = useStyles();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={[styles.main, styles.borderRadius]}>
        <Text children="გადახდის გრაფიკი" medium size={18} letterSpacing={-0.5} />
        <DetailsItem label="გადახდის პერიოდულობა" value="ყოველთვიური" valueStyle={styles.text} />
        <DetailsItem label="გადახდის რიცხვი" value="2" valueStyle={styles.text} />
        <DetailsItem label="პირველ გადახდის თარიღი" value="2/03/2022" valueStyle={styles.text} />
        <DetailsItem label="ბოლო გადახდის თარიღი" value="2/10/2022" valueStyle={styles.text} />
      </View>
      <Divider />
      <View style={styles.main}>
        <Text children="გადახდის დეტალები" medium size={18} letterSpacing={-0.5} />
        <DetailsItem label="აბონენტის ნომერი" value="12345" valueStyle={styles.text} />
        <DetailsItem label="სახელი" value="დაუთაშვილი გივი" valueStyle={styles.text} />
        <DetailsItem label="მისამართი" value="გარეჯელის ქ.24" valueStyle={styles.text} />
        <DetailsItem label="ბოლო დარიცხვის თარიღი" value="01/30/2022" valueStyle={styles.text} />
        <DetailsItem
          label="დავალიანება"
          value={formatMoney(230, 'GEL')}
          valueStyle={[styles.text, styles.debt]}
        />
        <DetailsItem
          label="თანხის რაოდენობა"
          value={formatMoney(230, 'GEL')}
          valueStyle={styles.text}
        />
        <DetailsItem label="საიდან" value="ჩემი ანგარიში" valueStyle={styles.text} />
      </View>
    </ScrollView>
  );
};

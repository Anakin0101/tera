import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useStyleTheme } from './DashboardScreen.style';
import { Divider } from 'components';
import Images from 'theme/Images';

const templates = ['ჯეოსელი', 'გადარიცხვა', 'კომუნალურები', 'ინტერნეტი', 'ანაბარი'];
const payments = [
  {
    id: 1,
    icon: Images().BasisBankLogoIcon,
    title: 'სესხის გადასახადი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 2,
    icon: Images().BasisBankLogoIcon,
    title: 'ჯეოსელი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 3,
    icon: Images().BasisBankLogoIcon,
    title: 'მაგთი',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 4,
    icon: Images().BasisBankLogoIcon,
    title: 'კაზინო',
    amount: '130.00ლ',
    date: 'დღეს',
  },
  {
    id: 5,
    icon: Images().BasisBankLogoIcon,
    title: 'შავი დღისთვინა',
    amount: '130.00ლ',
    date: 'დღეს',
  },
];
const assets = ['ანაბრები', 'სესხები'];
const offers = [
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
  'აიღე 18 000 ლარამდე დამტკიცებული სესხი',
];

const transactions = [
  'ტრანზაქცია 1',
  'ტრანზაქცია 2',
  'ტრანზაქცია 3',
  'ტრანზაქცია 4',
  'ტრანზაქცია 5',
];
const pensions = 6023.23;

export const tempData = {
  templates,
  payments,
  assets,
  offers,
  transactions,
  pensions,
};

export const Templates = ({ data }: { data: string[] }) => {
  const styles = useStyleTheme();

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={[styles.item, { borderWidth: 1, borderRadius: 10 }]}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          paddingLeft: 24,
          paddingVertical: 32,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: 'white',
        }}
      >
        <Text>შაბლონები</Text>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            marginTop: 12,
            paddingRight: 10,
          }}
        />
      </View>
      <Divider />
    </>
  );
};

export const Payments = ({ data }: { data: string[] }) => {
  const styles = useStyleTheme();

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View
        style={[
          styles.item,
          {
            height: 130,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            paddingHorizontal: 16,
          },
        ]}
      >
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: '#fff', paddingLeft: 24, paddingVertical: 32 }}>
        <Text>მოახლოებული გადახდები</Text>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            marginTop: 12,
            paddingRight: 10,
          }}
        />
      </View>
      <Divider />
    </>
  );
};

export const Assets = ({ data }: { data: string[] }) => {
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={[{ flexDirection: 'row', marginTop: 20 }]}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'lightgrey',
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            borderBottomWidth: index < data.length - 1 ? 1 : 0,
            borderBottomColor: 'lightgrey',
          }}
        >
          <Text>{item}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 32 }}>
        <Text>აქტივები და ვალდებულებები</Text>
        <FlatList data={data} renderItem={renderItem} />
      </View>
      <Divider />
    </>
  );
};

export const Offers = ({ data }: { data: string[] }) => {
  const styles = useStyleTheme();
  const itemColors = [
    'rgba(67, 182, 75, 0.1)',
    'rgba(160, 34, 109, 0.1)',
    'rgba(67, 182, 75, 0.1)',
    '#FF33FF',
    '#33FFFF',
  ];

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const backgroundColor = itemColors[index % itemColors.length];
    return (
      <View
        style={[
          styles.item,
          {
            height: 180,
            backgroundColor: backgroundColor,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            paddingHorizontal: 16,
            width: 300,
          },
        ]}
      >
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: '#fff', paddingLeft: 24, paddingVertical: 32 }}>
        <Text>შეთავაზებები</Text>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            marginTop: 12,
            paddingRight: 10,
          }}
        />
      </View>
      <Divider />
    </>
  );
};

export const Pension = () => {
  return (
    <>
      <View style={{ backgroundColor: '#fff', paddingLeft: 24, paddingVertical: 32 }}>
        <Text>საპენსიო ფონდი</Text>
        <View style={[{ flexDirection: 'row', marginTop: 20 }]}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'lightgrey',
            }}
          />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <Text children="დანაზოგი" />
            <Text children="$1000" />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

export const Banker = () => {
  return (
    <>
      <View style={{ backgroundColor: '#fff', paddingLeft: 24, paddingVertical: 32 }}>
        <Text>ჩემი ბანკირი</Text>
        <View style={[{ flexDirection: 'row', marginTop: 20 }]}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'lightgrey',
            }}
          />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <Text children="ბანკირი" />
            <Text children="მთავარი ფილიალი" />
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

export const Transactions = ({ data }: { data: string[] }) => {
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={[{ flex: 1, flexDirection: 'row', marginTop: 20 }]}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'lightgrey',
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            borderBottomWidth: index < data.length - 1 ? 1 : 0,
            borderBottomColor: 'lightgrey',
          }}
        >
          <Text>{item}</Text>
        </View>
      </View>
    );
  };

  const footer = () => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 20,
          marginTop: 20,
          padding: 5,
          alignItems: 'center',
          borderColor: 'lightgrey',
        }}
      >
        <Text children="ყველა" style={{ color: '#922a69', fontWeight: '600' }} />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 32 }}>
        <Text>ბოლო ტრანზაქციები</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={{ marginTop: 10, paddingBottom: 30 }}
          ListFooterComponent={footer}
        />
      </View>
    </View>
  );
};

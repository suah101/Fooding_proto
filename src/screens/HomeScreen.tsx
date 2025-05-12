import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }: any) {
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const [userName] = useState('수아'); // 하드코딩된 이름
  const dummyExpiringFoods = [
    { id: '1', name: '우유', expirationDate: '2025-05-10' },
    { id: '2', name: '계란', expirationDate: '2025-05-11' },
  ];

  const formatDday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return '오늘 만료';
    if (diff === 1) return '내일 만료';
    return `${diff}일 남음`;
  };

  return (
    <View style={[styles.wrapper, { paddingTop: topPadding }]}>
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>👋  안녕하세요, {userName}님!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          <Icon name="person-circle-outline" size={30} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ 임박한 식재료</Text>

          {dummyExpiringFoods.length === 0 ? (
            <Text>⛱️ 임박한 식재료가 없어요!</Text>
          ) : (
            <View style={styles.foodList}>
              {dummyExpiringFoods.map((item) => (
                <View key={item.id} style={styles.foodCard}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodExpiry}>{formatDday(item.expirationDate)}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fridge')}>
            <Text style={styles.buttonText}>전체 보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6F4FA',
  },
  container: {
    padding: 20,
    backgroundColor: '#E6F4FA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#E6F4FA',
  },
  greeting: {
    fontSize: 19,
    fontWeight: '500',
    color: '#2C3E50',
  },
  section: {
    marginVertical: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2F2F2F',
  },
  foodList: {
    gap: 10,
    marginTop: 10,
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaadb3',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  foodExpiry: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  button: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#4DA8DA',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

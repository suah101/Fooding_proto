import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
  quantityValue?: number;
  quantityUnit?: string;
}

export default function FridgeScreen() {
  const navigation = useNavigation<any>();
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const [searchQuery, setSearchQuery] = useState('');

  const dummyFoods: FoodItem[] = [
    {
      id: '1',
      name: '우유',
      category: '유제품',
      expirationDate: '2025-05-12',
      quantityValue: 1,
      quantityUnit: '팩',
    },
    {
      id: '2',
      name: '계란',
      category: '육류',
      expirationDate: '2025-05-10',
      quantityValue: 10,
      quantityUnit: '개',
    },
  ];

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.expiration}>유통기한: {item.expirationDate}</Text>
      <Text style={styles.category}>카테고리: {item.category}</Text>
      <Text style={styles.quantityText}>
        수량: {item.quantityValue} {item.quantityUnit}
      </Text>
      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View style={styles.header}>
        <Text style={styles.title}>📦 내 냉장고</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddFood')}>
          <Text style={styles.addButton}>+ 식품 등록</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="식품명 또는 카테고리로 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: 5 }}
        onPress={() => navigation.navigate('FridgeMapping')}
      >
        <Text style={{ color: '#4DA8DA', fontWeight: 'bold' }}>냉장고 구조 관리 →</Text>
      </TouchableOpacity>

      <FlatList
        data={dummyFoods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FA',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  addButton: {
    fontSize: 16,
    color: '#4DA8DA',
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2F2F',
  },
  expiration: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
  category: {
    fontSize: 13,
    color: '#888',
  },
  quantityText: {
    fontSize: 14,
    color: '#2C3E50',
    marginTop: 6,
    fontWeight: '400',
  },
  deleteBtn: {
    marginTop: 8,
    backgroundColor: '#4DA8DA',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

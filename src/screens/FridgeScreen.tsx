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
import { useNavigation } from '@react-navigation/native';

// 🔹 더미 데이터
const dummyFridgeItems = [
  { id: '1', name: '양상추', category: '채소', location: '야채칸' },
  { id: '2', name: '오이', category: '채소', location: '야채칸' },
  { id: '3', name: '사과', category: '과일', location: '과일칸' },
  { id: '4', name: '바나나', category: '과일', location: '과일칸' },
  { id: '5', name: '김치', category: '반찬', location: '문쪽칸' },
];

export default function FridgeScreen() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // 🔸 위치별로 그룹화
  const groupedFoods: Record<string, typeof dummyFridgeItems> = {};
  dummyFridgeItems.forEach((item) => {
    const loc = item.location || '미지정';
    if (!groupedFoods[loc]) groupedFoods[loc] = [];
    groupedFoods[loc].push(item);
  });

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  return (
    <ScrollView style={[styles.container, { paddingTop: topPadding }]}>
      <Text style={styles.title}>🧊 냉장고 위치별 보기</Text>

      {Object.entries(groupedFoods).map(([location, items]) => (
        <TouchableOpacity
          key={location}
          onPress={() => setSelectedLocation(location)}
          style={styles.card}
        >
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.count}>총 {items.length}개</Text>
        </TouchableOpacity>
      ))}

      {selectedLocation && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>📍 {selectedLocation}에 있는 식품</Text>
          {groupedFoods[selectedLocation].map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>• {item.name}</Text>
              <Text style={styles.itemSub}>{item.category}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 하단 구조 설정 버튼 */}
      <View style={{ marginTop: 40, marginBottom: 30, alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('FridgeMapping' as never)}
        >
          <Text style={styles.settingButtonText}>+ 냉장고 구조 설정/수정하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4FA',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4DA8DA',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  detailBox: {
    marginTop: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  itemRow: {
    marginBottom: 6,
  },
  itemName: {
    fontSize: 15,
    color: '#2C3E50',
  },
  itemSub: {
    fontSize: 13,
    color: '#888',
    marginLeft: 10,
  },
  settingButton: {
    backgroundColor: '#4DA8DA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  settingButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

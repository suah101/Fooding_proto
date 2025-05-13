/**
 * 변경 이력:
 * 1. 2025-05-13: 오른쪽 상단 프로필 아이콘 제거 및 헤더 디자인 개선
 * 2. 2025-05-13: 배경색을 #F5FAFF로 통일 (WasteStatsScreen과 일치)
 * 3. 2025-05-13: 인사말 레이아웃을 FridgeScreen과 동일하게 조정
 */
// ✅ src/screens/HomeScreen.tsx
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

export default function HomeScreen() {
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;
  const navigation = useNavigation<any>();

  const [userName] = useState('수아');

  const dummyExpiringFoods = [
    { id: '1', name: '우유', expirationDate: '2025-05-10' },
    { id: '2', name: '계란', expirationDate: '2025-05-11' },
  ];

  const dummyRecipes = [
    {
      title: '토마토 파스타',
      steps: [
        '재료 준비',
        '면 삶기',
        '소스 만들기',
        '섞기',
        '완성!',
      ],
    },
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
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <Text style={styles.title}>👋  안녕하세요, {userName}님!</Text>

      <ScrollView style={styles.scrollView}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍽 오늘의 추천 레시피</Text>
          {dummyRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeCard}
              onPress={() => navigation.navigate('RecipeDetail', recipe)}
            >
              <Text style={styles.foodName}>{recipe.title}</Text>
              <Text style={styles.foodExpiry}>지금 바로 만들어보세요!</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginVertical: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
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
  recipeCard: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#fff6e5',
    borderRadius: 10,
    borderColor: '#FFDCA8',
    borderWidth: 1,
  },
});

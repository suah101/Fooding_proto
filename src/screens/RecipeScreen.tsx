import React from 'react';
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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Recipe = {
  title: string;
  ingredients: string[];
  steps?: string[];
  estimatedTime?: number;
};

type RootStackParamList = {
  RecipeDetail: Recipe;
};

export default function RecipeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  // 🔹 하드코딩된 더미 레시피
  const dummyRecipes: Recipe[] = [
    {
      title: '김치볶음밥',
      ingredients: ['김치', '밥', '참기름', '계란'],
      steps: ['김치를 볶는다', '밥을 넣고 함께 볶는다', '참기름과 계란을 올린다'],
    },
    {
      title: '계란말이',
      ingredients: ['계란', '파', '소금'],
      steps: ['계란을 푼다', '파를 썬다', '후라이팬에 부쳐 말아준다'],
    },
  ];

  return (
    <View style={[styles.wrapper, { paddingTop: topPadding }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>🍽 레시피 추천</Text>
      </View>

      <ScrollView style={styles.container}>
        {dummyRecipes.length === 0 ? (
          <Text style={styles.message}>⛱️ 유통기한 임박 재료가 없어요!</Text>
        ) : (
          dummyRecipes.map((recipe, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.ingredients}>재료: {recipe.ingredients.join(', ')}</Text>
              <Text style={styles.message}>
                유통기한 임박한 재료로 "{recipe.title}"을(를) 추천합니다!
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RecipeDetail', recipe)}
              >
                <Text style={styles.buttonText}>레시피 보기</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
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
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#E6F4FA',
  },
  headerRow: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#E6F4FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#4DA8DA',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4DA8DA',
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecipeDetailScreen() {
  const navigation = useNavigation();

  // 🔹 더미 데이터
  const recipe = {
    title: '🍝 토마토 파스타',
    steps: [
      '재료를 준비한다 (파스타면, 토마토소스, 마늘, 양파)',
      '끓는 물에 면을 삶는다',
      '팬에 마늘과 양파를 볶는다',
      '토마토소스를 붓고 3분간 끓인다',
      '삶은 면을 넣고 소스와 함께 섞는다',
      '그릇에 담고 파슬리로 마무리한다',
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>◀ 돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{recipe.title}</Text>

      <View style={styles.stepsContainer}>
        {recipe.steps.length > 0 ? (
          recipe.steps.map((step, idx) => (
            <View key={idx} style={styles.stepCard}>
              <Text style={styles.stepNumber}>🍳 STEP {idx + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noStepsText}>요리 단계 정보가 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepsContainer: {
    marginTop: 10,
  },
  stepCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  noStepsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

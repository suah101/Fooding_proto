/**
 * 변경 이력:
 * 1. 2025-05-13: 레시피 상세 화면 UI 구현
 * 2. 2025-05-13: SafeAreaView 추가 및 헤더 디자인 개선
 * 3. 2025-05-13: 타이틀 가운데 정렬 및 뒤로가기 버튼 위치 조정
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backText}>◀</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {recipe.steps.length > 0 ? (
            recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepNumber}>🍳 STEP {index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noStepsText}>요리 단계 정보가 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 30,
  },
  backText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 30, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2723',
    textAlign: 'center',
  },
  placeholder: {
    width: 30, 
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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

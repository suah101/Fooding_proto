/**
 * 변경 이력:
 * 1. 2025-05-13: 유통기한 지난 식품 그래프 제거 및 레이아웃 개선
 * 2. 2025-05-13: 스크롤 범위 조정 및 알림칸 스타일 개선
 * 3. 2025-05-13: 섹션 제목에 이모티콘 추가
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function WasteScreen() {
  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  // 월별 폐기 통계 (더미 데이터)
  const monthlyWasteData = [
    { month: '3월', quantity: 10 },
    { month: '4월', quantity: 8 },
    { month: '5월', quantity: 5 },
  ];

  const monthlyChartData = {
    labels: monthlyWasteData.map((d) => d.month),
    datasets: [
      {
        data: monthlyWasteData.map((d) => d.quantity),
      },
    ],
  };

  const feedback = '지난달보다 3개 덜 버렸어요! ';

  // 이번 달 카테고리별 폐기 상세 (더미 데이터)
  const wasteDetails = [
    {
      category: '채소',
      quantity: 4,
      subItems: {
        양상추: 2,
        오이: 1,
        당근: 1,
      },
    },
    {
      category: '과일',
      quantity: 3,
      subItems: {
        바나나: 2,
        사과: 1,
      },
    },
  ];

  const categoryAdvice =
    '이번 달은 "채소"를 많이 폐기하셨네요! 소량씩 구매하거나 보관법을 바꿔보는 건 어떨까요?';

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: topPadding }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* 월별 폐기량 추이 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 월별 폐기량 추이</Text>
      </View>
      <BarChart
        data={monthlyChartData}
        width={screenWidth - 40}
        height={220}
        fromZero
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(77, 136, 255, ${opacity})`,
          labelColor: () => '#2C3E50',
        }}
        style={{ marginVertical: 20, borderRadius: 12 }}
        yAxisLabel=""
        yAxisSuffix=""
      />
      <Text style={styles.feedback}>{feedback}</Text>

      {/* 폐기 상세 내역 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 폐기 상세 내역</Text>
      </View>
      {wasteDetails.map((item) => (
        <View key={item.category} style={styles.summaryItem}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.count}>{item.quantity}개 폐기</Text>

          {Object.entries(item.subItems).map(([name, count]) => (
            <Text key={name} style={styles.subItem}>
              → {name}: {count}개
            </Text>
          ))}
        </View>
      ))}
      
      <Text style={styles.advice}>{categoryAdvice}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FAFF',
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 10,
  },
  feedback: {
    fontSize: 16,
    color: '#4DA8DA',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  advice: {
    fontSize: 15,
    color: '#E74C3C',
    backgroundColor: '#FDEDEC',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40, 
    lineHeight: 22,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  summaryItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  category: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  count: {
    fontSize: 15,
    color: '#E74C3C',
    marginBottom: 10,
    fontWeight: '500',
  },
  subItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginTop: 5,
  },
});

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

  // 🔹 월별 폐기 통계 (더미 데이터)
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

  const feedback = '지난달보다 3개 덜 버렸어요! 🎉';

  // 🔹 이번 달 카테고리별 폐기 상세 (더미 데이터)
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

  const categoryChartData = {
    labels: wasteDetails.map((item) => item.category),
    datasets: [
      {
        data: wasteDetails.map((item) => item.quantity),
      },
    ],
  };

  const categoryAdvice =
    '이번 달은 "채소"를 많이 폐기하셨네요! 소량씩 구매하거나 보관법을 바꿔보는 건 어떨까요?';

  return (
    <ScrollView style={[styles.container, { paddingTop: topPadding }]}>
      {/* 📈 월별 폐기량 통계 */}
      <Text style={styles.title}>📈 월별 폐기량 추이</Text>
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

      {/* 📊 카테고리별 폐기 데이터 */}
      <Text style={[styles.title, { marginTop: 30 }]}>📊 유통기한 지난 식품</Text>

      <BarChart
        data={categoryChartData}
        width={screenWidth - 40}
        height={220}
        fromZero
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#E6F4FA',
          backgroundGradientTo: '#E6F4FA',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(77, 168, 218, ${opacity})`,
          labelColor: () => '#2C3E50',
        }}
        style={{ marginVertical: 20, borderRadius: 12 }}
        yAxisLabel=""
        yAxisSuffix=""
      />

      <Text style={styles.advice}>{categoryAdvice}</Text>

      {/* 상세 리스트 */}
      <View style={styles.summary}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FAFF',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  feedback: {
    fontSize: 16,
    color: '#4DA8DA',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  advice: {
    fontSize: 15,
    color: '#4DA8DA',
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  summary: {
    marginTop: 20,
  },
  summaryItem: {
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2F2F',
  },
  count: {
    fontSize: 16,
    color: '#4DA8DA',
    fontWeight: '600',
    marginBottom: 6,
  },
  subItem: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 14,
    marginBottom: 2,
  },
});

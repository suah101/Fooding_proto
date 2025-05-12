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

  // 🔹 하드코딩된 더미 폐기 데이터
  const wasteData = [
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

  const chartData = {
    labels: wasteData.map((item) => item.category),
    datasets: [
      {
        data: wasteData.map((item) => item.quantity),
      },
    ],
  };

  const advice = '이번 달은 "채소"를 많이 폐기하셨네요! 소량씩 구매하거나 보관법을 바꿔보는 건 어떨까요?';

  return (
    <ScrollView style={[styles.container, { paddingTop: topPadding }]}>
      <Text style={styles.title}>📊 유통기한 지난 식품</Text>

      {wasteData.length > 0 ? (
        <>
          <BarChart
                      data={chartData}
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
                      style={{ marginVertical: 20, borderRadius: 12 }} yAxisLabel={''} yAxisSuffix={''}          />

          <Text style={styles.advice}>{advice}</Text>

          <View style={styles.summary}>
            {wasteData.map((item) => (
              <View key={item.category} style={styles.summaryItem}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.count}>{item.quantity}개 폐기</Text>

                {Object.entries(item.subItems).map(([name, count]) => (
                  <Text key={name} style={styles.subItem}>
                    • {name}: {count}개
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={{ marginTop: 30, textAlign: 'center', color: '#888' }}>
          유통기한이 지난 식품이 없습니다. 🎉
        </Text>
      )}
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
    color: '#555',
    marginLeft: 10,
    marginBottom: 2,
  },
});

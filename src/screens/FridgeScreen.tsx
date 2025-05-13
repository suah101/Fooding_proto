import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';

// 네비게이션 타입 정의
type FridgeStackParamList = {
  FridgeMain: undefined;
  AddFoodScreen: undefined;
};

type FridgeScreenNavigationProp = StackNavigationProp<FridgeStackParamList, 'FridgeMain'>;

// 냉장고 구역 타입 정의
type FridgeSection = {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: Array<{
    id: string;
    name: string;
    category: string;
    expirationDate: string;
  }>;
};

// 냉장고 구역 데이터
const fridgeSections: FridgeSection[] = [
  {
    id: 'refrigerator',
    name: '냉장실',
    icon: 'kitchen',
    color: '#a8e6ff',
    items: [
      { id: '1', name: '우유', category: '유제품', expirationDate: '2025-05-15' },
      { id: '2', name: '계란', category: '계란', expirationDate: '2025-05-17' },
      { id: '3', name: '야채', category: '채소', expirationDate: '2025-05-20' },
    ],
  },
  {
    id: 'freezer',
    name: '냉동실',
    icon: 'ac-unit',
    color: '#c6e2ff',
    items: [
      { id: '4', name: '고기', category: '육류', expirationDate: '2025-06-10' },
      { id: '5', name: '아이스크림', category: '디저트', expirationDate: '2025-08-01' },
    ],
  },
  {
    id: 'roomTemp',
    name: '실온보관',
    icon: 'home',
    color: '#ffecb3',
    items: [
      { id: '6', name: '사과', category: '과일', expirationDate: '2025-05-25' },
      { id: '7', name: '바나나', category: '과일', expirationDate: '2025-05-13' },
    ],
  },
];

const { width } = Dimensions.get('window');

const FridgeScreen = () => {
  const navigation = useNavigation<FridgeScreenNavigationProp>();
  const [selectedSection, setSelectedSection] = useState<FridgeSection | null>(null);

  const formatDday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'D-Day';
    if (diff < 0) return `D+${Math.abs(diff)}`;
    return `D-${diff}`;
  };

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <Text style={styles.title}>🧊 나의 냉장고</Text>

      {/* 냉장고 그래픽 영역 */}
      <View style={styles.fridgeContainer}>
        <View style={styles.fridgeGraphic}>
          {fridgeSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionButton,
                { backgroundColor: section.color },
                selectedSection?.id === section.id && styles.selectedSection
              ]}
              onPress={() => setSelectedSection(section)}
            >
              <Icon name={section.icon} size={32} color="#333" />
              <Text style={styles.sectionName}>{section.name}</Text>
              <Text style={styles.itemCount}>{section.items.length}개</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 선택된 구역의 식재료 목록 */}
      <View style={styles.inventoryContainer}>
        <Text style={styles.subtitle}>
          {selectedSection ? `${selectedSection.name}의 식재료` : '구역을 선택하세요'}
        </Text>

        {selectedSection ? (
          <ScrollView style={styles.itemsList}>
            {selectedSection.items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <View style={[
                  styles.expiryBadge,
                  item.expirationDate === '2025-05-13' && styles.expirySoon
                ]}>
                  <Text style={styles.expiryText}>{formatDday(item.expirationDate)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="info" size={40} color="#ccc" />
            <Text style={styles.emptyText}>냉장고 구역을 선택해주세요</Text>
          </View>
        )}
      </View>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddFoodScreen')}
      >
        <Icon name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>식재료 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'NotoSansKR-Bold',
  },
  fridgeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fridgeGraphic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionButton: {
    width: (width - 62) / 3,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSection: {
    borderColor: '#4A90E2',
    backgroundColor: '#e3f2fd',
  },
  sectionName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  itemCount: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  inventoryContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
  },
  itemsList: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#888',
  },
  expiryBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  expirySoon: {
    backgroundColor: '#ffebee',
  },
  expiryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default FridgeScreen;

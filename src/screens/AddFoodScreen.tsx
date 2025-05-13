/**
 * 변경 이력:
 * 1. 2025-05-13: UI 디자인 개선 및 배경색 통일
 * 2. 2025-05-13: Picker를 카드 형태의 버튼으로 변경하고 모달 방식의 카테고리 및 보관 장소 선택 UI 추가
 * 3. 2025-05-13: 타이틀 스타일을 FridgeScreen과 동일하게 조정 및 아보카도 이모티콘 추가
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const formatKoreanDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

const categories = [
  { id: 'vegetable', name: '채소' },
  { id: 'fruit', name: '과일' },
  { id: 'meat', name: '정육·계란' },
  { id: 'seafood', name: '수산·해산물' },
  { id: 'dairy', name: '유제품' },
  { id: 'grain', name: '곡류' },
  { id: 'sauce', name: '소스·조미료' },
  { id: 'beverage', name: '음료' },
  { id: 'etc', name: '기타' },
];

const storageTypes = [
  { id: 'refrigerator', name: '냉장실' },
  { id: 'freezer', name: '냉동실' },
  { id: 'roomTemp', name: '실온보관' },
];

const AddFoodScreen = () => {
  const [foodName, setFoodName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'storage'>('category');

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpiryDate(selectedDate);
    }
  };

  const renderModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {modalType === 'category' ? '카테고리 선택' : '보관 장소 선택'}
        </Text>
        <ScrollView style={styles.modalScrollView}>
          {(modalType === 'category' ? categories : storageTypes).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.modalItem}
              onPress={() => {
                if (modalType === 'category') {
                  setSelectedCategory(item.id);
                } else {
                  setSelectedStorage(item.id);
                }
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={[styles.scrollView, { paddingTop: topPadding }]}
        contentContainerStyle={styles.scrollContent}
      >
        
        
        <View style={styles.section}>
          <Text style={styles.label}>식재료 이름</Text>
          <TextInput
            style={styles.input}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="예) 사과, 우유, 계란"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>카테고리</Text>
          <TouchableOpacity 
            style={styles.pickerButton}
            onPress={() => {
              setModalType('category');
              setModalVisible(true);
            }}
          >
            <Text style={selectedCategory ? styles.pickerButtonText : styles.pickerButtonPlaceholder}>
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name 
                : '카테고리를 선택해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>보관 장소</Text>
          <TouchableOpacity 
            style={styles.pickerButton}
            onPress={() => {
              setModalType('storage');
              setModalVisible(true);
            }}
          >
            <Text style={selectedStorage ? styles.pickerButtonText : styles.pickerButtonPlaceholder}>
              {selectedStorage 
                ? storageTypes.find(s => s.id === selectedStorage)?.name 
                : '보관 장소를 선택해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>유통기한</Text>
          <TouchableOpacity 
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatKoreanDate(expiryDate)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={expiryDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>추가하기</Text>
        </TouchableOpacity>
      </ScrollView>
      {renderModal()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'NotoSansKR-Bold',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  datePickerButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  pickerButtonPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dateText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2C3E50',
  },
  modalScrollView: {
    maxHeight: '80%',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#2C3E50',
  },
});

export default AddFoodScreen;

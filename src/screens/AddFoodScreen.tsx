import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const formatKoreanDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

export default function AddFoodScreen() {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [unitAmount, setUnitAmount] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customUnit, setCustomUnit] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState('');

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const categoryOptions = ['채소', '과일', '육류', '기타'];

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setExpireDate(selectedDate);
  };

  return (
    <View style={[styles.wrapper, { paddingTop: topPadding }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>식품 등록</Text>

        <Text style={styles.label}>카테고리</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="카테고리 선택" value="" />
            {categoryOptions.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {category && category !== '기타' && (
          <>
            <Text style={styles.label}>식품명</Text>
            <TextInput
              value={itemName}
              onChangeText={setItemName}
              placeholder="예: 양상추"
              style={styles.input}
            />

            <Text style={styles.label}>수량 단위</Text>
            <TextInput
              value={unitAmount}
              onChangeText={setUnitAmount}
              placeholder="예: 개, 봉지 등"
              style={styles.input}
            />
          </>
        )}

        {category === '기타' && (
          <>
            <Text style={styles.label}>식품명 (직접 입력)</Text>
            <TextInput
              value={itemName}
              onChangeText={setItemName}
              placeholder="예: 마카다미아"
              style={styles.input}
            />

            <Text style={styles.label}>단위 (예: 개, g 등)</Text>
            <TextInput
              value={customUnit}
              onChangeText={setCustomUnit}
              placeholder="예: 개"
              style={styles.input}
            />

            <Text style={styles.label}>수량</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.stepBtn}>
                <Text style={styles.stepText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepBtn}>
                <Text style={styles.stepText}>+</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text style={styles.label}>단가 (선택)</Text>
        <TextInput
          value={unitPrice}
          onChangeText={setUnitPrice}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>냉장고 위치</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={selectedLocationId} onValueChange={setSelectedLocationId}>
            <Picker.Item label="위치 선택" value="" />
            <Picker.Item label="냉장실 1번칸" value="1" />
            <Picker.Item label="야채칸" value="2" />
            <Picker.Item label="문쪽" value="3" />
          </Picker>
        </View>

        <Text style={styles.label}>유통기한 직접 선택</Text>
        <Button
          title={expireDate ? formatKoreanDate(expireDate) : '날짜 선택'}
          onPress={() => setShowDatePicker(true)}
          color="#4DA8DA"
        />
        {showDatePicker && (
          <DateTimePicker
            value={expireDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>등록하기 (미동작)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#2C3E50',
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
    color: '#444',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stepBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#4DA8DA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  stepText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
  },
  submitBtn: {
    backgroundColor: '#4DA8DA',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

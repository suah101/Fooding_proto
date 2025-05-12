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
} from 'react-native';

const sectionOptions = ['냉장실', '냉동실', '야채칸', '문쪽칸'];
const slotOptions = ['상단', '중단', '하단', '좌측칸', '우측칸'];

export default function FridgeMappingScreen() {
  const [alias, setAlias] = useState('');
  const [section, setSection] = useState('');
  const [slot, setSlot] = useState('');
  const [draftList, setDraftList] = useState<any[]>([]);

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const handleAdd = () => {
    if (!section || !slot) return;
    const displayName = alias
      ? `${alias} (${section} > ${slot})`
      : `${section} > ${slot}`;
    const newItem = { displayName };
    setDraftList((prev) => [...prev, newItem]);
    setAlias('');
    setSection('');
    setSlot('');
  };

  const handleRemoveDraft = (index: number) => {
    const updated = [...draftList];
    updated.splice(index, 1);
    setDraftList(updated);
  };

  return (
    <View style={[styles.wrapper, { paddingTop: topPadding }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>냉장고 구조 설계</Text>

        <Text style={styles.label}>위치 별칭 (선택)</Text>
        <TextInput
          placeholder="예: 계란칸, 야채칸"
          value={alias}
          onChangeText={setAlias}
          style={styles.input}
        />

        <Text style={styles.label}>냉장고 구역</Text>
        <View style={styles.rowWrap}>
          {sectionOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.box, section === opt && styles.boxSelected]}
              onPress={() => setSection(opt)}
            >
              <Text style={styles.boxText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>칸</Text>
        <View style={styles.rowWrap}>
          {slotOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.box, slot === opt && styles.boxSelected]}
              onPress={() => setSlot(opt)}
            >
              <Text style={styles.boxText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
          <Text style={styles.saveText}>+ 항목 추가</Text>
        </TouchableOpacity>

        {draftList.length > 0 && (
          <>
            <Text style={[styles.title, { marginTop: 25 }]}>설계 중 구조</Text>
            {draftList.map((item, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text>{item.displayName}</Text>
                <TouchableOpacity onPress={() => handleRemoveDraft(idx)}>
                  <Text style={styles.deleteBtn}>삭제</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
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
    paddingBottom: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#2C3E50',
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    marginBottom: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  box: {
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  boxSelected: {
    backgroundColor: '#4DA8DA',
  },
  boxText: {
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4DA8DA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  deleteBtn: {
    color: 'red',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MyPageScreen({ navigation }: any) {
  const menuItems = [
    { title: '내 정보 관리', icon: 'person-outline' },
    { title: '식품 목록', icon: 'cart-outline' },
    { title: '폐기 목록', icon: 'repeat-outline' },
    { title: '고객센터', icon: 'help-circle-outline' },
    { title: '로그아웃', icon: 'log-out-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
        <Icon name="arrow-back-outline" size={24} color="#4DA8DA" />
      </TouchableOpacity>

      <Text style={styles.title}>회원정보</Text>

      {/* 프로필 */}
      <View style={styles.profileBox}>
        <Icon name="person-circle-outline" size={80} color="#4DA8DA" />
        <Text style={styles.name}>sooah@example.com</Text>
        <View style={styles.statusBox}></View>
      </View>

      {/* 메뉴 리스트 */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log(`Pressed ${item.title}`)} // 기능 제거
          >
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={22} color="#4DA8DA" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={18} color="#4DA8DA" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

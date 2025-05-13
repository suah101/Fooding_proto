import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
// ❗️FridgeScreen 제거하고 FridgeStack으로 변경
import FridgeStack from '../screens/FridgeStack';
import WasteStatsScreen from '../screens/WasteStatsScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Fridge':
              iconName = 'snow-outline';
              break;
            case 'Add':
              iconName = 'add-circle-outline';
              break;
            case 'Stats':
              iconName = 'bar-chart-outline';
              break;
            case 'My':
              iconName = 'person-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4DA8DA',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fridge" component={FridgeStack} />
      <Tab.Screen name="Stats" component={WasteStatsScreen} />
      <Tab.Screen name="My" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

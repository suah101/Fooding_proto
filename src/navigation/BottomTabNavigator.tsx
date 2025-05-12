import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import FridgeScreen from '../screens/FridgeScreen';
import WasteScreen from '../screens/WasteScreen';
import RecipeScreen from '../screens/RecipeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<Record<string, object | undefined>, string>;
      }): BottomTabNavigationOptions => ({
        tabBarIcon: ({
          color,
          size,
        }: {
          color: string;
          size: number;
        }) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Fridge') iconName = 'snow-outline';
          else if (route.name === 'Waste') iconName = 'trash-outline';
          else if (route.name === 'Recipe') iconName = 'restaurant-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4DA8DA',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fridge" component={FridgeScreen} />
      <Tab.Screen name="Waste" component={WasteScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
    </Tab.Navigator>
  );
}

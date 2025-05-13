import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens();

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import FridgeMappingScreen from './src/screens/FridgeMappingScreen';
import AddFoodScreen from './src/screens/AddFoodScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import FridgeScreen from './src/screens/FridgeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#E0F7FA' : 'transparent'}
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen 
            name="AddFood" 
            component={AddFoodScreen} 
            options={{
              title: '새로운 식재료 등록',
              headerShown: true,
              headerBackTitle: '뒤로',
              headerStyle: {
                backgroundColor: '#F5FAFF',
              },
              headerTintColor: '#2C3E50',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          <Stack.Screen name="FridgeMapping" component={FridgeMappingScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="Fridge" component={FridgeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

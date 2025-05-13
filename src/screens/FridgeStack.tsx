import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FridgeScreen from '../screens/FridgeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';

const Stack = createNativeStackNavigator();

export default function FridgeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FridgeMain" component={FridgeScreen} />
      <Stack.Screen
        name="AddFoodScreen"
        component={AddFoodScreen}
        options={{ presentation: 'modal' }} // ← 모달 전환 느낌
      />
    </Stack.Navigator>
  );
}

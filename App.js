import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/components/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen';
import HomeScreen from './src/components/HomeScreen';
import ConfigScreen from './src/components/ConfigScreen';
import MessagesScreen from './src/components/MessagesScreen';
import ChatScreen from './src/components/ChatScreen';
import AddPetScreen from './src/components/AddPetScreen';
import MyPetsScreen from './src/components/MyPetsScreen';
import PetDetailsScreen from './src/components/PetDetailsScreen';
import SelectPetScreen from './src/components/SelectPetScreen';
import PetMatchingScreen from './src/components/PetMatchingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Config" component={ConfigScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AddPet" component={AddPetScreen} />
          <Stack.Screen name="MyPets" component={MyPetsScreen} />
          <Stack.Screen name="PetDetails" component={PetDetailsScreen} />
          <Stack.Screen name="SelectPet" component={SelectPetScreen} />
          <Stack.Screen name="PetMatching" component={PetMatchingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
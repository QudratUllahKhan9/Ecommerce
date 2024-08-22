import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import BottomBar from './BottomBar';
import AddToCartScreen from '../screen/AddCart';
import AddressScreen from '../screen/AddressScreen';
import ProductDatilsScreen from '../screen/ProductDatilsScreen';
import NewProductScreen from '../screen/AddProduct';
import OrderHistoryScreen from '../screen/OrderScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const password = await AsyncStorage.getItem('userPassword');

        if (email && password) {
          setUserToken({email, password});
        }
      } catch (error) {
        console.error('Failed to load user token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserToken();
  }, []);

  if (isLoading) {
    // Optionally show a loading screen while checking AsyncStorage
    return null; // Or return a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userToken ? (
          <>
            <Stack.Screen name="HomeScreen" component={BottomBar} />
            <Stack.Screen name="AddToCartScreen" component={AddToCartScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen
              name="ProductDatilsScreen"
              component={ProductDatilsScreen}
            />
            <Stack.Screen
              name="NewProductScreen"
              component={NewProductScreen}
            />
            <Stack.Screen
              name="OrderHistoryScreen"
              component={OrderHistoryScreen}
            />
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={BottomBar} />
            <Stack.Screen name="AddToCartScreen" component={AddToCartScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen
              name="ProductDatilsScreen"
              component={ProductDatilsScreen}
            />
            <Stack.Screen
              name="NewProductScreen"
              component={NewProductScreen}
            />
            <Stack.Screen
              name="OrderHistoryScreen"
              component={OrderHistoryScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

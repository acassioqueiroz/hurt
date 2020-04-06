import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "./config/config";

import Main from './pages/main';
import Product from './pages/product';

const Stack = createStackNavigator();

const Routes: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={
            {
              title: "Products",
              headerStyle: {
                backgroundColor: "#DA552F",
              },
              headerTintColor: "#FFF",
            }
          } />
        <Stack.Screen name="Product" component={Product} options={
          {
            title: "Product",
            headerStyle: {
              backgroundColor: "#DA552F",
            },
            headerTintColor: "#FFF",
          }
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import * as React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../auth/LoginScreen';
import TodoList from '../todos/screens/TodoList';
import TodoDetail from '../todos/screens/TodoDetail';
import FoodList from '../foods/screens/FoodList';
import FoodDetail from '../foods/screens/FoodDetail';

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationNativeContainer>
            <Stack.Navigator initialRouteName="loginScreen">
                <Stack.Screen name="loginScreen" component={LoginScreen} options={{ headerShown: false }} />

                <Stack.Screen name="todoList" component={TodoList} options={{ title: 'Todo list' }} />
                <Stack.Screen name="todoDetail" component={TodoDetail} options={{ title: 'Todo detail' }} />

                <Stack.Screen name="foodList" component={FoodList} options={{ title: 'Food list' }} />
                <Stack.Screen name="foodDetail" component={FoodDetail} options={{ title: 'Food detail' }} />
            </Stack.Navigator>
        </NavigationNativeContainer>
    );
};
export default RootNavigation;

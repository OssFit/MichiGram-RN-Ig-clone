import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'
import NewPostScreen from './Screens/NewPostScreen'
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';


const Stack=createStackNavigator()
const screenOptions={
    headerShown:false
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
   <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
<Stack.Screen name='HomeScreen' component={HomeScreen}/>
<Stack.Screen name='NewPostScreen' component={NewPostScreen}/>


   </Stack.Navigator>
    
    </NavigationContainer>
  )
}

export const SignedOutStack =()=>{
  return (
    <NavigationContainer>
   <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>

<Stack.Screen name='LoginScreen' component={LoginScreen}/>
<Stack.Screen name='SignUpScreen' component={SignUpScreen}/>

   </Stack.Navigator>
    
    </NavigationContainer>
  )

}

 export default SignedInStack
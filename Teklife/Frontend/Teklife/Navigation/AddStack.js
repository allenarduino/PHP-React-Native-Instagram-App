import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
//import {createStackNavigator} from "react-navigation-stack";
//import {createAppContainer,NavigationContainer} from 'react-navigation';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddPost from "../Screens/AddPost";
//import SelectImage from '../Screens/SelectPhotoScreen';
//import Save from '../Screens/NewPostScreen';
import SelectPhotoScreen from "../Screens/SelectPhotoScreen";
import NewPostScreen from "../Screens/NewPostScreen";
import Home from "../Screens/Home";
import MyContext from "../Screens/NewPostScreen";

const Stack = createStackNavigator();

function AddStack(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddPost" headerMode="screen">
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{
            title: "Add Post"
          }}
        />

        <Stack.Screen
          name="SelectPhotoScreen"
          component={SelectPhotoScreen}
          options={{
            title: "Select Photo"
          }}
        />

        <Stack.Screen
          name="NewPostScreen"
          component={NewPostScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AddStack;

/*
const RootStack=createStackNavigator(
    {

      AddPost:{
        screen:AddPost,
        navigationOptions:{
          header:null
        }
      },

      SelectImage:{
        screen:SelectImage,
        navigationOptions:{
          header:null
        }
      },

      Save:{
        screen:Save,
        navigationOptions:{
          header:null
        }
      },

    
         //initialRouteName:"AppIntroOne",
       }
)

const AddStack=createAppContainer(RootStack);


export default AddStack;
*/
/*
import React from 'react';
import {Text,View} from 'react-native';
import AuthLoading from '../Screens/AuthLoading';
import LoginScreen from '../Screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function MainStackNavigatorOne() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
    
    <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Awesome app',
        }}
      />


    </Stack.Navigator>
  );
}

export default MainStackNavigatorOne;
*/

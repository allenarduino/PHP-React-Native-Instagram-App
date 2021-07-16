import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import ChatSection from "../Screens/ChatSection";
import SingleProfile from "../Screens/SingleProfile";
import DirectMessage from "../Screens/DirectMessage";
import SinglePost from "../Screens/SinglePost";
import EditProfile from "../Screens/EditProfile";
import ChooseUserImg from "../Screens/ChooseUserImg";
import ChooseCoverPhoto from "../Screens/ChooseCoverPhoto";
import UpdateUserImg from "../Screens/UpdateUserImg";
import UpdateCoverPhoto from "../Screens/UpdateCoverPhoto";
import Icon from "react-native-vector-icons/Ionicons";

import MyContext from "../Screens/NewPostScreen";
import LocateShuttle from "../Screens/LocateShuttle";

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="screen">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChatSection"
          component={ChatSection}
          options={{
            title: "Chats"
          }}
        />

        <Stack.Screen
          name="SingleProfile"
          component={SingleProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit Profile"
          }}
        />

        <Stack.Screen
          name="ChooseUserImg"
          component={ChooseUserImg}
          options={{
            title: "Choose Profile Photo"
          }}
        />

        <Stack.Screen
          name="ChooseCoverPhoto"
          component={ChooseCoverPhoto}
          options={{
            title: "Choose Coverphoto"
          }}
        />

        <Stack.Screen
          name="UpdateUserImg"
          component={UpdateUserImg}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpdateCoverPhoto"
          component={UpdateCoverPhoto}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DirectMessage"
          component={DirectMessage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SinglePost"
          component={SinglePost}
          options={{
            title: "Comments"
          }}
        />

        <Stack.Screen
          name="LocateShuttle"
          component={LocateShuttle}
          options={{
            title: "Locate Shuttle"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;

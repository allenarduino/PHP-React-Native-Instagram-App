import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AuthContext } from "../App";
import EventSource from "react-native-event-source";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";

const io = require("socket.io-client");

const Articles = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const send = () => {
    const source = new EventSource(
      "http://10.74.14.80:80/code_reservoir/sse.php"
    );
    source.addEventListener("message", event => {
      alert(event.data);
    });
  };

  const drawerRef = React.useRef(null);
  const renderDrawer = () => {
    return (
      <View>
        <Text>I am in the drawer</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Right}
        drawerType="slide"
        drawerBackgroundColor="#ddd"
        renderNavigationView={renderDrawer}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "violet",
            width: 200,
            height: 30,
            marginTop: 100
          }}
          onPress={() => drawerRef.current.openDrawer()}
        >
          <Text>Open</Text>
        </TouchableOpacity>
      </DrawerLayout>
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
    paddingLeft: 20,
    borderRadius: 14,
    marginTop: 20
  }
});

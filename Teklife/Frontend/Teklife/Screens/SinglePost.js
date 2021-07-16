import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import {
  Image,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { AuthContext } from "../App";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import jwt_decode from "jwt-decode";

const SinglePost = ({ navigation, route }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const [comment_text, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [max, setMax] = React.useState("");
  const [loading, controlLoading] = React.useState(true);
  const scroll = React.useRef();
  const myinput = React.useRef();

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  let data_sent = JSON.stringify({
    post_id: route.params.post_id,
    max: max
  });

  const addCommment = () => {
    const sender_id = user_id;
    const receipient_id = route.params.user_id;

    const offline_data = {
      commentor: user_id,
      text: comment_text
    };

    if (comment_text == "") {
      return;
    } else {
      myinput.current.clear();
      setComments([...comments, offline_data]);

      //Sending comment to the server
      const formdata = new FormData();
      formdata.append("comment", comment_text);
      formdata.append("post_id", route.params.post_id);
      fetch(`${url}/code_reservoir/create_comment.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        body: formdata
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.comments);
        })
        .catch(err => console.log(err));
      setTimeout(fetch_comments, 20);
    }
  };

  const fetch_comments = () => {
    fetch(`${url}/code_reservoir/fetch_comments.php/?data=${data_sent}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
        controlLoading(false);
        setMax(data.comment_count);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_comments, 20);
  };

  React.useEffect(() => {
    fetch_comments();
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: `${loading ? "#fff" : "whitesmoke"}` }}
    >
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: HEIGHT / 3
          }}
        >
          <Image
            source={require("../Images/loader5.gif")}
            style={{ height: 100, width: 100 }}
          />
        </View>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            ref={scroll}
            onContentSizeChange={() =>
              scroll.current.scrollToEnd({ animated: true })
            }
          >
            <View style={{ marginTop: "30%", marginBottom: 30 }}>
              {comments.map(c => (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleProfile", {
                        user_id: c.user_id
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: `${url}/code_reservoir/${c.user_img}`
                      }}
                      style={styles.userAvatar}
                    />
                  </TouchableOpacity>
                  {c.user_id === user_id ? (
                    <View style={styles.chatBubble1}>
                      <Text style={{ color: "#fff" }}>{c.text}</Text>
                    </View>
                  ) : (
                    <View style={styles.chatBubble2}>
                      <Text style={{ color: "black" }}>{c.text}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Write Comment"
                multiline
                style={styles.inputField}
                keyboardAppearance="dark"
                keyboardType="default"
                onChangeText={comment => setComment(comment)}
                value={state.password}
                ref={myinput}
              />
              <Icon name="image" size={25} color="rgb(95, 32, 155)" />
              <Icon
                name="camera"
                size={25}
                style={{ marginLeft: 10 }}
                color="rgb(95, 32, 155)"
              />
            </View>
            <Icon
              name="send"
              size={30}
              style={{ marginLeft: 10 }}
              color="rgb(95, 32, 155)"
              onPress={() => addCommment()}
            />
          </View>

          <View style={{ marginTop: 10 }}></View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    marginTop: -10,
    borderRadius: 30,
    width: "83%"
  },

  inputField: {
    width: "78%",
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingLeft: 10
  },
  chatBubble1: {
    padding: 20,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "4%",
    maxWidth: "80%",
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "rgb(95, 32, 155)",
    color: "#fff"
  },

  chatBubble2: {
    padding: 20,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    maxWidth: "80%",
    marginLeft: "4%",
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#fff"
  },

  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 10
  }
});

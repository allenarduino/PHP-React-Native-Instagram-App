import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";

import * as Animatable from "react-native-animatable";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import { Header } from "react-native-elements";
import { RectButton } from "react-native-gesture-handler";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";

const io = require("socket.io-client");

import {
  ContainerScroll,
  Container,
  ContainerHeader,
  ContainerItemStory,
  ContainerPhoto,
  Photo,
  Name,
  PostPhoto,
  ContainerActions,
  ContainerActionsIcons,
  GroupIcons,
  Label
} from "../Components/Posts/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const socket = io("http://10.74.15.133:3000", {
  transports: ["websocket"]
});

const Home = ({ navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const [iconsConfigure] = React.useState({
    color: "#333",
    size: 20,
    style: {
      paddingRight: 15
    }
  });

  const [posts, setState] = React.useState([]);
  const [user, fetch_user] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_post = id => {
    setModalVisible(false);
    let post_list = posts;
    for (let i = 0; i < post_list.length; i++) {
      let p = post_list[i];
      if (p.p_id === id) {
        post_list.splice(i, 1);
        break;
      }
    }
    setState(post_list);
    const data = new FormData();
    data.append("id", id);
    fetch(`${url}/code_reservoir/delete_post.php`, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
      })
      .catch(err => console.log(err));
  };

  const fetch_posts = () => {
    fetch(`${url}/code_reservoir/fetch_posts.php/?max=${max}`, {
      method: "GET",
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setState(data.posts);
        fetch_user(data.user);
        controlLoading(false);
        setMax(data.post_count);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_posts, 6000);
  };

  const like = id => {
    const newPost = posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    setState(newPost);

    const data = new FormData();
    data.append("post_id", id);
    data.append("token", state.token);

    fetch(`${url}/code_reservoir/like_post.php`, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => console.log(data.message));

    //.catch(err=>alert(err));

    // socket.emit("like_post", { user_id: user_id, id: id });
  };

  const unlike = async (e, id) => {
    const newPost = posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    setState(newPost);

    const data = new FormData();
    data.append("post_id", id);
    data.append("token", state.token);

    fetch(`${url}/code_reservoir/unlike_post.php`, {
      method: "POST",
      body: data
    }).then(res => res.json());
    // .then(data=>alert(data.message))
    // .catch(err=>alert(err))
  };

  React.useEffect(() => {
    fetch_posts();
  }, []);

  const drawerRef = React.useRef(null);
  const renderDrawer = () => {
    return (
      <View style={{ marginTop: 10 }}>
        {user.map(u => (
          <View>
            <Image
              source={{ uri: `${url}/code_reservoir/${u.coverphoto}` }}
              style={styles.coverPhoto}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleProfile", { user_id: u.user_id })
                }
              >
                <Image
                  source={{ uri: `${url}/code_reservoir/${u.user_img}` }}
                  style={styles.avartar}
                />
              </TouchableOpacity>
              <Text style={styles.name}>{u.full_name}</Text>
            </View>
          </View>
        ))}
        <View style={{ marginTop: 50, marginLeft: 50 }}>
          <View style={styles.drawerTextContainer}>
            <Icon name="library" size={30} color="black" />
            <Text style={styles.drawerText}>Library</Text>
          </View>

          <View style={styles.drawerTextContainer}>
            <Icon name="calendar" size={30} color="black" />
            <Text style={styles.drawerText}>Events</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={270}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="slide"
        drawerBackgroundColor="#fff"
        renderNavigationView={renderDrawer}
      >
        <Header
          placement="left"
          centerComponent={
            <Text
              style={{
                fontSize: 24,
                fontStyle: "italic",
                fontWeight: "bold",
                color: "rgb(95, 32, 155)",
                alignSelf: "center"
              }}
            >
              Teklife
            </Text>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatSection")}
              style={{ marginLeft: 20 }}
            >
              <Icon name="chatbox-outline" size={27} color="rgb(95, 32, 155)" />
            </TouchableOpacity>
          }
          leftComponent={
            <TouchableOpacity onPress={() => drawerRef.current.openDrawer()}>
              <Icon name="menu-outline" size={27} color="rgb(95, 32, 155)" />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: "#fff",
            //justifyContent: 'space-around',
            height: "13%"
          }}
        />
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
          <ContainerScroll>
            {posts.map((post, index) => (
              <Container key={index}>
                <ContainerHeader>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleProfile", {
                        user_id: post.owner_id
                      })
                    }
                  >
                    <ContainerItemStory>
                      <ContainerPhoto>
                        <Photo
                          source={{
                            uri: `${url}/code_reservoir/${post.user_img}`
                          }}
                        />
                      </ContainerPhoto>
                      <Name>{post.full_name}</Name>
                    </ContainerItemStory>
                  </TouchableOpacity>
                  {post.owner_id == user_id ? (
                    <TouchableOpacity onPress={() => openModal(post.p_id)}>
                      <FontAwesome5 name="ellipsis-h" size={16} color="#888" />
                    </TouchableOpacity>
                  ) : null}
                </ContainerHeader>
                <PostPhoto
                  source={{ uri: `${url}/code_reservoir/${post.post_media}` }}
                />
                <ContainerActions>
                  <ContainerActionsIcons>
                    <GroupIcons>
                      {post.post_liker === null ? (
                        <TouchableOpacity onPress={() => like(post.p_id)}>
                          <Icon name="heart-outline" size={25} color="black" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={e => unlike(e, post.p_id)}>
                          <Icon name="heart" color="red" size={25} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{ marginLeft: 10, marginTop: 2 }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("SinglePost", {
                              post_id: post.p_id
                            })
                          }
                        >
                          <FontAwesome5 name="comment" {...iconsConfigure} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </GroupIcons>
                    <FontAwesome5 name="bookmark" {...iconsConfigure} />
                  </ContainerActionsIcons>
                  <Label style={{ marginTop: -20 }}>
                    {post.total_likes} Likes
                  </Label>
                  <Label>{post.post_caption}</Label>
                  {post.total_comments > 0 ? (
                    <TouchableOpacity>
                      <Text
                        onPress={() =>
                          navigation.navigate("SinglePost", {
                            post_id: post.p_id
                          })
                        }
                        style={{ color: "grey" }}
                      >
                        {post.total_comments} comments
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </ContainerActions>
              </Container>
            ))}
          </ContainerScroll>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Icon
              name="trash"
              size={30}
              onPress={() => delete_post(selectedId)}
            />
            <Text style={{ fontWeight: "bold" }}>Delete Post</Text>
          </View>
        </Modal>
      </DrawerLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    color: "black"
  },
  drawerTextContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%"
  },
  coverPhoto: {
    height: 200,
    width: "100%"
  },
  avartar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    marginTop: -50,
    borderWidth: 3,
    borderColor: "#fff"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: HEIGHT,
    width: WIDTH
  },
  modalContent: {
    backgroundColor: "#fff",
    height: 150,
    width: "80%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Home;

import React from "react";
import ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from "react-native";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      title: "",
      textinput: null,
      appear: true
    };
  }

  Disappear = () => {
    this.setState({
      appear: !this.state.appear
    });
  };

  handleChoosePhoto = async () => {
    const options = {
      noData: true
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({
        post_media: result.uri
      });
    }

    alert("hey");
  };

  /* _pickImage=async()=>{
        let result=await
        ImagePicker.launchImageLibraryAsync({
          allowsEditing:true,
          aspect:[4,3],
        });
    
        if(!result.cancelled){
          this.setState({
            
            post_media:result.uri
            
          });
        }
      }*/
  //end of image picker

  render() {
    const { photo } = this.state;

    return (
      <View style={{ padding: 10 }}>
        <View style={styles.option_container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SelectPhotoScreen")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon name="image-outline" size={24} />
              <Text style={{ marginTop: 2, marginLeft: 10 }}>Make a post</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
          >
            <Icon name="pencil-outline" size={24} />
            <Text style={{ marginTop: 2, marginLeft: 10 }}>Write a post</Text>
          </View>
        </View>
      </View>
    );
  }
}

//export default Createpost;

const styles = StyleSheet.create({
  option_container: {
    marginTop: 400,
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: "100%"
  },

  title: {
    paddingTop: 1,
    paddingBottom: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingRight: 20,
    borderColor: "#fff",
    borderWidth: 7
  },

  textinput: {
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 2,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 4,
    borderRadius: 30
  },

  jay: {
    flexDirection: "row",
    marginTop: 90
  },

  pickerbutton: {
    backgroundColor: "rgb(179, 7, 127)",

    borderRadius: 20,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    marginTop: 70
  },

  cardfooter: {
    flexDirection: "row",
    width: "100%"
  },

  icon: {
    fontSize: 30
  },

  button: {
    backgroundColor: "rgb(179, 7, 127)",
    width: 40,
    color: "white",
    textAlign: "right",
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    marginTop: 2
  },

  card: {
    height: 360,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 50,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    alignItems: "center"
  },

  imagepreview: {
    width: "100%",
    height: 300,
    marginTop: 0,
    borderRadius: 10,
    marginTop: 3
  }
});

export default AddPost;

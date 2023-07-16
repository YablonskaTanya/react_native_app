import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import avatar from "../../assets/images/avatar.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export default PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  console.log("route :>> ", route);

  useEffect(() => {
    if (route.params) {
      const { photo, photoName, photoLocation } = route.params;
      setPosts((prevState) => [
        ...prevState,
        { photo, photoName, photoLocation },
      ]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.personContainer}>
        <Image style={styles.tinyLogo} source={avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>Natali Romanova</Text>
          <Text style={styles.textEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photo }} style={styles.image} />
              <Text style={styles.contentTitle}>{item.photoName}</Text>
              <View style={styles.feedbackContainer}>
                <View style={styles.feedbackContainerLeftEl}>
                  <View style={styles.feedbackContainerEl}>
                    <FontAwesome
                      name="comment-o"
                      size={24}
                      color="#FF6C00"
                      onPress={() =>
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    />
                  </View>
                </View>
                <View></View>
                <View
                  style={[styles.feedbackContainerEl, styles.localionPosition]}
                >
                  <SimpleLineIcons
                    style={styles.locationIcon}
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                    onPress={() =>
                      navigation.navigate("MapScreen", {
                        location: item.location,
                      })
                    }
                  />

                  <Text style={styles.locationIconTitle}>
                    {item.photoLocation}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 40,
  },

  textName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  textEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },

  image: {
    width: 350,
    height: 200,
    borderRadius: 8,
    backgroundColor: "aqua",
    marginTop: 16,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },

  contentTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginTop: 8,
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  feedbackContainerEl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  localionPosition: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  locationIconTitle: {
    textDecorationLine: "underline",
  },
  feedbackContainerLeftEl: {
    flexDirection: "row",
    gap: 16,
  },
});

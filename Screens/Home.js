import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import app from "../Auth/Auth";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 19.215663141086022,
    longitude: 72.81851929702815,
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const userEmail = auth.currentUser ? auth.currentUser.email : "User";
  const HamburgerName = userEmail.charAt(0).toUpperCase();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") console.log("Permission Denied!");

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(location);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("LogOut Successful");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleToggleSidebar = () => {
    setShowWelcome(!showWelcome);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      {showWelcome && (
        <View style={styles.sidebar}>
          <Text style={styles.emailText}>Welcome, {userEmail}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, styles.toggleButton]}
        onPress={handleToggleSidebar}
      >
        <Text style={styles.buttonText}>{HamburgerName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.locationButton]}
        onPress={getLocation}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "white",
    borderRightWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  emailText: {
    fontSize: 20,
    marginBottom: 20,
  },
  map: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  button: {
    position: "absolute",
    backgroundColor: "grey",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    top: 70,
    left: 20,
  },
  locationButton: {
    top: 150,
    left: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 5,
  },
});

export default Home;

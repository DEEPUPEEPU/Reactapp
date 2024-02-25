import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import app from "../Auth/Auth";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

const Home = ({ navigation }) => {
  const userEmail = auth.currentUser ? auth.currentUser.email : "User";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("LogOut Successful");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Welcome, {userEmail}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emailText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;

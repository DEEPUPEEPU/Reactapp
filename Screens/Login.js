import React, { useState } from "react";
import BgImg from "../assets/bgimg.jpg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Auth/Auth";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);

  const handleLogin = async () => {
    try {
      const signedIn = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = signedIn.user.email;
      if (userEmail.length != 0) {
        navigation.navigate("Home");
      }
      console.log("Login successful");
    } catch (error) {
      console.error("Signup error", error.message);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground source={BgImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Login Screen</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button style={styles.button} title="Login" onPress={handleLogin} />
        <Text style={styles.link} onPress={navigateToSignup}>
          Don't have an account? Signup here
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  link: {
    color: "blue",
    marginTop: 16,
  },
  button: {
    height: 40,
    width: "50%",
    borderWidth: 1,
    backgroundColor: "blue",
    color: "White",
  },
});

export default Login;

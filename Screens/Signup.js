import React, { useState } from "react";
import BgImg from "../assets/bgimg.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import app from "../Auth/Auth";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";

const auth = getAuth(app);

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error", error.message);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground source={BgImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup Screen</Text>
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
        <Button style={styles.button} title="Signup" onPress={handleSignup} />
        <Text style={styles.link} onPress={navigateToLogin}>
          Already have an account? Login here
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

export default Signup;

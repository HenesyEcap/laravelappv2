import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.56.1/api/login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Login Successful', 'Redirecting...');

        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../assets/img/bckph.jpg')} // Replace with your coffee-themed background image
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.inputField}
        />
        <Button title="Login" onPress={handleLogin} color="#4E2A03" />
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  inputField: {
    height: 40,
    width: 250,
    borderColor: '#4E2A03',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#D8C3A5', // Brown background color
  },
  signUpText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4E2A03', // Brown text color
  },
  signUpLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

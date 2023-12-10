import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const RegisterScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.56.1/api/register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          Alert.alert('Registration Successful', data.message);
          // You might want to navigate to the login screen or perform any other action after successful registration
        } else {
          Alert.alert('Registration Failed', data.message);
        }
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while registering.');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate to the 'Login' screen
  };

  return (
    <ImageBackground
      source={require('../assets/img/bckph2.jpg')} // Replace with your lock screen image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.inputField}
        />
        <Button title="Register" onPress={handleRegister} color="#4E2A03" />
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay
  },
  inputField: {
    height: 40,
    width: 250,
    borderColor: '#4E2A03',
    borderWidth: 1,
    marginVertical: 5,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White input field background color
  },
  signInText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4E2A03', // Brown text color
  },
  signInLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;

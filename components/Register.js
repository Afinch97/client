import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function Register({ navigation }) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        username: '',
        email: '',
        password: '',
      }
    });
    const onSubmit = async (user) => {
      console.log(user);
      
      const response = await fetch('http://localhost:3005/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
  
      const data = await response.json();
      console.log(data);

      if (data.status === 'ok') {
        navigation.push('Login')
      }
    };
    console.log(errors);
    return (
      <>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
            />
          )}
          name="username"
        />
        {errors.username && <Text>Username required</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^\S+@\S+\.\S$/i
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && <Text>Email not formatted correctly</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            secureTextEntry={true}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
            />
          )}
          name="password"
        />
        {errors.password && <Text>Password is required</Text>}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <Button title="Login" onPress={() => navigation.push('Login')} />
        <Text>Yo!</Text>
        <StatusBar style="auto" />
      </View>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

 export default Register;
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

function Login({ navigation }) {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        username: '',
        password: '',
      }
    });
    const onSubmit = async (user) => {
      console.log(user);
      console.log(user.username)
      
      const response = await fetch('http://localhost:3005/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
  
      const data = await response.json();
      console.log(data);

      if (data.user) {
        localStorage.setItem('token', data.user)
        navigation.push('Profile')
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
              placeholder="Username or Email"
            />
          )}
          name="username"
        />
        {errors.username && <Text>Username or email required</Text>}
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
        <Button title="Register" onPress={() => navigation.push('Register')} />
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

 export default Login;
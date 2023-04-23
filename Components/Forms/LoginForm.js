import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import  '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth=getAuth()

const LoginForm = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().required().min(8, 'Your password has to have at least 8 characters')
  })
  const onLogin=async(email, password)=>{
    try {
      await signInWithEmailAndPassword(auth,email, password)
      console.log('Login Succes')
    } catch (error) {
      Alert.alert(
        '😿MichiGramer...',
        'The password is invalid or User does not exist' + '\n \n... What would you like to do next👀',
        [{text:'OK',onPress:()=>console.log('OK'), style:'cancel'},{text:'Sign Up',onPress:()=>navigation.push('SignUpScreen')}]
      )
      
    }
  }
  return (
    <View style={Styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          onLogin(values.email,values.password)
         
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleSubmit, handleBlur, isValid, values, errors }) => (
          <>
            <View style={[Styles.inputsField,
            {
              borderColor: values.email.length < 1 || Validator.validate(values.email)
                ? '#ccc'
                : 'red'
            }]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Phone number, username or Email'
                autoCapitalize='none'
                keyboardType='email-adress'
                textContentType='emailAdress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email} />
            </View>

            <View style={[Styles.inputsField,
            {
              borderColor: 1>values.password.length  || values.password.length >= 8

              ? '#ccc'
              : 'red'
            }]}>
              <TextInput
                placeholderTextColor='#444'
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                autoFocus={true}
                secureTextEntry={true} placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password} />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot Password?</Text>
            </View>
            <View>
              <Pressable style={Styles.button(isValid)} titleSize={20} onPress={handleSubmit} disabled={!isValid}>
                <Text style={Styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
            <View style={Styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={()=>navigation.push('SignUpScreen')}>
                <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const Styles = StyleSheet.create({
  inputsField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1
  },
  wrapper: {
    marginTop: 80
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4
  }),
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  }
})

export default LoginForm
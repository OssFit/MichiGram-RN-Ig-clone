import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import {app} from '../../firebase'

const auth=getAuth()
const db=getFirestore(app)

const SignUpForm = ({navigation}) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username:Yup.string().required().min(2,'Username is required'),
    password: Yup.string().required().min(8, 'Your password has to have at least 8 characters')
  })

  const onSignUp=async(email,password,username)=>{
    try {
      const authUser=await createUserWithEmailAndPassword(auth,email,password)

      try {
        const docRef =  await setDoc(doc(db, "users", authUser.user.email), {
            owner_uid:authUser.user.uid,
            username:username,
            email:authUser.user.email,
            profile_picture: await getRandomProfilePicture()
          })
          console.log("Document written with ID: ", authUser.user.email);
    
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      
    } catch (error) {
      Alert.alert('😿MichiGramer'+error.message)
      
    }}

  const getRandomProfilePicture=async()=>{
    const response=await fetch('https://randomuser.me/api')
    const data=await response.json()
    return data.results[0].picture.large
  }

  
  return (
    <View style={Styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '',username:'' }}
        onSubmit={values => {
         onSignUp(values.email,values.password,values.username)
        }}
        validationSchema={SignUpFormSchema}
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
                placeholder='Email'
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
              borderColor:1> values.username.length  || values.username.length>2
                ? '#ccc'
                : 'red'
            }]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Username'
                autoCapitalize='none'
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username} />
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
            {/* <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot Password?</Text>
            </View> */}
            <View>
              <Pressable style={Styles.button(isValid)} titleSize={20} onPress={handleSubmit} disabled={!isValid}>
                <Text style={Styles.buttonText}>Sign up</Text>
              </Pressable>
            </View>
            <View style={Styles.signUpContainer}>
              <Text>Allready an account?</Text>
              <TouchableOpacity onPress={()=>navigation.push('LoginScreen')}>
                <Text style={{ color: '#6BB0F5' }}> Log In</Text>
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

export default SignUpForm
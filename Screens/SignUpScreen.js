import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import SignUpForm from '../Components/Forms/SignUpForm.js'

const SignUpScreen = ({navigation}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image source={require('../assets/logo-white.png')} style={Styles.logo}/>
      </View>
      <SignUpForm navigation={navigation}/>
    </View>
  )
}

const Styles=StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex: 1,
        paddingTop:50,
        paddingHorizontal:12
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60
        
    },
    logo:{
        width:200,
        height:100,
    }
})

export default SignUpScreen
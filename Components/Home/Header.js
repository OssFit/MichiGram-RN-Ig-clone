import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'

const Header = () => {

const handleSignOut=async()=>{
  try {
    await getAuth().signOut()
    console.log('Signed out succesfully')
  } catch (error) {
    console.log(error)
    
  }
}

  return (
    
      <View style={Styles.container}>
        <TouchableOpacity onPress={handleSignOut}>
      <Image style={Styles.logo} source={require('../../assets/logo.png')} />
    </TouchableOpacity>
    <View style={Styles.iconsContainer}>
    <TouchableOpacity>
      <Image style={Styles.icon} source={require('../../assets/corazon.png')} />
    </TouchableOpacity>
    {/* <TouchableOpacity>
      <Image style={Styles.icon} source={require('../../assets/corazon.png')} />
    </TouchableOpacity> */}
    <TouchableOpacity >
        <View style={Styles.unreadBadge}>
            <Text style={Styles.unreadBadgeText}>1</Text>
        </View>
      <Image style={Styles.icon} source={require('../../assets/mensaje.png')} />
    </TouchableOpacity>
   
    </View>
    </View>
  )
}

const Styles= StyleSheet.create({
    iconsContainer:{
        color:'white',
        flexDirection:'row'
    },
    container:{
        paddingTop:40,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20
    },
    logo:{
        width:130,
        height:80,
        resizeMode:'contain'
    },
    icon:{
        width:25,
        height:25,
        marginLeft:10,
        resizeMode:'contain'
    },
    unreadBadge:{
        backgroundColor:'red',
        position:'absolute',
        left:22,
        bottom:18,
        width:15,
        height:12,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        zIndex:100

    },
    unreadBadgeText:{
        position:'relative',
        color:'white',
        fontSize:10,
        fontWeight:600

    }
    
})
export default Header
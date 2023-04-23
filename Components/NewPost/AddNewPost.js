import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from '../NewPost/FormikPostUploader.js'

const AddNewPost=({navigation})=>(
    <View style={Styles.container}>
        <Header navigation={navigation} />
        <FormikPostUploader navigation={navigation} />
    </View>
)

const Header = ({navigation}) => {
  return (
    <View style={Styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('../../assets/left.png')} style={{width:30, height:30}} />
        </TouchableOpacity>
      <Text style={Styles.headerText}>NEW POST</Text>
      <Text></Text>
    </View>
  )
}

const Styles=StyleSheet.create({
    container: {
        margin:15
    },
    headerContainer:{
        marginTop:15,
        paddingRight:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
   },
   headerText:{
    color:'white',
    fontWeight:600

   }
})

export default AddNewPost
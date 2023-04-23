import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../Components/NewPost/AddNewPost.js'

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
  <AddNewPost navigation={navigation} />
    </SafeAreaView>
  )
}

export default NewPostScreen
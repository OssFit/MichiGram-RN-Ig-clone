import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from '@rneui/base';

const home = require('../../assets/home.png');
const homeUn = require('../../assets/home-un.png');
const search = require('../../assets/search-un.png')
const searchUn = require('../../assets/search.png');
const add = require('../../assets/add-un.png')
const addUn = require('../../assets/add.png');
const video = require('../../assets/video-un.png')
const videoUn = require('../../assets/video.png');
const user = require('../../assets/user.jpg')

export const BootomTabsData = [{
  title: 'Home',
  active: home,
  unactive: homeUn
},
{
  title: 'Search',
  active: search,
  unactive: searchUn
},
{
  title: 'Add',
  active: add,
  unactive: addUn
},
{
  title: 'Video',
  active: video,
  unactive: videoUn
},
{
  title: 'User',
  active: user,
  unactive: user
}
]
const BottomTabs = ({ icons, navigation }) => {
  const [activeTab, setActiveTab] = useState('Home')
  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => { 
      setActiveTab(icon.title);
     icon.title==='Add' && navigation.navigate('NewPostScreen')
       }}>
      <Image source={activeTab === icon.title ? icon.active : icon.unactive} style={icon.title !== 'User' ? Styles.icon : { borderRadius: 50, width: 30, height: 30 }} />
    </TouchableOpacity>
  )
  return (
    <View style={{ position: 'absolute', width: '100%', zIndex: 999, bottom: '0%', backgroundColor: 'black' }}>
      <Divider width={0.5} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
        {icons.map((icon, index) => (

          <Icon key={index} icon={icon} />))}

      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  }
})

export default BottomTabs
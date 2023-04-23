import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../Components/Home/Header'
import Stories from '../Components/Home/Stories'
import Post from '../Components/Home/Post'
import BottomTabs from '../Components/Home/BottomTabs'
import { BootomTabsData } from '../Components/Home/BottomTabs'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={Styles.container}>
           <Header />
           <ScrollView>
           <Stories />
            {Datapost.map((post,index)=>(
                
                <Post key={index}post={post} />
            ))}
           </ScrollView>
           <BottomTabs navigation={navigation} icons={BootomTabsData} />
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    }
})

const Datapost = [
  {
    "username": "garfieldlovers",
    "user_photo": "https://cdn2.thecatapi.com/images/mg.png",
    "post_title": "My cat Garfield enjoying the afternoon sun ☀️😻",
    "post_photo": "https://radiomitre-la100-prod.cdn.arcpublishing.com/resizer/V_8cYFYHgBCuH5dHHxaoLy2PY2Y=/1440x0/smart/filters:quality(85):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/radiomitre/CMPQLVSUZJGKHOVAAEKCALO7Y4.jpg",
    "comments": [
      {"username": "sylvesterfan", "comment": "What a beautiful cat! 😍"},
      {"username": "tomcat", "comment": "Reminds me of my cat Tom 😊"},
      {"username": "felixthecat", "comment": "Garfield is my idol 😸"}
    ],
    "likes": "1,005"
  },
  {
    "username": "catlady",
    "user_photo": "https://cdn2.thecatapi.com/images/b0l.jpg",
    "post_title": "The beauty of my cat Persephone's eyes 💜😻",
    "post_photo": "https://www.santevet.es/uploads/images/es_ES/articulos/ojosgato.jpeg",
    "comments": [
      {"username": "garfieldlovers", "comment": "What a lovely kitty 😍"},
      {"username": "tomcat", "comment": "I love the color of her eyes! 😻"},
      {"username": "felixthecat", "comment": "You're so lucky to have Persephone as your cat 😸"}
    ],
    "likes": "7,584"
  },
  {
    "username": "happykitty",
    "user_photo": "https://cdn2.thecatapi.com/images/bko.jpg",
    "post_title": "My happy kitty playing with his mouse 🐭😸",
    "post_photo": "https://vivirmejor.mx/wp-content/uploads/2021/07/gatos-jugando.jpg",
    "comments": [
      {"username": "catlady", "comment": "I love seeing kitties play 😍"},
      {"username": "tomcat", "comment": "Looks like so much fun! 😄"},
      {"username": "sylvesterfan", "comment": "My cat Sylvester also loves playing with mice 😸"}
    ],
    "likes": "13,000"
  }
];

 

export default HomeScreen
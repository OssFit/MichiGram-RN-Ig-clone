import { View, Text, TextInput, Image,Button } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik'
import { Divider } from '@rneui/base';
import validUrl from 'valid-url'
import {getAuth} from 'firebase/auth'
import { app, db } from '../../firebase';
import { collection, where, query, limit, onSnapshot,doc, addDoc,serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'caption has reached this characters')
})
const PLACEHOLDER_IMG = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
const auth=getAuth()
console.log(auth.currentUser);

console.log(auth,app)

const FormikPostUploader = ({navigation}) => {
  const [tumbnailUrl, setTumbnailUrl] = useState(PLACEHOLDER_IMG)
  const [currentLoggedInUser,setCurrentLoggedInUser]=useState(null)
  const getUserName=async()=>{
    try {
      
      if (auth.currentUser) { // check if the user is logged in
        const q = query(
          collection(db, 'users'),
          where('owner_uid', '==', auth.currentUser.uid), // fix the where clause
          limit(1)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docs.map((doc) => {
            setCurrentLoggedInUser({
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            });
          });
        });
        return unsubscribe;
      }
  
    } catch (error) {
      console.log(error.message)
      
    }
    
  }

  useEffect(()=>{
    getUserName()
  
  },[])

  const uploadPostToFirebase = async (imageUrl, caption) => {
    if (auth.currentUser) { // check if the user is logged in
      const userRef = doc(collection(db, "users"), auth.currentUser.email);
      try {
        const postRef = await addDoc(collection(userRef, "posts"), {
          imageUrl: imageUrl,
          user: currentLoggedInUser.username,
          profile_picture: currentLoggedInUser.profilePicture,
          owner_uid: auth.currentUser.uid,
          caption: caption,
          createdAt: serverTimestamp(),
          likes: 0,
          likes_by_users: [],
          comments: [],
        });
        navigation.goBack();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  
  
  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={values => {
        uploadPostToFirebase(values.imageUrl,values.caption)

      
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
              source={{ uri:validUrl.isUri(tumbnailUrl)?tumbnailUrl: PLACEHOLDER_IMG }} style={{ width: 100, height: 100 }} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput 
              style={{ color: 'white', fontSize: 18 }} 
              placeholder='Write a caption...' 
              placeholderTextColor='gray'
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
              multiline={true} />
              
            </View>
          </View>
          <Divider width={0.4} />
          <TextInput 
          onChange={(e)=>setTumbnailUrl(e.nativeEvent.text)}
          style={{ color: 'white', fontSize: 18 }} 
          placeholder='Enter image Url...' 
          placeholderTextColor='gray'
          onChangeText={handleChange('imageUrl')}
          onBlur={handleBlur('imageUrl')}
          value={values.imageUrl} />
          {errors.imageUrl && (
            <Text style={{ color: 'red', fontSize: 10 }}>{errors.imageUrl}</Text>
          )}
          <Button onPress={handleSubmit} title='Share' disable={!isValid} />
        </>
      )}
    </Formik>



  )
}

export default FormikPostUploader
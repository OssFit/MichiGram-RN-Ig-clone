import { View, Text, TextInput, Image,Button } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik'
import { Divider } from '@rneui/base';
import validUrl from 'valid-url'

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'caption has reached this characters')
})
const PLACEHOLDER_IMG = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
const FormikPostUploader = ({navigation}) => {
  const [tumbnailUrl, setTumbnailUrl] = useState(PLACEHOLDER_IMG)
  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={values => {
        console.log(values)
        navigation.goBack()

      
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
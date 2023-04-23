import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Divider } from '@rneui/themed';
const corazon = require('../../assets/corazon.png')
const comments = require('../../assets/comments.png')
const share = require('../../assets/enviar.png')
const save = require('../../assets/icons8-bookmark-24.png')

const Post = ({ post }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Divider color='gray' width={0.5} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter />
      <Likes post={post} />
      <Captions post={post} />
      <CommentsSection post={post} />
      {/* <Comments post={post} /> */}
    </View>
  )
}



const PostHeader = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.user_photo }} style={Styles.story} />
        <Text style={{ color: 'white', fontWeight: 700, marginLeft: 5 }}>{post.username}</Text>
      </View>
      <Text style={{ color: 'white', fontWeight: 900 }}>...</Text>
    </View>
  )
}

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image source={{ uri: post.post_photo }} style={{ height: '100%', resizeMode: 'cover' }} />
  </View>
)

const PostFooter = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row', width: '33%', justifyContent: 'space-between' }}>
      <Icon imgStyle={Styles.footerIcon} imgUrl={corazon} />
      <Icon imgStyle={Styles.footerIcon} imgUrl={comments} />
      <Icon imgStyle={Styles.footerIcon} imgUrl={share} />
    </View>
    <View style={{ flexDirection: 'row-reverse', width: '67%', paddingLeft: 15 }}>
      <Icon imgStyle={Styles.footerIcon} imgUrl={save} />
    </View>

  </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image source={imgUrl} style={imgStyle} />
  </TouchableOpacity>

)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4, marginLeft: 15 }}>
    <Text style={{ color: 'white', fontWeight: 600 }} >{post.likes} likes </Text>
  </View>
)

const Captions = ({ post }) => (
  <View style={{ flexDirection: 'column', marginLeft: 15. }}>
    <Text style={{ color: 'white' }}><Text style={{ fontWeight: 700 }}>{post.username}</Text>
      <Text> {post.post_title}</Text>
    </Text>

  </View>
)

const CommentsSection = ({ post }) => {
  const [hiddenComments, setHiddenComments] = useState(true);

  return (
    <View>
      {!!post.comments.length && (
        <Text
          style={{ color: 'gray', marginLeft: 15 }}
          onPress={() => setHiddenComments(!hiddenComments)}
        >
          {hiddenComments ?(`View ${post.comments.length} ${post.comments.length > 1 ? 'comments' : 'comment'}`):'Hidden Comments'}
        </Text>
      )}

      {hiddenComments ? null : <Comments post={post} />}
    </View>
  );
};

const Comments = ({ post }) => (
  <View>
    {post.comments.map((comment) => (
      <Text style={{ color: 'white', marginLeft: 15 }} key={comment.username}>
        <Text style={{ fontWeight: 700 }}>{comment.username}</Text>
        <Text> {comment.comment}</Text>
      </Text>
    ))}
  </View>
);


const Styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501'
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: 10,
  }

})

export default Post
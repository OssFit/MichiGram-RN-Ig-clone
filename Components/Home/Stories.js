import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

const data = [{ "id": "mg", "url": "https://cdn2.thecatapi.com/images/mg.png", "width": 500, "height": 345 }, { "id": "1lc", "url": "https://cdn2.thecatapi.com/images/1lc.jpg", "width": 446, "height": 500 }, { "id": "at7", "url": "https://cdn2.thecatapi.com/images/at7.jpg", "width": 800, "height": 600 }, { "id": "b0l", "url": "https://cdn2.thecatapi.com/images/b0l.jpg", "width": 446, "height": 500 }, { "id": "bko", "url": "https://cdn2.thecatapi.com/images/bko.jpg", "width": 600, "height": 450 }, { "id": "c69", "url": "https://cdn2.thecatapi.com/images/c69.jpg", "width": 588, "height": 331 }, { "id": "c9i", "url": "https://cdn2.thecatapi.com/images/c9i.jpg", "width": 570, "height": 527 }, { "id": "edj", "url": "https://cdn2.thecatapi.com/images/edj.jpg", "width": 500, "height": 332 }, { "id": "MTUxMjE3MA", "url": "https://cdn2.thecatapi.com/images/MTUxMjE3MA.jpg", "width": 888, "height": 1110 }, { "id": "MTc0Njg1MQ", "url": "https://cdn2.thecatapi.com/images/MTc0Njg1MQ.jpg", "width": 3128, "height": 2346 }]

const Stories = () => {
    return (
        <View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map((cat) => (
                    <View key={cat.id} style={Styles.container}>
                        <Image style={Styles.story} source={{ uri: cat.url }} />
                        <Text style={Styles.name}>{cat.id.length>8?cat.id.slice(0,7)+"...":cat.id}</Text>
                    </View>

                ))}
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#ff8501'
    },
    name: {
        color: 'white',
        textAlign: 'center',
    },
    container: {
       alignItems:'center'
    }
})
export default Stories
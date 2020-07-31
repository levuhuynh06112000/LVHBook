import React, { Component } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image
} from 'react-native';

import Header from '../../components/header';

import {SCREEN_WIDTH} from '../../common';

export default class Home extends Component {
  static navigationOptions = {
    headerShown: false,
   
  }
  constructor(props) {
    super(props);
    this.state={
      post:[
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        },
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2020/04/cBAnYisRGw3zn8uUgp6K_13_811434fc29240609159728de6049090a_avatar_full.png',
          name: 'SEFVI',
          price: '100',
          content: 'jhhjjdsvjv'
        }
      ]
    };
  
  }

  
  render() {
    return (
     <SafeAreaView>
       <Header title="Danh Sách" addBtn flexRow/>
       <FlatList
                    data={this.state.post}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.renderModalView(item)}>
                            <View style={styles.postContainer}>

                                <Image source={{ uri: item.imgUrl }} style={{ width: 100, height: 100 }} />
                                <View style={styles.postItem}>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', padding: 5, fontSize: 18 }}> {
                                        item.name.length < 10
                                            ? `${item.name}`
                                            : `${item.name.substring(0, 20)}...`}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontStyle: 'italic', padding: 5, fontSize: 18 }}> {
                                        item.price.length < 10
                                            ? `${item.price}`
                                            : `${item.price.substring(0, 20)}...`}</Text>
                                    <Text numberOfLines={1} style={styles.postItemText}>
                                        {
                                            item.content.length < 10
                                                ? `${item.content}`
                                                : `${item.content.substring(0, 20)}...`}</Text>
                                </View>
                                {/* <View style={styles.postItemTool}>
                                    <TouchableOpacity style={{ paddingLeft: 20, paddingTop: 5 }} onPress={() => this.props.navigation.navigate('EditPost', {
                                        itemPost: item
                                    })}>
                                        <Ionicons name="md-create" size={24} color="#000"></Ionicons>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingLeft: 20, paddingTop: 5 }} onPress={() => this.renderDelete(item.key)}>
                                        <Ionicons name="md-trash" size={24} color="#000"></Ionicons>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    }
                />
     </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    margin: SCREEN_WIDTH * 3.6 / 187.5,
    padding: SCREEN_WIDTH * 3.6 / 187.5,
    borderRadius: SCREEN_WIDTH * 3.6 / 187.5,
    flexDirection: 'row'
},
postItem: {
    padding: 0
},
postItemText: {
    padding: 5,
    fontSize: 18
},
postItemTool: {
    flexDirection: 'row',
    right: 10,
    position: 'absolute',
    paddingTop: 40
}
})
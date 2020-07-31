import React, { Component } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image
} from 'react-native';

import Header from '../../components/header';

import {SCREEN_WIDTH} from '../../common';

export default class ManageUsers extends Component {
  static navigationOptions = {
    headerShown: false,
   
  }
  constructor(props) {
    super(props);
    this.state={
      post:[
        {
          imgUrl: 'https://cdnsefvi.sefvi.com//upload/photos/2019/08/zTnLkRVHbMqnLWUF75Vf_09_d1138dea565d31ce0fe63e3e34b68a10_avatar_full.jpg',
          name: 'Lâm Văn Thông'
        },
        
      ]
    };
  }
  
  render() {
    return (
     <SafeAreaView>
       <Header title="Quản Lý Người Dùng" addBtn flexRow/>
       <FlatList
                    data={this.state.post}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.renderModalView(item)}>
                            <View style={styles.postContainer}>

                                <Image source={{ uri: item.imgUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                <View style={styles.postItem}>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', padding: 5, fontSize: 18 }}> {
                                        item.name.length < 20
                                            ? `${item.name}`
                                            : `${item.name.substring(0, 25)}...`}</Text>
                                </View>
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
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
});


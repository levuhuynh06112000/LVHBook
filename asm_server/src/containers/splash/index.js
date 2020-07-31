import React, { Component } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar
} from 'react-native';
import Theme from '../../theme';
import {getAuth} from '../../common';



export default class Splash extends Component {
  static navigationOptions = {
    headerShown: false
  }

  async componentDidMount() {
   const auth = await getAuth();
   if (auth) {
     this.props.navigation.navigate('Mains');
   }else{
    this.props.navigation.navigate('Login');
   }
    
    
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Theme.colors.COLOR_DEFAULT} />
        <View>
          <Text style={styles.text}>Quản Lý Sách</Text>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.COLOR_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 32,
    color: Theme.colors.WHITE,
    fontWeight: 'bold'
  }
});
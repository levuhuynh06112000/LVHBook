import React, { Component } from 'react';
import {
  StyleSheet, Text, View, AsyncStorage, TextInput, SafeAreaView, TouchableOpacity, Image, Button
} from 'react-native';
import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import io from "socket.io-client";
import Styles from './styles';
import { BASE_URL, getAuth, setAuth } from '../../../common';
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      progressVisible: false,
      dialogVisible: false,
      dialogTitle: ''
    };


  }
  componentDidMount() {
    this.socket = io(BASE_URL);
  }
  
  handerLogin() {
    const { email, password } = this.state;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length === 0 || password.length === 0) {
      this.setState({
        dialogTitle: 'Không được để trống',
        dialogVisible: true
      });
    } else {

      if (!regEmail.test(email)) {
        this.setState({
          dialogTitle: 'Email không đúng định dạng',
          dialogVisible: true
        });
      } else {
        this.setState({
          progressVisible: true
        });
        this.socket.emit('login', email, password);
        this.socket.on('login', value => {
          switch (value.status) {
            case 200:
              this.setState({
                progressVisible: false
              });
              setAuth(value.data);
              this.props.navigation.navigate('Mains');

              break;
            case 400:
              this.setState({
                progressVisible: false,
                dialogTitle: value.message,
                dialogVisible: true
              });
              break;
            case 500:
              this.setState({
                progressVisible: false,
                dialogTitle: value.message,
                dialogVisible: true
              });
              break;

          }
        })

      }
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={Styles.container}>
        <ConfirmDialog
          title="Thông báo"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({ dialogVisible: false })}
          positiveButton={{
            title: "Đóng",
            onPress: () => this.setState({ dialogVisible: false })
          }} >
          <View>
            <Text>{this.state.dialogTitle}</Text>
          </View>
        </ConfirmDialog>
        <ProgressDialog
          visible={this.state.progressVisible}
          title="Đang đăng nhập"
          message="Vui lòng chờ..."
        />
        <Image style={Styles.logo} source={require('../../../assets/logoPoly.png')} />
        <View style={Styles.inputView} >
          <TextInput
            style={Styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View style={Styles.inputView} >
          <TextInput
            style={Styles.inputText}
            placeholder="Mật khẩu"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })} />
        </View>

        <TouchableOpacity style={Styles.loginBtn} onPress={this.handerLogin.bind(this)}>
          <Text style={Styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={Styles.signUpText}>Tạo tài khoản</Text>
        </TouchableOpacity>

      </SafeAreaView>
    )
  }
}

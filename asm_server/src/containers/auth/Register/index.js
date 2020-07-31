import React, { Component } from 'react';
import {
  Text, View, StatusBar, TextInput, SafeAreaView, TouchableOpacity, ScrollView
} from 'react-native';
import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import io from "socket.io-client";
import Styles from './styles';
import { BASE_URL } from '../../../common';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Tạo tài khoản',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      rePassword: '',
      progressVisible: false,
      dialogVisible: false,
      dialogTitle: ''
    }
  }
  componentDidMount() {
    this.socket = io(BASE_URL);
  }
  handerRegister() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password, name, rePassword } = this.state;
    if (email.length === 0 || password.length === 0 || name.length === 0) {
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
      } else if (password !== rePassword) {
        this.setState({
          dialogTitle: 'Mật khẩu không khớp',
          dialogVisible: true
        });
      } else {
        this.setState({
          progressVisible: true
        });

        this.socket.emit('register', name, password, email);
        this.socket.on('register', (event) => {
          if (event.status === 400) {
            this.setState({
              progressVisible: false,
              dialogTitle: event.message,
              dialogVisible: true
            });
          } else {
            this.setState({
              progressVisible: false
            });
            this.props.navigation.goBack();
          }

        })
      }
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
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
            title="Đang tạo tài khoản"
            message="Vui lòng chờ..."
          />
          <Text style={Styles.logo}>Tạo tài khoản</Text>
          <View style={Styles.inputView} >
            <TextInput
              style={Styles.inputText}
              placeholder="Họ và Tên"
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ name: text })} />
          </View>
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
          <View style={Styles.inputView} >
            <TextInput
              style={Styles.inputText}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={text => this.setState({ rePassword: text })} />
          </View>
          <TouchableOpacity style={Styles.loginBtn} onPress={this.handerRegister.bind(this)}>
            <Text style={Styles.loginText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={Styles.signUpText}>Đã có tài khoản</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </ScrollView>
    )
  }
}

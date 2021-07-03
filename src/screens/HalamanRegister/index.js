import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, ActivityIndicator,  TouchableOpacity,} from 'react-native';
import Nav from '../nav';
import firebase from 'react-native-firebase'
import Route from '../Route/';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation';

import Logo from '../HalamanLogin/logo'
class Register extends Component {
    
constructor(props) {
  super(props);
  this.state = { email: '', password: '', error: ''};
}



handleSignUp = () => {
  this.setState({ error: '', loading: true })
  const { email, password } = this.state

  if( email === '' || password === '' )
  {
    this.setState({error: 'Email dan Password tidak boleh kosong',loading: false })
    return
  }
  
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {

      firebase.auth().currentUser.sendEmailVerification().then(() => {
        alert('Mohon untuk mengaktivasi akun anda');
        this.props.navigation.navigate('Login');
      })
      
    })

    .catch(error => {
          
          let errorCode = error.code
          let errorMessage = error.message;
          
          if (errorCode == 'auth/user-not-found') {
            this.onLoginFailure.bind(this)('Maaf akun tidak ditemukan,{"\n"} Silahkan daftar dahulu')
          } else {
            this.onLoginFailure.bind(this)(errorMessage)
          }
        }
      )
}

onLoginFailure(errorMessage) {
  this.setState({ error: errorMessage, loading: false })

}





  renderButton() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size={"small"} />
        </View>
      )
    } else {
      return (
        <View style={styles.inputWrapper}>
         

            <TouchableOpacity
              style={styles.btntake}
              onPress={this.handleSignUp}>
                    <Text style={{color: 'white', fontSize: 18,
                      fontWeight: "bold",
                      textAlign: 'center',
                      width: 240,
                      
                      }}>Sign Up</Text>
                </TouchableOpacity>


      </View>
      )
    }
  }
    
    render() {
        return (
          <View style={styles.container}>
                <Image
                style={styles.logo}
                source={require('../../assets/Gambar/blood.png')} style={{ height: 100, width: 100}}
              />

              <Logo/>
              <Nav nameOfApp={this.state.nameOfApp}/>
                
                <View style={styles.inputWrapper}>
                        <Text>Email : </Text>
                        <TextInput
                             placeholder="Enter Your email"
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            underlineColorAndroid="transparent"
                        />
                </View>

                <View style={styles.inputWrapper}>
                        <Text>Password : </Text>
                        <TextInput
                             placeholder="Enter Your password"
                            value={this.state.password}
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            underlineColorAndroid="transparent"
                            secureTextEntry
                        />
                </View>



              <Text style={styles.errorTextStyle}>
                  {this.state.error}
                </Text>

               
              {this.renderButton()}

           

          </View>    
                 
        );
    }
}



export default Register;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'

    },
inputWrapper: {
    width: '80%',
    marginBottom: 5
},
input:{
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 5,
    borderRadius: 10
},
errorTextStyle: {
  alignSelf: 'center',
  color: '#c23616',
  fontFamily: 'poppins-bold',
  fontSize: 15
},
btntake: {
  width: 240,
  height: 45,
  borderRadius: 200,
  backgroundColor: "#c23616",
 
  marginLeft: 40,
  alignItems: 'center',
  justifyContent: 'center',
},
});

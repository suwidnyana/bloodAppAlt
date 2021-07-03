import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        TextInput, 
        TouchableOpacity,
        ScrollView,
        ActivityIndicator
        } 
        from 'react-native';

import { Button } from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

import Logo from './logo';
import firebase from 'react-native-firebase';

class Login extends Component {

constructor(props) {
  super(props);
  this.state = { email: '', password: '', error: ''};
}

onButtonPress() {
      this.setState({ error: '', loading: true })
      const { email, password } = this.state;

      if( email === '' || password === '' )
      {
        this.setState({error: 'Email dan Password tidak boleh kosong',loading: false })


        return
      }
      
      firebase.auth().
      signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))

        .catch((error) => {
        
              // alert(JSON.stringify(error))

              let errorCode = error.code
              let errorMessage = error.message;

              if (errorCode == 'auth/user-not-found') {
                this.onLoginFailure.bind(this)('akun tidak ditemukan')
              }
              else if(errorCode == 'auth/wrong-password') {
                this.onLoginFailure.bind(this)('password salah')
              } 
              else 
              {
                this.onLoginFailure.bind(this)(errorMessage)
              }
            
        });


}

onLoginSuccess() {
    let user =  firebase.auth().currentUser
    // alert(JSON.stringify(user));
    
    if(user.emailVerified === false){
      this.onLoginFailure.bind(this)('akun belum aktif')
      return
    }

    this.props.navigation.navigate('ProfileNavigator')
  
}

onLoginFailure(errorMessage) {
  this.setState({ error: errorMessage, loading: false })
  
}

renderButton() {
  if (this.state.loading) {
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  } else {
    return (
      <View style={{width: '80%',
      marginBottom: 50,
     
      }}>
          
        

            <TouchableOpacity
              style={styles.btntake}
              onPress={this.onButtonPress.bind(this)}>
                    <Text style={{color: 'white', fontSize: 18,
                      fontWeight: "bold",
                      textAlign: 'center',
                      width: 240,
                      
                      }}>Sign In</Text>
                </TouchableOpacity>

        </View>
    )
  }
}




  langsungRegister = () => {
    this.props.navigation.navigate("Register");
  };
    
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged( user =>{
      if(user) {
        firebase
        .database()
        .ref('profile')
        .orderByChild('id_user')
        .equalTo(user.uid)
        .once('value', snapshot => {
          console.log(snapshot.exists());
          if(!snapshot.exists()) {
            this.props.navigation.navigate('Login');
            return;
            console.log('User tidak ditemukan');
          }

          const user = Object.values(snapshot.val());

          if(user[0].status == 'tidak_aktif') {
            this.props.navigation.navigate('Login');
            return;
            console.log('User tidak aktif');
          }
        });
      } else {
        console.log(user);
        this.props.navigation.navigate('Login');
        return;
        console.log('Tidak ada user login');
      }
    });
  }
  
    render() {
    
  
        return (
          
          <View style={styles.container}>

          <Image
          style={styles.logo}
          source={require('../../assets/Gambar/blood.png')} style={{ height: 100, width: 100, marginBottom: 10}}
          />

        <Logo/>

              <View style={styles.inputWrapper}>
                      <Text>Email : </Text>
                      <TextInput
                          placeholder="Enter Your email"
                         
                          style={styles.input}
                         
                          value={this.state.email}
                          onChangeText={email => this.setState({ email })}

                          autoCapitalize={"none"}
                          keyboardType={"email-address"}
                          underlineColorAndroid="transparent"
                      />
              </View>

              <View style={styles.inputWrapper}>
                      <Text>Password : </Text>
                      <TextInput
                           placeholder="Enter Your password"
                           style={styles.input}
                           //  type={this.state.form.password.type}
                          //  value={this.state.form.password.value}
                          // onChangeText={value => this.updateInput("password",value)}

                          // value={this.state.password}
                          value={this.state.password}
                          onChangeText={password => this.setState({ password })}

                          secureTextEntry
                          autoCapitalize={"none"}
                          underlineColorAndroid="transparent"
                      />
              </View>

              <Text style={styles.errorTextStyle}>
                  {this.state.error}
              </Text>

              {this.renderButton()}
  
            



       
          <View>

            {/* <Text style={styles.subTitleSplash}>
              Belum Punya Akun Silahkan 
            </Text> */}
          <View style={{width: '100%', 
                      justifyContent: 'center', 
                      alignItems: 'center'
                    }}>

          <TouchableOpacity  onPress={this.langsungRegister}>
              <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                fontSize: 20}}> 
                Belum Punya Akun? {"\n"} 
               Daftar
                </Text>
            </TouchableOpacity>

          </View>

          </View>

        
        


      </View>    
        );
    }
}



export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
},
inputWrapper: {
    width: '80%',
    marginBottom: 5,
    borderRadius: 20
},
input:{
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 5,
    borderRadius: 20
},
errorTextStyle: {
  alignSelf: 'center',
  color: '#c23616',
  fontFamily: 'poppins-bold',
  fontSize: 15
},
spinnerStyle: {

  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around'
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

subTitleSplash: {
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 20,
  marginTop: 20,
  color: "#c23616",
  fontFamily: 'poppins-bold',
},
});

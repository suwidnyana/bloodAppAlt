import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        TextInput, 
        TouchableOpacity,
        ScrollView,
        ActivityIndicator,
        Button
        } 
        from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationEvents} from 'react-navigation';

import Logo from './logo';
import firebase from 'react-native-firebase';

class Splash extends Component {

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
    
    if(user.emailVerified === false){
      this.onLoginFailure.bind(this)('akun belum aktif')
      return
    }
    this.props.navigation.navigate('BottomNavigator')
  
}

onLoginFailure(errorMessage) {
  this.setState({ error: errorMessage, loading: false }.then 
    
    )
  
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
      marginBottom: 5,
      borderRadius: 20,
      }}>
          
          <Button
          icon={
              <FontAwesome5
              name="sign-in-alt"
              size={20}
              color="white"
              />
              

          }
          iconRight
            title="Login"
            color="#c23616"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
    )
  }
}



  
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

  checkUserProfile = () => {
    
  }

  langsungLogin = () => {
    this.props.navigation.navigate("Login");
  };

    render() {
        return (
          <View style={styles.mainBody}> 
            <NavigationEvents onDidFocus={() => this.checkUserProfile()} />
              
                <Image style={styles.Image} source={require("../../assets/Gambar/splash.png")}/>
         
                <Text style={styles.titleSplash}>
                   Blood Help
                </Text>

                <Text style={styles.subTitleSplash}>
                    Membantu menghubungkan orang {"\n"}
                    yang membutuhkan darah dengan {"\n"} pendonor di sekitar mereka
                </Text>

              <TouchableOpacity
              style={styles.btntake}
              onPress={this.langsungLogin}>
                    <Text style={styles.textbtn}>Next</Text>
                </TouchableOpacity>

             

        </View>
         
        );
    }
}



export default Splash;


const styles = StyleSheet.create({

 mainBody: {
    marginTop: 10,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 70,
 },
 titleSplash: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 40,
    marginTop: 20,
    color: "#37CED8",
    fontFamily: 'poppins-bold',
 },
 subTitleSplash: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
    color: "#37CED8",
    fontFamily: 'poppins-bold',
 },
 btntake: {
    width: 240,
    height: 45,
    borderRadius: 200,
    backgroundColor: "#37CED8",
    marginTop: 30,
    marginLeft: 70,
    alignItems: 'center',
    justifyContent: 'center',
 },
 Image: {
     width: 300,
     height: 350,
     marginLeft: 25,
     marginTop: 40,
    
 },
 textbtn: {
     color: "white",
     fontSize: 18,
     fontWeight: "bold",
     textAlign: 'center',
     width: 240,
 }
});

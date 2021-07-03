import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity,Picker, ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Nav from '../nav';
import firebase from 'react-native-firebase'
import { db,auth } from '../../config';
let profileRef = db.ref('profile');

class ProfileShow extends Component {
    
    state = {
        nameOfApp:"Halaman Profile",
        nama:'',
        alamat:'',
        goldar:'',
        goldar2:null,
        error:'',
        allowPost: false,
        profiles: []
       
      
      }
     
      static navigationOptions={
        header: null
      }


      handleInput = (key, value) => {
        this.setState({...this.state,[key]:value})
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        
        // profileRef.orderByChild('id_user').equalTo(user.uid).once('value', (snapshot) => {
        //   let profile = Object.values(snapshot.val());
  
        //   this.setState({ profiles: profile });
        // });
    }

    checkUserProfile = () => {
      let user = firebase.auth().currentUser;
      profileRef.orderByChild('id_user').equalTo(user.uid).once('value', (snapshot) => {
        if(snapshot.exists()) {
          let profiles = Object.values(snapshot.val());

          this.setState({ profiles });
        } else {
          this.props.navigation.navigate('ProfileNavigator')
        }
      });
    }

    onValueChange = (goldar2) => {
        this.setState({
          goldar2: goldar2
        });
      }


      simpan(){

        const { nama, alamat,goldar2, error } = this.state;

        if( nama === '' || alamat === '' || goldar2 === '' )
        {
            this.setState({error: 'Field tidak boleh kosong',loading: false })
            return
        }

            let user = firebase.auth().currentUser;

            firebase.database().ref('profile/' + user.uid).update({
                nama: this.state.nama,
                alamat: this.state.alamat,
                goldar2: this.state.goldar2,
                status: 'aktif', 
               
            }).then(() => 
            {
                this.setState({
                    nama:'',
                    alamat:'',
                  
                    goldar2: ''
                })
                alert('data tersimpan');
                this.props.navigation.navigate('Profile')
            });
    }


    logOut(){
        firebase.auth().signOut().then(() => this.props.navigation.navigate('WelcomeNavigator'))
        alert('anda telah keluar')
    }

    EditProfile = () => {
      this.props.navigation.navigate("UpdateProfile");
    }
        render() {
            return (
                 
            <View> 
                <NavigationEvents onDidFocus={() => this.checkUserProfile()} />   
                {this.state.profiles.length > 0 ? this.state.profiles.map((profile) => (
                  
                  <View>
                  <View style={styles.header}></View>
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.name}>{profile.nama}</Text>
                      <Text style={styles.info}>{profile.alamat}</Text>
                      <Text style={styles.description}>Golongan Darah : {profile.goldar2}</Text>
                      
                      <TouchableOpacity 
                      onPress={this.EditProfile}
                      style={styles.buttonContainer}>
                        <Text style={{
                          color: 'white', fontSize: 18,
                          fontWeight: "bold",
                          textAlign: 'center',
                          width: 240
                        }}>Edit Profile</Text>  
                      </TouchableOpacity>  

                      <TouchableOpacity 
                       onPress={this.logOut.bind(this)}
                      style={styles.buttonContainer}>
                        <Text style={{
                          color: 'white', fontSize: 18,
                          fontWeight: "bold",
                          textAlign: 'center',
                          width: 240
                        }}>Logout</Text> 
                      </TouchableOpacity>

                    </View>
                </View>
              </View>
            
      
                  )) : (
              
        
              <View>
                  <Text>
                  SUWIDNYANA
                  </Text>
                 


              </View>
         
                )}
             </View>
        
      
            );
        }
}

export default ProfileShow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    header:{
        backgroundColor: "#00BFFF",
        height:200,
        
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
        
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#c23616",
      },
    
});

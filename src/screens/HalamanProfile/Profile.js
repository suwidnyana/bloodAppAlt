import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity,Picker, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Nav from '../nav';
import firebase from 'react-native-firebase'

import { db,auth } from '../../config';

let profile = db.ref('/profile');

class Profile extends Component {
    
    state = {
        nameOfApp:"Halaman Profile",
        nama: '',
        alamat:'',
        no_telepon:'',
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

    onValueChange = (goldar2) => {
        this.setState({
          goldar2: goldar2
        });
      }

      componentDidMount() {
       
            let user = firebase.auth().currentUser;
           
            firebase
              .database()
              .ref('profile')
              .orderByChild('id_user')
              .equalTo(user.uid)
              .on('value', snapshot => {
              if(snapshot.val()) {
                let data = snapshot.val();
                let profiles = Object.values(data);
                this.setState({ profiles });
              }
            });
    }


simpan(){

        const { nama, alamat,goldar2,error, no } = this.state;

        if( nama === '' || alamat === '' || no === ''|| goldar2 === '' )
        {
            this.setState({error: 'Field tidak boleh kosong',loading: false })
            return
        }

            let user = firebase.auth().currentUser;

            firebase.database().ref('profile/' + user.uid).set({
                nama: this.state.nama,
                alamat: this.state.alamat,
                no_telepon: this.state.no_telepon,
                goldar2: this.state.goldar2,
                status: 'aktif', 
                id_user: user.uid //hidden
            }).then(() => 
            {
                // this.setState({
                //     nama: '',
                //     alamat:'',
                //     goldar:''
                // })
                // alert('data tersimpan');

                this.props.navigation.navigate('BottomNavigator');
            });
    }

    
    
      logOut(){
          firebase.auth().signOut().then(() => this.props.navigation.navigate('WelcomeNavigator'))
          alert('anda telah keluar')
      }

      EditProfile = () => {
        this.props.navigation.navigate("UpdateProfile");
      };
    



    render() {
      
    
        return (

            
                <View style={styles.container}> 
                          
                      {this.state.profiles.length > 0 ?
                       
                       
                       (
                      
                      this.props.navigation.navigate("BottomNavigator")
                      
                      )
                        
                    
                        : 
                        
                        
                        
                        (
                    
              
                    <View style={styles.container}>
                            <Image
                            style={styles.logo}
                            source={require('../../assets/Gambar/hand.png')} style={{ height: 100, width: 100}}
                            />
                        <Nav nameOfApp={this.state.nameOfApp}/>


                        <View style={styles.inputWrapper}>
                                        <Text>Nama : </Text>
                                        <TextInput
                                            value={this.state.permintaan}
                                            style={styles.input}
                                            onChangeText={(text) => this.handleInput('nama',text) }
                                            underlineColorAndroid="transparent"
                                        />
                        </View>
                                

                        <View style={styles.inputWrapper}>
                                        <Text>Alamat : </Text>
                                        <TextInput
                                            value={this.state.alamat}
                                            style={styles.input}
                                            onChangeText={(text) => this.handleInput('alamat',text) }
                                            underlineColorAndroid="transparent"
                                        />
                        </View>

                        <View style={styles.inputWrapper}>
                                        <Text>No Telepon : </Text>
                                        <TextInput
                                            value={this.state.no_telepon}
                                            style={styles.input}
                                            onChangeText={(text) => this.handleInput('no_telepon',text) }
                                            underlineColorAndroid="transparent"
                                        />
                        </View>

                        <View style={styles.inputWrapper}>
                                    <Picker
                                    
                                    selectedValue={ (this.state.goldar2) }
                                    onValueChange={this.onValueChange}>
                                    
                                    
                                    <Picker.Item label="Blood Group" value="null" />
                                    <Picker.Item label="A+" value="A+" />
                                    <Picker.Item label="A-" value="A-" />
                                    <Picker.Item label="B+" value="B+" />
                                    <Picker.Item label="B-" value="B-" />
                                    <Picker.Item label="AB+" value="AB+" />
                                    <Picker.Item label="AB-" value="AB-" />
                                    <Picker.Item label="O+" value="O+" />
                                    <Picker.Item label="O-" value="O-" />
                                </Picker>
                                
                        </View>


                        <Text style={styles.errorTextStyle}>
                                    {this.state.error}
                        </Text>



                      <View style={{flexDirection: 'row'}}>
                            
                            <View>
                                <TouchableOpacity  onPress={this.simpan.bind(this)}>
                                    <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                                    fontSize: 20}}>Simpan</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
               
                      )}
                   </View>
              

        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

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
    containerProfile: {

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
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
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

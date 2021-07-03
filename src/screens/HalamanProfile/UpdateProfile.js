import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity,Picker, ScrollView} from 'react-native';
import Nav from '../nav';
import firebase from 'react-native-firebase'

class UpdateProfile extends Component {
    
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
        title : "Update Profile"
      }
  


      handleInput = (key, value) => {
        this.setState({...this.state,[key]:value})
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
                this.props.navigation.navigate('ProfileShow')
            });
    }


   

        render() {
            return (
                <View  style={styles.container}>
                 
                        <Image
                            style={styles.logo}
                            source={require('../../assets/Gambar/hand.png')} style={{ height: 100, width: 100}}
                            />


                        <Nav nameOfApp={this.state.nameOfApp}/>


                        <View style={styles.inputWrapper}>
                                        <Text>Nama : </Text>
                                        <TextInput
                                            value={this.state.nama}
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

                            {/*                         
                            <View style={{marginLeft: 40}}>
                                <TouchableOpacity  onPress={this.logOut.bind(this)}>
                                    <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                                    fontSize: 20}}>Logout</Text>
                                </TouchableOpacity>
                            </View> */}

                        </View>

                </View>
      
            );
        }
}

export default UpdateProfile;

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
});

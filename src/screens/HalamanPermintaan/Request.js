import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, AlertIOS, TouchableOpacity,Picker} from 'react-native';

import axios from 'axios'
import firebase from 'react-native-firebase'
import Nav from '../nav';
import { db,auth } from '../../config';
import moment from "moment";
let request = db.ref('/profile');
class Request extends Component {

    state = {
        permintaan: '',
        tempat: '',
        detail:'',
        allowPost: false,
        godlar:'',
        nameOfApp:"Halaman Request",
        requests: [],
        currentDate: new Date(),
        markedDate: moment(new Date()).format("YYYY-MM-DD")
    }

componentDidMount() {
    // let user = firebase.auth().currentUser;
    
    // console.log(user.uid)
    // firebase
    //     .database()
    //     .ref('profile')
    //     .orderByKey()
    //     .equalTo(user.id_user)
    //     .on('value', (snapshot) => {
    //         this.setState({ allowPost: snapshot.val() ? true : false });
    //     });



    let user = firebase.auth().currentUser;
    console.log(user.uid);
    // console.log(user)
    request.orderByChild('id_user').equalTo(user.uid).on('value', snapshot => {
      if(snapshot.val()){
        let data = snapshot.val();
        let requests = Object.values(data);
      this.setState({ requests });
      console.log(requests);
      }
    });
  
}

handleInput = (key, value) => {
this.setState({...this.state,[key]:value})
}


renderFormRequest = () => {

    return this.state.allowPost === true ? (
        
        <View style={styles.container}>

            <Image
            style={styles.logo}
             source={require('../../assets/Gambar/blood2.png')} style={{ height: 100, width: 100}}
           />
          <Nav nameOfApp={this.state.nameOfApp}/>

            <View style={styles.inputWrapper}>
            <Text>Permintaan : </Text>
            <TextInput
                value={this.state.permintaan}
                style={styles.input}
                onChangeText={(permintaan) => this.handleInput('permintaan',permintaan)}
                underlineColorAndroid="transparent"
            />
        </View>


    <View style={styles.inputWrapper}>
        <Text>Tempat : </Text>
        <TextInput
            value={this.state.tempat}
            style={styles.input}
            onChangeText={(text) => this.handleInput('tempat',text)}
            underlineColorAndroid="transparent"
        />
    </View>

    <View style={styles.inputWrapper}>
        <Text>Detail : </Text>
        <TextInput
            value={this.state.detail}
            style={styles.input}
            onChangeText={(text) => this.handleInput('detail',text)}
            underlineColorAndroid="transparent"
        />
    </View>


    <View style={styles.inputWrapper}>
                      <Picker
                      
                      selectedValue={ (this.state.goldar) }
                      onValueChange={this.onValueChange}>
                      
                      <Picker.Item label="Golongan Darah" value="null" />
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

                <TouchableOpacity  onPress={this.addPost}>
                    <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                    fontSize: 20}}>Kirim</Text>
                </TouchableOpacity>

        <Text style={styles.errorTextStyle}>
                    {this.state.error}
                    </Text>
        </View>
    

    ) : (
        <Text>Anda harus melengkapi profile terlebih dahulu</Text>
    ); 
    
}

addPost = () => {

    const { permintaan, tempat,detail,error } = this.state;

        if( permintaan === '' || tempat === '' || detail === '' )
        {
            this.setState({error: 'Field tidak boleh kosong',loading: false })
            return
        }

    // const URL = `https://simplecrudreact-2a7a3.firebaseio.com/post.json`
    // axios({
        
    //     method:"POST",
    //     url:URL,
    //     data:this.state
    // }).then(response => {
    //     alert('data terkirim')
    //     this.setState({
    //          permintaan: '',
    //         tempat: '',
    //         detail:''
    //     })
    // });

    let user = firebase.auth().currentUser;

    const today = this.state.currentDate;
    const day = moment(today).format("dddd");
    const date = moment(today).format("MMMM D, YYYY");
        
        
    let request = firebase.database().ref('post').push({
        permintaan: this.state.permintaan,
        tempat: this.state.tempat,
        detail: this.state.detail,
        id_user: user.uid,
        goldar: this.state.goldar,
        status: 'belum_diterima',
        date: date,
        day: day,
        today: today
    });
    this.setState({
        permintaan: '',
        tempat: '',
        detail:'',
        goldar:'',
    })
    alert('Permintaan terkirim')
    axios.post('https://fcm.googleapis.com/fcm/send', 
    {
       
          "notification" : {
            "body" : "Dibutuh Donor Segera!!",
            "title" : "Permintaan Darah"
            },
            "to" : "/topics/Donor"
         
    },
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=AIzaSyDgcX_gGLG6veXo3ivjJW9GrielmQlBUJM",
        }
    }).then(() => {
        let now = new Date();
        let time = now.getHours()+':'+now.getMinutes()

        const today = this.state.currentDate;
        const day = moment(today).format("dddd");
        const date = moment(today).format("MMMM D, YYYY");

        firebase.database().ref('profile').on('value',(snapshot) => {
            // let date = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDay();

            let profiles = Object.values(snapshot.val());
            
            profiles.map((profil) => {
                if(profil.id_user !== user.uid) {
                    firebase.database().ref('notification').push({
                
                        id_user: profil.id_user,
                        body : "This is a Firebase Cloud Messaging Topic Message!",
                        title : "Dibuutuhkan donor segera!",
                        date: date,
                        day: day,
                        today: today,
                        type: 'request',
                        id_requester: user.uid,
                        id_post: request.key

                    })

                }
            })
        })
    })
    // then(response => alert(response.data))
}

onValueChange = (goldar) => {
    this.setState({
      goldar: goldar
    });
  }

  
    render() {

        const today = this.state.currentDate;
        const day = moment(today).format("dddd");
        const date = moment(today).format("MMMM D, YYYY");

        return (
           



        <View style={styles.container}> 
                          
            {this.state.requests.length > 0 ? this.state.requests.map((request) => (
              
              <View style={styles.container}>

              <Image
              style={styles.logo}
               source={require('../../assets/Gambar/blood2.png')} style={{ height: 100, width: 100}}
             />
            <Nav nameOfApp={this.state.nameOfApp}/>
  
              <View style={styles.inputWrapper}>
              <Text>Permintaan : </Text>
              <TextInput
                  value={this.state.permintaan}
                  style={styles.input}
                  onChangeText={(permintaan) => this.handleInput('permintaan',permintaan)}
                  underlineColorAndroid="transparent"
              />
          </View>
  
  
      <View style={styles.inputWrapper}>
          <Text>Tempat : </Text>
          <TextInput
              value={this.state.tempat}
              style={styles.input}
              onChangeText={(text) => this.handleInput('tempat',text)}
              underlineColorAndroid="transparent"
          />
      </View>
  
      <View style={styles.inputWrapper}>
          <Text>Detail : </Text>
          <TextInput
              value={this.state.detail}
              style={styles.input}
              onChangeText={(text) => this.handleInput('detail',text)}
              underlineColorAndroid="transparent"
          />
      </View>
  
  
      <View style={styles.inputWrapper}>
                        <Picker
                        
                        selectedValue={ (this.state.goldar) }
                        onValueChange={this.onValueChange}>
                        
                        <Picker.Item label="Golongan Darah" value="null" />
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

                      
                  <TouchableOpacity  onPress={this.addPost}>
                      <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                      fontSize: 20}}>Kirim</Text>
                  </TouchableOpacity>
  
         
          </View>

              )) : (
          
          
                <View>
                        <Text>Isi data dulu</Text>
                    </View>

            )}
      </View>
        );
    }
}

export default Request;

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

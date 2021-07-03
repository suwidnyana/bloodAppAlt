import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import { Button } from 'react-native-elements';
import axios from 'axios'
class itemInbox extends Component{
    
    state={
        profile: {},
      }
      

        terimaRequest = () => {
          let notification = this.props.navigation.getParam('notification');
          
          firebase
            .database()
            .ref('post/' + notification.id_post)
            .on('value', (snapshot) => {

              if (snapshot.val().status == 'sudah_diterima') {
                alert('Request ini sudah ada yang menerima.');
                return;
              } else {
                let user = firebase.auth().currentUser;
                
                firebase.database().ref('post/' + notification.id_post).update({
                  status: 'sudah_diterima',
                  id_penerima: user.uid
                }).then(() => {
                  alert('Request telah diterima')
                  firebase
                    .database()
                    .ref('profile')
                    .orderByChild('id_user')
                    .equalTo(notification.id_requester)
                    .on('value', (snapshot) => {
                      let profile = Object.values(snapshot.val());
                      let now = new Date()
                        let date = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDay()
                        firebase.database().ref('notification').push({
              
                          id_user: profile[0].id_user,
                          body : "Request sudah diterima",
                          title : "Request sudah diterima",
                          date: now,
                          type: 'reguler',
                      })
                      axios.post('https://fcm.googleapis.com/fcm/send', 
                      {
                        
                            "notification" : {
                              "body" : "Request diterima",
                              "title" : "Request diterima"
                              },
                              "to" : profile[0].token
                          
                      },
                      {
                          headers: {
                              "Content-Type": "application/json",
                              "Authorization": "key=AIzaSyDgcX_gGLG6veXo3ivjJW9GrielmQlBUJM",
                          }
                      });
                    });
                });
              }
            });
        }
  
        componentDidMount(){
       
        }
      render() {
         let notification = this.props.navigation.getParam('notification')
         return (

           <View style={styles.itemList}>
               <Text>{notification.title}</Text>
               <Text>{notification.body}</Text>
               <Text>{notification.date}</Text>
               {
                 notification.type == 'request' ? (
                  <TouchableOpacity  onPress={this.terimaRequest}>

                      <Text style={{ color: '#c23616', fontFamily: 'poppins-bold',
                      fontSize: 20}}>Terima</Text>
                      
                  </TouchableOpacity>
                 ) : null
               }
           </View>
           
         );
    }
}

export  default itemInbox;

const styles = StyleSheet.create({
  itemsList: {
    borderWidth: 1
  },
  itemtext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
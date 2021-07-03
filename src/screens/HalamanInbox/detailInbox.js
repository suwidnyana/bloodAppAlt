import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import { db,auth } from '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';



let itemsRef = db.ref('/notification');
class detailInbox extends Component{
    
    state={
        profile: {},
        notifications: [],
      }
      
      static navigationOptions={
          title : "Halaman Detail Inbox"
        }
  
        componentDidMount() {
            let user = firebase.auth().currentUser;
            console.log(user.uid);
            // console.log(user)
            itemsRef.orderByChild('id_user').equalTo(user.uid).on('value', snapshot => {
              if(snapshot.val()){
                let data = snapshot.val();
                let notifications = Object.values(data);
              this.setState({ notifications });
              console.log(notifications);
              }
            });
          }
     

          __getCompletedIcon = (item) => {
            if(item.completed == 1) {
              return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
            } else {
              return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
            }
          }
        
          __getDescriptionStyle = (item) => {
            if(item.completed == 1) {
              return {textDecorationLine:"line-through", fontStyle:'italic', color:"#808080"};
            }
          } 

      render() {

      return (
        <ScrollView>
          <View style={styles.container}>
            
            <View style={styles.tasks}> 
            <View>
            {this.state.notifications.length > 0 ? this.state.notifications.map((notification) => (
                
                <TouchableWithoutFeedback
                  key={notification.id_post}
                  onPress={() =>  this.props.navigation.navigate('itemInbox',{
                      notification
                })}>

                      {
                          notification.type == 'request' ? (
                            <View style={styles.card}>
                             <Image style={styles.image} source={{uri: "https://img.icons8.com/flat_round/64/000000/delete-sign.png" }}/>
                              <View style={styles.cardContent}>
                                  <Text style={styles.itemtext}>{notification.title}</Text>
                                  <Text  style={styles.itemtext}>{notification.body}</Text>
                                  <Text style={styles.date}>{notification.date}</Text>
                                  <Text style={styles.itemtext}>{notification.type}</Text>
                                  <Text style={styles.itemtext}>Ini Belum Diterima </Text>
                              </View>
                            </View>
                          ) 
                          : 
                        <View style={styles.card}>
                           <Image style={styles.image} source={{uri: "https://img.icons8.com/flat_round/64/000000/checkmark.png" }}/>
                          <View style={styles.cardContent}>
                              <Text style={styles.itemtext}>{notification.title}</Text>
                              <Text  style={styles.itemtext}>{notification.body}</Text>
                              <Text style={styles.date}>{notification.date}</Text>
                              <Text style={styles.itemtext}>{notification.type}</Text>
                              <Text style={styles.itemtext}>Permintaan Anda Sudah Diterima</Text>
                          </View>
                        </View>
                        }

                </TouchableWithoutFeedback>

                )) : (
                  <View style={styles.itemtext}>
                    <Text style={{fontSize:20}}>Tidak ada pesan notifikasi</Text>
                  </View>
              )}
              </View>
              </View>
        </View>

        
        </ScrollView>
      );
    }
}

export  default detailInbox;

const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop:20,
      backgroundColor:"#eeeeee"
    },
    tasks:{
      flex:1,
    },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize:18,
    flex:1,
    color:"#008080",
    fontWeight:'bold',
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:6,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  date:{
    fontSize:14,
    flex:1,
    color:"#696969",
    marginTop:5
  },
  image:{
    width:25,
    height:25,
  },
});
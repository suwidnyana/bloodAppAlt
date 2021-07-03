import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'

class detailComponent extends Component{

    state={
      profile: {},
    }
    static navigationOptions={
        title : "Halaman Detail"
      }

      componentDidMount(){
        let postDetail = this.props.navigation.getParam('post') 

        firebase
          .database()
          .ref('profile')
          .orderByChild('id_user')
          .equalTo(postDetail.id_user)
          .on("child_added", (snapshot) => {
            this.setState({ profile: snapshot.val() });
          });
      }
    render() {
        let postDetail = this.props.navigation.getParam('post') 
    return (
      <View style={{flexDirection: 'row', margin: 24}}>
      <View style={{ flex: 1, backgroundColor: 'red', alignSelf: 'flex-end',borderRadius: 10 }}>
          <Text style={styles.itemtext}>Permintaan : {postDetail.permintaan}</Text>
          <Text style={styles.itemtext}>Tempat : {postDetail.tempat}</Text>
          <Text style={styles.itemtext}>Detail : {postDetail.detail}</Text>
          <Text style={styles.itemtext}>Status : {postDetail.status}</Text>
          <Text style={styles.itemtext}>Yang Meminta : {this.state.profile.nama}</Text>
      </View>
    </View>

    );
  }
}


export  default detailComponent;

const styles = StyleSheet.create({
  itemtext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'poppins-bold'
  }
});
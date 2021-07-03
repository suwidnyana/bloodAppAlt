import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import Nav from '../nav';
import { db,auth } from '../../config';
import firebase from 'react-native-firebase'
import DetailInbox from './detailInbox'



class Inbox extends Component {
    state = {
        nameOfApp:"Halaman Inbox",
        
      }

      static navigationOptions={
        title : "Halaman Inbox"
      }
    render() {
        return <DetailInbox navigation={this.props.navigation}/>
    }
}

export default Inbox;

const styles = StyleSheet.create({
    

});

import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView} from 'react-native';

import { db } from '../../config';

import Notifications from '../../notifications/Notifications';

import ItemComponent from './itemComponent';

let itemsRef = db.ref('/post');

class Dashboard extends Component {

  static navigationOptions={
    title : "Halaman Utama"
  }
    state = {
        post:[]
      }

      componentDidMount() {

        itemsRef.orderByChild('status').equalTo('belum_diterima').on('value',snapshot => {
          if(snapshot.val()){
            let data = snapshot.val();
          let post = Object.values(data);
          this.setState({ post });
          }
        });
      }
      
    render() {
        return (
           <ScrollView>
             <Notifications />
            
            
            <View>
                {this.state.post.length > 0 ? 
                (
                  <ItemComponent post={this.state.post} navigation={this.props.navigation} />
                  ) 
                      
                      : 
                      
                  (
                  <View style={styles.container}>
                      <Text style={styles.font}>Tidak ada permintaan</Text>
                  </View>
                  
                  )}

         </View>
         </ScrollView>
        );
    }
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      },

    font: {
      fontFamily: 'poppins-bold',
      fontSize: 14,

    }
});

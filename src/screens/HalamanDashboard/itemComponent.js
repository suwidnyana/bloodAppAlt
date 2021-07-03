import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class ItemComponent extends Component {
  static propTypes = {
    post: PropTypes.array.isRequired
  };

  

  render() {
    return (
      <View style={styles.container}>
        {
            this.props.post.map((post,index) => 
            {
          return (
            
            <View key={index}>
              
                <TouchableWithoutFeedback
                style={styles.card}
                  onPress={() =>  this.props.navigation.navigate('detailComponent',{
                    post: post
                  })}
                  >
                    <View style={{flexDirection: 'row', margin: 24}}>
                        <Image
                        
                        // source={{ uri: 'https://www.dike.lib.ia.us/images/sample-1.jpg/image' }}
                        // source={require('../../assets/Gambar/blood.png')} 
                        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                        style={styles.image}
                        />
                        
                        <View style={{ marginLeft: 10, paddingRight: 10 }}>
                          <Text style={styles.itemtext}>{post.detail}</Text>
                          <Text style={styles.itemtext}> 
                            <FontAwesome5
                              style={{ paddingRight: 10 }}
                              name="map-marker-alt"
                              size={24} />
                              {post.tempat}
                          </Text>
                          <Text style={styles.itemtext}>Golongan Darah : {post.goldar}</Text>
                          <Text>{Moment(post.today).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
          );
        }
        )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 20,
   
    textAlign: 'left',
    color: 'white',
    fontFamily: 'poppins-bold',
    
    flex:1,
    color:"#3399ff",
   
  },
  container: {
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7",
    borderRadius: 50
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius: 10
  },
  image: {
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:4,
    borderColor: "black",
    borderColor:"#ebf0f7"
  },
  cardContent: {
      marginLeft:20,
      marginTop:10
   
  }
});
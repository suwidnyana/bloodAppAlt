import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

const Nav =(props) => (
    <View>
        <Text style={styles.text}>{props.nameOfApp}</Text>
    </View>
)

const styles = StyleSheet.create({
    text: {
        fontFamily: 'poppins-bold',
        fontSize: 20
      }
});

export default Nav;
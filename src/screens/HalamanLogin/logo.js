import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View, 
        Animated,
        Easing,
        ActivityIndicator, Keyboard, KeyboardAvoidingView,
        } 
        from 'react-native';

import Nav from '../nav';

class Logo extends Component {


    state = {
        bloodAnim: new Animated.Value(0),
        appAnim: new Animated.Value(0)
    }

    componentWillMount(){
        Animated.sequence([
            Animated.timing(this.state.bloodAnim,{
                toValue:1,
                duration:1000,
                easing:Easing.easeOutCubic
            }),
            Animated.timing(this.state.appAnim,{
                toValue:1,
                duration:500,
                easing:Easing.easeOutCubic
            })
        ]).start(() =>{
           
        })
    }

render() {
    return(
        <View>
            <View style={styles.logoStyle}>
                <Animated.View
                    style={{
                        opacity: this.state.bloodAnim,
                        top: this.state.bloodAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,0]
                        })
                    }}
                >
                    <Text style={styles.blood}>Blood</Text>
                </Animated.View>

                <Animated.View style={{
                    opacity:this.state.appAnim
                }}>
                    <Text style={styles.app}>App</Text>
                </Animated.View>
            </View>
        </View>
    );
}




}

export default Logo;

const styles = StyleSheet.create({
    logoStyle: {
        flexDirection: 'row'
    },
    blood: {
        fontFamily: 'poppins-bold',
        fontSize: 20,
        color: '#c23616'
      },
    app:{
        fontFamily: 'poppins-bold',
        fontSize: 20
    }
});
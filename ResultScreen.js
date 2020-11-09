import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ImageBackground } from 'react-native';
import {Header} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

export default class ResultScreen extends React.Component{
    constructor(){
        super()
        this.state={
        
        }
    }
    render(){
        return(
            <View>
                <Text> Your Score is :{this.props.navigation.getParam('score')}/10</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
    
   },
   
   showScore:{
       marginBottom:400,
       marginLeft:400,
       color:'green',

   }

  })
  
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ImageBackground } from 'react-native';
import {Header} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

const apiUrl='https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple'

export default class QuestionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            currentQuestion:0,
            Loading:false,
            questionsArray:[],
            options:[],
            correctAnswer:'',
            score:''
        }

    }

    nextQuestion(selectAnswer){
      if(this.state.correctAnswer===selectAnswer){
      console.log('correct')
      var score=this.state.score
      this.setState({
        score
      })
      //var cQ=this.state.currentQuestion 
      //cQ=cQ+1 
    }
      else{
        console.log('incorrect')
        var cQ=this.state.currentQuestion 

        //cQ=cQ+1
        if(cQ<this.state.questionsArray.length){
          const options=this.state.question[currentQuestion].incorrect_answer
          const correctAnswer=this.state.question[currentQuestion].correct_answer
          options.push(correctAnswer)
          this.setState({
            currentQuestion,
            options,
            correctAnswer
          })
        }
        else{
          this.props.navigation.navigate('ResultScreen',{score:this.state.score})
        }
      }

    }

    async fetchQuestions(){
        return fetch(apiUrl)
        .then((response)=>{
          response.json()
          .then((responseJson)=>{
            console.log(responseJson)
            const options=responseJson.results[this.state.currentQuestion].incorrect_answers
            const correctAnswer=responseJson.results[this.state.currentQuestion].correct_answer
            options.push(correctAnswer)

            this.setState({
                Loading:true,
                questionsArray:responseJson.results,
                options:options,
                correctAnswer:correctAnswer
            })
          })
        })
    }

    componentDidMount(){
        this.fetchQuestions()
    }

    render(){
        if(this.state.Loading==false){
return(                <View><Text style={{marginTop:40, marginRight:300}}>Loading ...</Text></View>
        )
}
        else{
           return(
            <ScrollView>
            <View >
        <Text >Question :{this.state.questionsArray[this.state.currentQuestion].question}</Text>
              <View>
                <TouchableOpacity style={styles.myButton} onPress={()=>{this.nextQuestion(this.state.options[0])}}><Text >{this.state.options[0]}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.myButton} onPress={()=>{this.nextQuestion(this.state.options[1])}}><Text >{this.state.options[1]}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.myButton} onPress={()=>{this.nextQuestion(this.state.options[2])}}><Text >{this.state.options[2]}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.myButton} onPress={()=>{this.nextQuestion(this.state.options[3])}}><Text >{this.state.options[3]}</Text></TouchableOpacity>
              </View>
            </View>
            </ScrollView>
        )
    }
}
}


const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
    
   },
   questionContainer:{
     color:'black',
     marginHorizontal:600,
     marginVertical:40
   },
   answerContainer:{
    color:'green',
    marginHorizontal:600,
    marginVertical:40
  },
  questionText:{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
   
  },
  answerText:{
   color:'yellow',
   fontSize:1
  },

  myButton:{
   backgroundColor:'blue',
   paddingVertical:15,
   marginHorizontal:600,
    marginVertical:40
  },

  })
  
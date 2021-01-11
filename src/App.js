import './App.scss';
import React from 'react';

class App extends React.Component {

  state = {
    petition: "",
    question: "",
    ansMode: false,
    count: 0,
    answer: "",
    displayAnswer: false,
    loader: false,
    lastAnswer: null
  };


  handleChange(event) {
    console.log(event);
    const { petition, question, ansMode, count, answer } = this.state;
    const PETITION = ['S', 'a', 'r', 'v', 'a', 'g', 'y', 'a', 'n', 'i', ' ', 'p', 'l', 'e', 'a', 's', 'e', ' ', 't', 'e', 'l','l',''];
    console.log({ ansMode, answer });
    if (event.nativeEvent.data != null) {
      if (event.target.value ) {
        if(count < PETITION.length)
        if (event.nativeEvent.data == ".") {
          this.setState({
            ansMode: !ansMode
          }, () => {
            let val = petition + PETITION[count];
            if(val != undefined){
              this.setState({
                petition: val,
                count: count + 1
              })
            }
          })
        }
        else {
          if (ansMode) {
            let val = petition + PETITION[count];
            this.setState({
              petition: val,
              count: count + 1,
              answer: answer + event.nativeEvent.data
            })
          }
          else {
            this.setState({ petition: event.target.value, count: count + 1 });
          }
        }
      }
      else {
        this.setState({
          petition: "",
          ansMode: false,
          count: 0,
          answer: "",
          displayAnswer: false,
          loader: false,
          question: ""  
        })
      }
    } else {
      this.setState({
        petition: "",
        ansMode: false,
        count: 0,
        answer: "",
        displayAnswer: false,
        loader: false,
        question: ""
      })
    }
}

    showAnswer =  async() => {
      const GYAN = [
        "Its time to mediate, I will answer later.",
        "Looks like you are trying my knowledge, I don't trust you",
        "Life is also a question my friend, somethings dont have answer!",
        "I don't like your attitude while asking this question",
        "Someone in the room doesn't believe me, I am not answering",
        "This is not a good time to answer this question",
        "Stars are not align right now, please try later!",
        "Devil is coming, I will answer you later",
        "Don't try to test me, I will burn you to death",
        "You are a good question but your question hurts me",
        "Too many questions, I m tired now",
        "You are asking too many question, Please give me some rest",
        "I don't want to answer this question",
        "I think there is glitch in the matrix",
        ];
      this.setState({
        loader: true
      });
      if(this.state.answer.length)
        await this.timeout(this.getRndInteger(3000,5000)); //for 1 sec delay
      else
        await this.timeout(7000); //for 1 sec delay
      if (this.state.answer.length){
          this.setState({
            displayAnswer: true,
            loader: false
          })
        }
        else{
          let index = this.getRndInteger(0, GYAN.length - 1);
        if (index == this.state.lastAnswer)
            if(index == GYAN.length-1)
              index--;
            else
              index++;
            
          let answer = GYAN[index]
          this.setState({
            answer,
            displayAnswer: true,
            loader: false,
            lastAnswer : index
          })
        }

    }

    timeout = (delay) => {
  return new Promise(res => setTimeout(res, delay));
}

getRndInteger = (min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min;
}

    handleChangeAnswer(event){
      this.setState({
        question: event.target.value
      })
    }

    render(){
      const { petition, question, answer, displayAnswer, loader } = this.state;
      console.log({displayAnswer});
      return (
        <div className="underlay-photo">


          <div className="underlay-black"></div>
          <form className="login-form">
            <input type="text" className="login-username" autoFocus="true" required="true" onChange={(e) => this.handleChange(e, 'petition')} value={petition} placeholder="Petition" />
            <input type="text" className="login-password" required="true" onChange={(e) => this.handleChangeAnswer(e, 'question')} value={question} placeholder="Your Question" />
          </form>
          <a href="#" className="login-forgot-pass">SarvaGyani</a>
          <input type="button" name="submit" value="Answer" onClick={() => this.showAnswer()} className="login-submit" disabled={!petition || !question || displayAnswer} />
          {
            loader ?
              <center>
                <div className="loader">Searching...</div>
              </center>
               : <></>
          }

          {
            displayAnswer ?
              <center>
                <p className="heading">{answer}</p>
              </center>
              : <></>
          }
        </div>
      );
    }
  }

  export default App;

import './App.scss';
import React from 'react';
import Modal from 'react-modal';

class App extends React.Component {

  componentDidMount(){
    console.info("Don't try to debug me, You will get nothing");
  }
  
  //INTIALIZE ALL THE STATE
  state = {
    petition: "",//FOR PETITION
    ansMode: false,//TOGGLE TO CHECK ANSWER MODE IS ON OR OFF
    count: 0,//COUNT TO CHECK THE NUMBER OF INPUT ADDED BY THE USER
    answer: "",//ANSWER OF THE QUESTION
    displayAnswer: false,// TOGGLE TO DISPLAY ANSWER
    loader: false,// TOGGLE TO DISPLAY LOADER
    lastAnswer: null,// VARIBALE TO SAVE LAST DISPLAYED ANSWER (RANSDON ONE)
    PETITION :['S', 'a', 'r', 'v', 'a', 'g', 'y', 'a', 'n', 'i', ' ', 'p', 'l', 'e', 'a', 's', 'e', ' ', 't', 'e', 'l', 'l', ''],
    modalIsOpen: false
  };
  
  
  //FUNCTION TO HANDLE THE INPUT OF PETITION
  handleChange(event) {
    const { ansMode, count, answer, PETITION } = this.state;
    console.log({answer,ansMode,count});
    if (event.nativeEvent.data != null && event.target.value) {//CHECK IF SOME KEY PRESSED OR NOT AND IF PETITION IS EMPTY OR NOT
      if (count < PETITION.length)// CHECK IF PETION LENGTH IS NOT MORE THEN ORIGINAL PETITION
      if (event.nativeEvent.data === ".") {//CHECK IF . IS PRESSED
        this.setState({//TOGGLE ANSWER MODE
          ansMode: !ansMode
        }, () => {
          this.setDefaultPetition();//SET DEFAULT PETITION
        })
      }
      else {
        if (ansMode) {//IF ANSWER MODE IS ON
          this.setDefaultPetition();//SET DEFAULT PETITION
          this.setState({//ADD ANSWER 
            answer: answer + event.nativeEvent.data
          })
        }
        else {//SET NORMAL KEY BEHAVIOUR
          this.setState({ petition: event.target.value, count: count + 1, showAnswer: false});
        }
      }
    }
    else {
      this.clearData();//CLEAR FULL DATA
    }
  }
  
  
  //FUNCTION TO SET DEFAULT PETITION STRING IF . IS PRESSES OR IF ANSWER MODE IS ON
  setDefaultPetition = () => {
    const { petition, count, PETITION } = this.state;
    
    //ADD CHAR FROM THE RIGHT POSITION TO PETITION
    let val = petition + PETITION[count];
    if (val !== undefined) {
      this.setState({
        petition: val,
        count: count + 1
      })
    }
  }
  
  //FUNCTION TO CLEAR DATA OF PAGE
  clearData = () => {
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
  
  //FUNCTION TO SHOW ANSWER
  showAnswer = async () => {
    const { answer, question } = this.state;
    
    window.analytics.track("At work", {
        question: question,
        answer: answer
      });;
    
    const GYAN = [//RANDOM STRINGS TO USE WHEN NO ANSWER IS PRESENT
      "Its time to meditate, I will answer later.",
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
    //START LOADER
    this.setState({
      loader: true
    });
    if (answer.length){//IF ANSWER IS PRESENT
      await this.timeout(this.getRndInteger(3000, 5000)); //ADD RANDOM DELAY OF 3 TO 5 SEC FOR LOADER
      this.setState({
        displayAnswer: true,
        loader: false,
        petition: "",
        question: ""
      })
    }
    else{//IF ANSWER IS NOT PRESENT
      await this.timeout(7000); //ADD DELAY OF 7 SEC FOR LOADER
      let index = this.getRndmAnswerIndex(GYAN.length);//GET THE ANSWERS INDEX TO SHOW
      let answer = GYAN[index];
      this.setState({
        answer,
        displayAnswer: true,
        loader: false,
        lastAnswer: index,
        petition: "",
        question: ""
      })
    }
  }
  
  
  //FUNCTION TO GET THE INDEX ON RANDOM ANSWER
  getRndmAnswerIndex = (gyanLength) =>{
    const {lastAnswer} = this.state;
    let index = this.getRndInteger(0, gyanLength - 1);
    if (index === lastAnswer ){
      if (index === gyanLength - 1){
        return index--;
      }
      else{
        return index++;
      }
    }
    else{
      return index;
    }
  }
  
  //FUNCTION TO ADD DELAY
  timeout = (delay) => {
    return new Promise(res => setTimeout(res, delay));
  }
  
  //FUNCTION TO GET RANDOM INTEGER
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  //FUNCTION TO HANDLE CHANGE IN QUESTION
  handleChangeQuestion(event) {
    this.setState({
      question: event.target.value,
      showAnswer: false
    })
  }
  
  toggleModal = () => {
    this.setState({
      modalIsOpen : ! this.state.modalIsOpen
    })
  }
  
  render() {
    const { petition, question, answer, displayAnswer, loader, modalIsOpen } = this.state;
    
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        background: 'black',
        color: 'white',
        height: '100%'
      }
    };

    const howToUse = (
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => this.toggleModal()}
        contentLabel="Example Modal"
      >
        <center>
          <img className="logo" src="logoMain.jpeg"></img>
          <h1 style={{ color: 'red' }}>Sarvagyani</h1>
          <h3 style={{ color: 'red'}}>How to use?</h3>
        <br /><br />
          <h4 style={{ color: 'white' }}>
          The formula to enter the request is by writing:
          "Sarvagyani please tell". Press 'Tab' to go to the question textbox.
          Please keep a friendly and positive language. When your question is ready, press 'Tab' & 'Enter'.
          Wait for a while and you will see the answer.</h4>
          </center>
          <ul>
          <li>You can't use mouse controls. Use <strong>'tab'</strong> to navigate.</li>
            <li>You can't use Sarvagyani on mobile. Use a laptop only.</li>
          </ul>
          <center>
          <h3 onKeyPress={() => this.toggleModal()} tabindex="1" style={{ color: 'green', textDecoration: 'underline' }}>Let's Play</h3>
          </center>
      </Modal>
    );
    
    return (
      <div className="underlay-photo">
        {howToUse}
        <center>
        <img  className="logo" src="logoMain.jpeg"></img>
        <h1 style={{color: 'red'}}>Sarvagyani</h1>
          </center>
        <form className="login-form">
          <input type="text" className="petition" tabindex="1" autoFocus={true} onChange={(e) => this.handleChange(e)} value={petition} placeholder="Request" />
          <input type="text" className="question" tabindex="2" onChange={(e) => this.handleChangeQuestion(e)} value={question} placeholder="Ask Question" />
        </form>
        <input type="button" name="submit" value="Answer" tabindex="3" onClick={() => this.showAnswer()} className="showAnswer" disabled={!petition || !question || displayAnswer} />
        <div className="footer-title">Sarvagyani © 2021<br /><a tabindex="4" onKeyPress={() => this.toggleModal()} className="howToUse">How to use?</a></div>
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

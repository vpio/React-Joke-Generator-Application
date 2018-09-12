import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './css/singleJoke.css'
import './img/white-arr.png'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class SingleJoke extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      joke: [],
      activateLasers: 0,
      laserStatus: 'inactive',
      buttonText: 'Get New Joke',
      arrows: 'off',
      punchLine: 'punchLineOff'

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPunch = this.showPunch.bind(this)
  }

  componentWillReceiveProps(){
    this.setState({punchLine: this.props.display})
  }

showPunch(e){
  this.state.punchLine === 'punchLineOff' ? this.setState({punchLine: 'punchLineOn'}) :
  this.setState({punchLine: 'punchLineOff'})
  //this.setState({punchLine: 'punchLineOff'})
  //this.setState({punchLine: undefined})
  //console.log(this.state.punchLine)
}

async getJokeServer(){
  let {data} = await axios('/joke_api').catch(err => console.log(err.message));
  console.log(data)
   this.setState({joke: data});
   console.log(this.state.joke)
}

  async componentDidMount(){
    // console.log('component did mount!')
    await this.getJokeServer();
  }

  async getJokeServerOnSubmit(){
    let {data} = await axios(`/joke_api`)
    let joke = data
    this.setState( { activateLasers: this.state.activateLasers + 1, joke, punchLine: 'punchLineOff'} )
    //console.log(this.state.activateLasers)
    //console.log(this.state.punchLine)
    if((this.state.activateLasers +1) % 5 === 0){
      this.setState( {buttonText: 'Activate Lasers', arrows: 'arrowOn'} )
    }
    else{ this.setState( {buttonText: 'Get New Joke', arrows: 'off'} )}

    if(this.state.activateLasers % 5 === 0){
      this.setState( {laserStatus: 'active', arrows: 'off'})
    }
    else{ this.setState( {laserStatus: 'inactive'} )}
  }







  handleSubmit(e){
    console.log('handle submit called')
    e.preventDefault()
    this.getJokeServerOnSubmit()

  }






moneyBagsFilter(){
  console.log(this.state.joke)
  console.log('moneyBagsFilter called')
  let type = this.props.money
  return this.state.joke.filter(j => {
    return type === j.type}).map(j => {
       let something =
       <div className = "jokesMap">
         <li key = {j.id}>{j.setup}</li>
         <div className = "punchLineDiv">
           {console.log('this is the display')}
           {console.log(this.state.punchLine)}
           <li id='yay' className ={this.state.punchLine} >{j.punchline}</li>
         </div>
       </div>
       return something
     })
   }



chooseOneJoke(){


  let array = this.moneyBagsFilter()
  // if (array.length === 0) {
  //
  // }

  console.log('This is the array that we will get a joke from')
  console.log(array)
  let oneJoke = array[0]
  // console.log(oneJoke)
  return oneJoke
}





  render(){



    return(






//This div encompasses the entire page itself.
      <div className = "entireJokePage">
        {console.log('yo tommy')}
        {console.log(this.state.punchLine)}
        {console.log('rendered singlejoke component to page')}
{/*This div encompasses the Joke display section as well as the hidden message. */}
          <div className = "jokeView" id= {this.state.laserStatus} >
            <div>
              <h1 className = {this.state.laserStatus}><img src="https://vignette.wikia.nocookie.net/roblox/images/3/31/Dancing_Banana.gif/revision/latest?cb=20180323041445" height="80px" width= "80px"></img>  PARTY TIME!  <img src="https://vignette.wikia.nocookie.net/roblox/images/3/31/Dancing_Banana.gif/revision/latest?cb=20180323041445" height="80px" width= "80px"></img></h1>
            </div>
            <div className = "jokeDisplay">
              <ul className="jokes">{this.chooseOneJoke()}</ul>
            </div>
          </div>





{/*This div encompasses the Get New Jokes button and the disappearing arrows that follow*/}
          <div className = "buttonAndArrowsTogether">

            <div className = "getJokesButton">
              <div>
            <Button onClick={(ev) => {this.showPunch(ev); ev.stopPropagation();}} type = "button" id="blue" variant="outlined"  className="button">
                  <span role="img" id="fist" aria-label="fist">👊🏼</span>
                </Button>
              </div>
              <div className = "bottomButton">
                <form onSubmit={this.handleSubmit}>
                  <Button type = "submit" id="red" variant="outlined"  className="button">
                    {this.state.buttonText}
                  </Button>
                </form>
                <div className = "arrows">
                    <img className ={this.state.arrows} id="arrow1" src="/static/media/white-arr.5270f056.png" alt="arrow"/>
                    <img className ={this.state.arrows} id="arrow2" src="/static/media/white-arr.5270f056.png" alt="arrow" />
                    <img className ={this.state.arrows} id="arrow3" src="/static/media/white-arr.5270f056.png" alt="arrow" />
                    <img className ={this.state.arrows} id="arrow4" src="/static/media/white-arr.5270f056.png" alt="arrow" />
                    <img className ={this.state.arrows} id="arrow5" src="/static/media/white-arr.5270f056.png" alt="arrow" />
                </div>
              </div>

            </div>

          </div>





      </div>
    )
  }
}

export default withStyles(styles)(SingleJoke);

import React from 'react';

var quotesArray;

function randomizeInteger(min, max) {
  	if(max == null) {
    	max = (min == null ? Number.MAX_SAFE_INTEGER : min);
      	min = 0;
    }

    min = Math.ceil(min);  // inclusive min
    max = Math.floor(max); // exclusive max

  	if(min > max - 1) {
    	throw new Error("Incorrect arguments.");
    }

    return min + Math.floor((max - min + 1) * Math.random());
}

function changeColor() {
  let hue=randomizeInteger(0,360);
  let lightness=randomizeInteger(75,100);
  let randomColor=`hsl(${hue},100%,${lightness}%)`
  document.body.style.background = randomColor;
  let button=document.getElementById("new-quote");
  let text = document.getElementById("text");
  let author= document.getElementById("author");
  button.style.backgroundColor=randomColor;
  text.style.color=randomColor;
  author.style.color=randomColor;
  return false;
}


class QuoteGenerator extends React.Component{
  constructor(props){
    super(props);
    this.state={
			quote:{quote:'Loading',author:'Loading'}
    }
    this.handleNewQuote=this.handleNewQuote.bind(this);
  }

	componentDidMount(){
		let req = new XMLHttpRequest();
		req.onload = ((e)=>{
			quotesArray= JSON.parse(e.target.response);
			quotesArray=quotesArray.quotes;
   	  this.setState(()=>({quote:quotesArray[randomizeInteger(0,101)]}));
		});
		req.open("get","https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",true)
		req.send();
	}

  handleNewQuote(){
    changeColor();
    this.setState(()=>({quote:quotesArray[randomizeInteger(0,101)]}));
  }

  render(){
    return(
      <div id="quote-box">
       <q id="text">{this.state.quote.quote}</q>
        <address id="author">- {this.state.quote.author}</address>
       <button className="btn" id="new-quote" onClick={this.handleNewQuote}>New quote</button>
      </div>
    );
  }
}

export default QuoteGenerator;

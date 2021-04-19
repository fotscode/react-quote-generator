import React from 'react';
import ReactDOM from 'react-dom';
import QuoteGenerator from './components/QuoteGenerator';

class MyApp extends React.Component{

	render(){
		return(
			<div id="myApp">
				<QuoteGenerator />
			</div>
		);
	}
}

ReactDOM.render(<MyApp />,document.getElementById("quote-container"));

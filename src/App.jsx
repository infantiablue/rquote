import React from "react";
import Quote from "./components/Quote";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: false,
			quote: {},
		};
		this.getQuote = this.getQuote.bind(this);
	}
	getQuote() {
		fetch("https://api.quotable.io/random")
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					loading: false,
					quote: data,
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({ error: true });
			});
		if (!this.state.error) return true;
		else return false;
	}
	componentDidMount() {
		this.getQuote();
	}

	render() {
		return <Quote quote={this.state.quote} getQuote={this.getQuote} loading={this.state.loading} />;
	}
}

export default App;

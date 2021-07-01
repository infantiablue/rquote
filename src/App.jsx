import React from "react";
import Quote from "./components/Quote";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bg: "",
			loading: true,
			error: false,
			quote: {},
		};
		this.getQuote = this.getQuote.bind(this);
		this.getBg = this.getBg.bind(this);
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
		this.getBg();
		if (!this.state.error) return true;
		else return false;
	}
	bgLoader(elmId, urlImg) {
		var loaded = false;
		var image = new Image();
		return new Promise((resolve, reject) => {
			image.onload = () => {
				loaded = true;
				var div = document.getElementById(elmId);
				div.style.backgroundImage = `linear-gradient(to bottom,rgba(245, 246, 252, 0) 45%,rgb(0, 0, 0) 100%), url(${urlImg})`;
				resolve(loaded);
				image.onerror = reject;
			};
			image.src = urlImg;
		});
	}
	getBg() {
		const CLIENT_ID = "vqB0rEMq_DTvsbn0DNypYL7Gd5mxK93hN-hugxOkGiU";
		let search_query = "nature";
		let vm = this;
		fetch(`https://api.unsplash.com/photos/random/?client_id=${CLIENT_ID}&query=${search_query}&orientation=landscape`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ bg: data.urls.regular });
			})
			.then(() => {
				this.bgLoader("zen", this.state.bg).then((loaded) => {
					loaded ? console.log("successfully loaded bg img") : console.log("failed bg img");
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	componentDidMount() {
		this.getQuote();
	}

	render() {
		return <Quote quote={this.state.quote} getQuote={this.getQuote} loading={this.state.loading} />;
	}
}

export default App;

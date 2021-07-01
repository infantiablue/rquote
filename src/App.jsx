import React from "react";
import Quote from "./components/Quote";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bg: "",
			photoAuthor: "Andreas Gücklhorn",
			photoLocation: "Lake Brienz, Switzerland",
			photoUrl: "https://unsplash.com/@draufsicht",
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
		const CLIENT_ID = "8jnntJCl884l1hEMSLnI4guBKvdmp4hjytTAD20GNfs";
		let search_query = "nature";
		let vm = this;
		fetch(`https://api.unsplash.com/photos/random/?client_id=${CLIENT_ID}&query=${search_query}&orientation=landscape`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					bg: data.urls.regular,
					photoLocation: data.location.title,
					photoAuthor: data.user.name,
					photoUrl: data.user.links.html,
				});
			})
			.then(() => {
				this.bgLoader("zen", this.state.bg).then((loaded) => {
					loaded ? console.log("successfully loaded bg img") : console.log("failed bg img");
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({ error: true });
			});
	}
	componentDidMount() {
		this.getQuote();
	}

	render() {
		return (
			<div id='zen' className='container mx-auto subpixel-antialiased'>
				<Quote quote={this.state.quote} getQuote={this.getQuote} loading={this.state.loading} />
				<div id='photo-credits' className='flex justify-between px-12 text-white pt-24'>
					<div id='photo-author' className='text-left'>
						<p className='italic'>Credit</p>
						<p>
							<a href={this.state.photoUrl}>{this.state.photoAuthor}</a>
						</p>
					</div>
					<div id='photo-location' className='text-right'>
						<p>{this.state.photoLocation}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

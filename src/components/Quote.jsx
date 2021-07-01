import React, { useState } from "react";
import "../assets/Quote.scss";
import "animate.css";

function Quote({ quote, getQuote, loading }) {
	let [audioPlay, setAudioPlay] = useState(false);

	function toggleMusic() {
		let audio = document.getElementsByTagName("audio")[0];
		audio.paused ? audio.play() : audio.pause();
		setAudioPlay(!audioPlay);
	}

	return (
		<div className='flex justify-center'>
			<div id='quote-box' className='p-6 bg-gray-100 shadow-md bg-opacity-50 rounded-lg'>
				{loading ? (
					<h2 className='animate__animated animate__flash animate__slow animate__infinite'>Loading</h2>
				) : (
					<>
						<div id='text' className='text-gray-700 text-center py-10 leading-10 text-3xl italic'>
							{quote.content}
						</div>
						<div id='author' className='text-right'>
							{quote.author}
						</div>
						<div id='quote-footer' className='flex justify-between mt-5'>
							<div id='share' className='text-left'>
								<button className='btn'>
									<a id='tweet-quote' target='blank' href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote.content} - ${quote.author}" via @infantiablue`}>
										<i className='fab fa-twitter'></i>
									</a>
								</button>
							</div>
							<div>
								<button onClick={toggleMusic} className='btn'>
									{audioPlay ? <i className='fas fa-lg fa-pause' /> : <i className='fas fa-lg fa-play' />}
								</button>
								<audio loop>
									<source src='https://storage.googleapis.com/wordcy_quote-authors/music/zen.mp3' type='audio/mpeg' />
								</audio>
							</div>
							<div id='new-quote' className='text-right'>
								<button onClick={getQuote} className='btn'>
									<i className='fas fa-sync-alt'></i>
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Quote;

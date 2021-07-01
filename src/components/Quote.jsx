import React from "react";
import "../assets/Quote.scss";
import "animate.css";

function Quote({ quote, getQuote, loading }) {
	return (
		<div id='zen' className='container mx-auto px-4 subpixel-antialiased'>
			<div className='flex justify-center'>
				<div id='quote-box' className='p-6 bg-yellow-100 rounded-lg'>
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
									<button className='bg-blue-400 px-3 py-2 rounded-md text-white'>
										<a id='tweet-quote' target='blank' href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.content} - ${quote.author}"`}>
											<i className='fab fa-twitter'></i>
										</a>
									</button>
								</div>
								<div id='new-quote' className='text-right'>
									<button onClick={getQuote} className='bg-blue-400 px-3 py-2 rounded-md text-white'>
										<i className='fas fa-sync-alt'></i>
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<footer> </footer>
		</div>
	);
}

export default Quote;

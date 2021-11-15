import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
require('dotenv').config();
const api = process.env.REACT_APP_API_KEY;

export const MainMovieDetail = () => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [poster, setPoster] = useState('');
	const [plot, setPlot] = useState('');
	const [actors, setActors] = useState('');
	const [genre, setGenre] = useState('');
	const [release, setRelease] = useState('');
	const [director, setDirector] = useState('');
	let { imdbID } = useParams();

	useEffect(async () => {
		fetchMovieDetails();
	}, []);

	async function fetchMovieDetails() {
		try {
			setLoading(true);
			let result = await axios.get(
				`https://www.omdbapi.com/?apikey=${api}&i=${imdbID}&type=movie`
			);
			setTitle(result.data.Title);
			setPoster(result.data.Poster)
			setPlot(result.data.Plot);
			setActors(result.data.Actors);
			setDirector(result.data.Director);
			setGenre(result.data.Genre);
			setRelease(result.data.Released);
			console.log(result)
		} catch (e) {
			console.log(e);
		}
	}

	return (
	<div className="SearchContainer">
		<div className="SearchContainerBox">
		<h1>{title}</h1>
		<img alt={title} src={poster}/>
		<h3 id='plot'>Plot: <br/>{plot}</h3>
		<h3>Actors: <br/>{actors}</h3>
		<h3>Director: {director}</h3>
		<h3>Genre: {genre}</h3>
		<h3>Release Date: {release}</h3>
		<Link to='/'>
		<button style={{ cursor: 'pointer' }}>Go Back</button>
		</Link>
		</div>
	</div>
	)
	
};

// export default MainMovieDetail;

// efbef9a0

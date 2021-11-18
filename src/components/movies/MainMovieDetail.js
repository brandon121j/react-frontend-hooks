import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

	const notifyFailed = (input) =>
		toast.error(`${input}`, {
			position: 'top-center',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const notifySuccess = () =>
		toast.success('Movie added to favorite!', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	async function fetchMovieDetails() {
		try {
			setLoading(true);
			let result = await axios.get(
				`https://www.omdbapi.com/?apikey=${api}&i=${imdbID}&type=movie`
			);
			setTitle(result.data.Title);
			setPoster(result.data.Poster);
			setPlot(result.data.Plot);
			setActors(result.data.Actors);
			setDirector(result.data.Director);
			setGenre(result.data.Genre);
			setRelease(result.data.Released);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	}

	async function addToFavorites() {
		if (localStorage.getItem('loginToken') === null) {
			notifyFailed('Please login');
		} else {
			let decodedToken = jwt.verify(
				localStorage.getItem('loginToken'),
				process.env.REACT_APP_JWT_SECRET
			);

			try {
				let payload = await axios.post(
					'http://localhost:3001/movies/add-favorite',
					{
						title: title,
						moviePoster: poster,
						imdbLink: `https://www.omdbapi.com/?apikey=${api}&i=${imdbID}`,
						userID: decodedToken.userID,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
						},
					}
				);
				console.log(payload);
				notifySuccess('Movie added to favorites');
			} catch (e) {
				console.log(e);
				notifyFailed(e.response.Error);
			}
		}
	}

	return (
		<div className="SearchContainer">
			<div className="SearchContainerBox">
				<h1>{title}</h1>
				<img alt={title} src={poster} />
				<h3 id="plot">
					Plot: <br />
					{plot}
				</h3>
				<h3>
					Actors: <br />
					{actors}
				</h3>
				<h3>Director: {director}</h3>
				<h3>Genre: {genre}</h3>
				<h3>Release Date: {release}</h3>
                <button id='favoriteButton' style={{ cursor: 'pointer' }} onClick={addToFavorites}>
						Add Favorite
					</button>
				<div className="buttonContainer">
					<Link to="/">
						<button style={{ cursor: 'pointer' }}>Go Back</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

// export default MainMovieDetail;

// efbef9a0

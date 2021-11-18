import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwt } from 'jsonwebtoken';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import CheckToken from '../hooks/CheckToken';
require('dotenv').config();



const { checkJwtToken } = CheckToken();

export function MainMovie() {
    let navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [error, setError] = useState('');
	const startingSearch = [
		'Superman',
		'lord of the rings',
		'batman',
		'Pokemon',
		'Harry Potter',
		'Star Wars',
		'Avengers',
		'Terminator',
	];
	const random = Math.floor(Math.random() * startingSearch.length);
	const api = process.env.REACT_APP_API_KEY;

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifySuccess = () => toast.success('Movie added to favorite!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

	useEffect(async () => {
        if (checkJwtToken()) {
            navigate('/sign-in')
        } else {
            fetchMovies();
        }
	}, []);

	async function fetchMovies() {
		try {
			setLoading(true);
			// Map through with another array with movie id,
			let result = await axios.get(
				`https://www.omdbapi.com/?apikey=${api}&s=${startingSearch[random]}&type=movie`
			);
			// console.log(result)
			let idArray = result.data.Search.map((item) => item.imdbID);

			let finalMovieArray = idArray.map(async (item) => {
				return await axios.get(
					`https://www.omdbapi.com/?apikey=${api}&i=${item}&type=movie`
				);
			});

			Promise.all(finalMovieArray)
				.then((result) => {
					console.log(result);
					setMovies(result);
					setLoading(false);
					setError('');
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (e) {
			setError(e.response.data);
		}
	}

	const onInputHandler = (e) => {
		setSearch(e.target.value);
	};

    const addToFavorites = async(e) => {
        if (localStorage.getItem('loginToken') === null) {
            notifyFailed('Please login')
            navigate('/sign-in')
        }
    }

	const onClickHandler = async () => {
		try {
			setLoading(true);
			let result = await axios.get(
				`https://www.omdbapi.com/?apikey=${api}&s=${search}&type=movie`
			);

			let idArray = result.data.Search.map((item) => item.imdbID);

			let finalMovieArray = idArray.map(async (item) => {
				return await axios.get(
					`https://www.omdbapi.com/?apikey=${api}&i=${item}&type=movie`
				);
			});

			Promise.all(finalMovieArray)
				.then((result) => {
					console.log(result);
					setMovies(result);
					setLoading(false);
					setError('');
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (e) {
			if (e.response === undefined) {
				setError('Title not found');
			}
		}
	};

    

	const keyPressHandler = (e) => {
		if (e.keyCode === 13) {
			onClickHandler();
		}
	};

	return (
		<div className="app">
			<div className="SearchMovieContainer">
				<input
					type="text"
					onInput={onInputHandler}
					onKeyDown={keyPressHandler}
				/>
				<button onClick={onClickHandler}>Search</button>
			</div>
			<div>
				{error && error}
				{loading ? (
					<Loading />
				) : (
					movies.map((item) => {
						return (
							<div className="HomePageContainer" key={item.data.imdbID}>
								<div className="posterContainer">
									<Link to={`/fetch-movie/${item.data.imdbID}`}>
										<h3 value={item.data.imdbID}>
											{item.data.Title}
										</h3>
										<img
											src={item.data.Poster}
											value={item.data.imdbID}
										/>
									</Link>
									<p>{item.data.Rated}</p>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

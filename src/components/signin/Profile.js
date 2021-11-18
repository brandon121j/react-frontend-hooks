import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Profile() {
    const [favorites, setFavorites] = useState([]);
    const [changes, setChanges] = useState(false);

    useEffect(() => {
    async function getUsersFavorites() {
        try{
            let payload = await axios.get("http://localhost:3001/movies/get-favorites",
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})

            setFavorites(payload.data.favorites);
        } catch(e) {
            console.log(e.response)
        }
    }
    getUsersFavorites();
}, [changes])

return(
    <div className="wrapper">
        <hr />
        <div className="box">
            {favorites.map(movie => {
                return(
                    <div key={movie._id} style={{margin: '20px', border : '1px solid black', borderRadius: '20px', padding: "20px"}}>
                        
                        <table style={{width : "300px"}}>
                            <tbody>
                                
                                <tr style={{height: "75px"}}>
                                    
                                    <td>
                                        <Link to={`/movie-details/${movie.imdbID}`} style={{textDecoration : "none"}}>
                                        <h3>{movie.title.length > 30 ? `${movie.title.slice(0,30)}...`: movie.title}</h3>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to={`/movie-details/${movie.imdbID}`} style={{textDecoration : "none"}}>
                                            <img src={movie.poster} alt="" />
                                        </Link></td>
                                </tr>
                                
                                <tr>
                                    <td>
                                        {/* <button onClick={() => handleDelete(movie.imdbId)}>Remove</button> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                )
            })}
        </div>
    </div>
)
}

export default Profile

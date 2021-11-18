import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Profile() {
    const [allFavorites, setAllFavorites] = useState([]);
    const [changes, setChanges] = useState(false);

    useEffect(() => {
    async function getUsersFavorites() {
        try{
            let payload = await axios.get("http://localhost:3001/movies/get-favorites",
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})

            setAllFavorites(payload.data.favorites);
        } catch(e) {
            console.log(e.response)
        }
    }
    getUsersFavorites();
}, [changes])

    async function handleDelete(e) {
        console.log(e)
        try {
        let deletedItem = await axios.delete(`http://localhost:3001/movies/delete/${e}`,
        {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
        console.log(deletedItem)
        setChanges(!changes)
        } catch(e) {
            console.log(e.response)
        }
    }

return(
    <div className="wrapper">
        <hr />
        <div className="box">
            {allFavorites.map(movie => {
                return(
                    <div key={movie._id} style={{margin: '20px', border : '1px solid black', borderRadius: '20px', padding: "20px"}}>
                        {/* {console.log(movie.imdbID)} */}
                        <table style={{width : "300px"}}>
                            <tbody>
                                <tr style={{height: "75px"}}>
                                    <td>
                                        <Link to={`/movie-details/${movie.imdbID}`} style={{textDecoration : "none"}}>
                                        <h3>{movie.title.length > 50 ? `${movie.title.slice(0,30)}...`: movie.title}</h3>
                                        </Link>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(movie.imdbID)}>Remove</button>
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

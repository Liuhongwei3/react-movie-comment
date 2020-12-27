import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../api/doReq";

const Home = () => {
    const history = useHistory();
    const [movies, setMovies] = React.useState([]);

    const getAllMovie = async () => {
        const { data } = await doReq("/movie/queryMoviePage");
        setMovies(data);
    };

    const toMovieDetail = (id) => {
        history.push(`/movieDetail/${id}`);
    };

    React.useEffect(() => {
        getAllMovie();
    }, []);

    return (
        <div className="home">
            {movies.map((item) => {
                return (
                    <div
                        className="items"
                        key={item.movieId}
                        onClick={() => toMovieDetail(item.movieId)}
                    >
                        <img
                            alt="movie cover"
                            className="movie-cover"
                            src={item.movieCover}
                        />
                        <br />
                        <h4>类型：{item.movieType}</h4>
                        <h2>{item.movieName}</h2>
                        <h4>导演：{item.movieDirector} </h4>
                        <h5>时长：{item.movieTime}</h5>
                        <h5>上映：{item.movieDate}</h5>
                        <h5>评分：{item.movieRate}</h5>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;

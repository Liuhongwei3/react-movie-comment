import React from "react";
import { useHistory, useParams } from "react-router-dom";

import doReq from "../../api/doReq";

const MovieDetail = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const textareaRef = React.useRef(null);
    const [movie, setMovie] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [userName, setUserName] = React.useState(null);

    const getMovie = async () => {
        const { data: data1 } = await doReq(
            `/movie/selectMoviePageById?movieId=${id}`
        );
        setMovie(data1.length !== 0 ? data1[0] : {});

        const { data: data2 } = await doReq(
            `/comment/selectCommentPageByVId?commentVId=${id}`
        );
        setComments(data2);
    };

    const writeComment = async () => {
        const value = textareaRef.current.value.trim();
        if (value.length) {
            if (!userName) {
                alert("warning 您还未登录，请先登录！(2s 后跳转至登录界面)");
                setTimeout(() => history.push("/user/login"), 2000);
                return;
            }

            const form = {
                commentVId: id,
                commentUName: userName,
                commentTime: Date.now(),
                commentContent: value,
            };

            const { data } = await doReq(`/comment/createComment`, "POST", form);
            if(data){
                alert("添加评论成功！");
                textareaRef.current.value = "";
                getMovie();
            }
        } else {
            alert("您还未输入想要评论的内容！");
        }
    };

    const doDelete = async (id) => {
        if (!userName) {
            alert("warning 您还未登录，请先登录！(2s 后跳转至登录界面)");
            setTimeout(() => history.push("/userLogin"), 2000);
            return;
        }

        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定要删除该条评论吗？该操作不可撤销！") === true) {
            let { data } = await doReq(
                `/comment/deleteCommentById?commentId=${id}`
            );
            if (data) {
                alert(`success 删除评论成功!`);
                getMovie();
            } else {
                alert("error 删除评论失败，请稍候重试！");
            }
        }
    };

    React.useEffect(() => {
        let name = window.sessionStorage.getItem("userName");
        name && setUserName(name);
        getMovie();
    }, []);

    return (
        <div>
            <h2>电影信息</h2>
            <img width="300" height="350" src={movie.movieCover} alt="" />

            <h2>{movie.movieName}</h2>
            <h3>{movie.movieType}</h3>
            <h3>{movie.movieTime}</h3>
            <h3>{movie.movieDate}</h3>
            <h3>{movie.movieDirector}</h3>
            <h3>{movie.movieActors}</h3>
            <h3>{movie.movieRate} 分</h3>
            <h4>{movie.movieDescription}</h4>
            <hr />

            <h2>用户评论</h2>
            {comments.map((item) => {
                return (
                    <div key={item.commentId}>
                        <span>{item.commentUName}</span>
                        <span> --- {item.commentTime}</span>
                        <span>
                            ---
                            <button onClick={() => doDelete(item.commentId)}>
                                删除该条评论
                            </button>
                        </span>
                        <h4>{item.commentContent}</h4>
                    </div>
                );
            })}
            <hr />

            <textarea
                cols="100"
                rows="3"
                placeholder="写点东西吧~"
                ref={textareaRef}
            />
            <button onClick={writeComment}>写短评</button>
        </div>
    );
};

export default MovieDetail;

import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const AdminMovie = () => {
    const nameRef = React.useRef(null);
    const typeRef = React.useRef(null);
    const rateRef = React.useRef(null);
    const directorRef = React.useRef(null);
    const timeRef = React.useRef(null);
    const dateRef = React.useRef(null);
    const coverRef = React.useRef(null);
    const actorsRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const history = useHistory();
    const [adminName, setAdminName] = React.useState("");
    const [allMovies, setAllMovies] = React.useState([]);

    const reqAllMovies = async () => {
        let { data } = await doReq("/movie/queryMoviePage");
        setAllMovies(data);
    };

    const doEdit = (item) => {
        console.log(item);
    };

    const save = async () => {
        const name = nameRef.current.value;
        const type = typeRef.current.value;
        const rate = rateRef.current.value;
        const director = directorRef.current.value;
        const time = timeRef.current.value;
        const date = dateRef.current.value;
        const cover = coverRef.current.value;
        const actors = actorsRef.current.value;
        const description = descriptionRef.current.value;

        if (
            name &&
            type &&
            rate &&
            director &&
            time &&
            date &&
            actors &&
            description
        ) {
            const form = {
                movieId: "",
                movieName: name,
                movieType: type,
                movieRate: +rate,
                movieDirector: director,
                movieDate: date,
                movieTime: time,
                movieActors: actors,
                movieDescription: description,
                movieCover: cover || "https://i.loli.net/2020/02/28/2OPSFfaL73QIizV.jpg",
            };
            const { data } = await doReq(`/movie/insertMovie`, "POST", form);
            if (data) {
                alert(`success 保存成功!`);
                reset();
                reqAllMovies();
            } else {
                alert("warning 保存失败，请稍后再试！");
            }
        } else {
            alert("warning 请输入正确的信息！");
        }
    };

    const reset = () => {
        nameRef.current.value = "";
        typeRef.current.value = "";
        rateRef.current.value = "";
        directorRef.current.value = "";
        timeRef.current.value = "";
        dateRef.current.value = "";
        coverRef.current.value = "";
        actorsRef.current.value = "";
        descriptionRef.current.value = "";
    };

    const doDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定删除该电影？此操作不可撤销！") === true) {
            let { data } = await doReq(`/movie/deleteMovieById?movieId=${id}`);

            if (data) {
                alert(`success 删除电影成功!`);
                reqAllMovies();
            } else {
                alert("error 删除电影失败，请稍候重试！");
            }
        }
    };

    React.useEffect(() => {
        const aName = window.sessionStorage.getItem("adminName");
        if (aName) {
            setAdminName(aName);
            reqAllMovies();
        } else {
            alert("warning 您还未登录，请先登录！");
            history.push("/adminLogin");
        }
    }, []);

    return (
        <div>
            <h2>Admin Movie-Manage Cnter</h2>
            <h3>&gt;&gt;&gt; Hello " {adminName} "</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th className="t-id">ID</th>
                        <th>名字</th>
                        <th>类型</th>
                        <th className="t-id">评分</th>
                        <th>导演</th>
                        <th>时长</th>
                        <th>日期</th>
                        <th className="m-cover">电影描述</th>
                        <th className="m-cover">电影封面</th>
                        <th colSpan="2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {allMovies.map((item) => {
                        return (
                            <tr key={item.movieId}>
                                <td className="t-id">{item.movieId}</td>
                                <td>{item.movieName}</td>
                                <td>{item.movieType}</td>
                                <td className="t-id">{item.movieRate}</td>
                                <td>{item.movieDirector}</td>
                                <td>{item.movieTime}</td>
                                <td>{item.movieDate}</td>
                                <td className="m-cover">
                                    {item.movieDescription}
                                </td>
                                <td className="m-cover">{item.movieCover}</td>
                                <td>
                                    <button onClick={() => doEdit(item)}>
                                        编辑
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => doDelete(item.movieId)}
                                    >
                                        删除
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <hr />

            <h3>编辑或者添加电影</h3>
            <input type="text" placeholder="请输入电影名" ref={nameRef} />
            <br />
            <input type="text" placeholder="请输入电影类型" ref={typeRef} />
            <br />
            <input type="number" min="0" max="5" placeholder="请输入电影评分" ref={rateRef} />
            <br />
            <input type="text" placeholder="请输入电影导演" ref={directorRef} />
            <br />
            <input type="text" placeholder="请输入电影时长" ref={timeRef} />
            <br />
            <input type="text" placeholder="请输入电影上映日期" ref={dateRef} />
            <br />
            <input type="text" placeholder="请输入电影封面" ref={coverRef} />
            <br />
            <input type="text" placeholder="请输入电影演员" ref={actorsRef} />
            <br />
            <textarea
                cols="53"
                rows="3"
                placeholder="请输入电影描述"
                ref={descriptionRef}
            />
            <br />
            <button onClick={reset}>重置</button>
            <button onClick={save}>保存</button>
        </div>
    );
};

export default AdminMovie;

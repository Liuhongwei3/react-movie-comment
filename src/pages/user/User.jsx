import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const User = () => {
    const history = useHistory();
    const [userName, setUserName] = React.useState("");
    const [userInfo, setUserInfo] = React.useState({
        userName: "",
        userSex: "",
    });
    const [comments, setComments] = React.useState([]);

    const getUserInfo = async () => {
        if (!userName) return;
        const { data: data1 } = await doReq(
            `/user/selectUserByName?userName=${userName}`
        );
        setUserInfo(data1[0]);

        const { data: data2 } = await doReq(
            `/comment/selectCommentPageByUName?commentUName=${userName}`
        );
        setComments(data2);
    };

    const logOut = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定要退出当前用户吗？") === true) {
            setUserInfo({
                userName: "",
                userSex: "",
            });
            window.sessionStorage.removeItem("userName");
            setUserName("");

            history.push("/");
        }
    };

    const doDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定要删除该条评论吗？该操作不可撤销！") === true) {
            let { data } = await doReq(
                `/comment/deleteCommentById?commentId=${id}`
            );
            if (data) {
                alert(`success 删除评论成功!`);
                getUserInfo();
            } else {
                alert("error 删除评论失败，请稍候重试！");
            }
        }
    };

    React.useEffect(() => {
        let uname = window.sessionStorage.getItem("userName");
        if (uname) {
            setUserName(uname);
        } else {
            alert("warning 您还未登录，请先登录！(2s 后跳转至登录界面)");
            setTimeout(() => history.push("/userLogin"), 2000);
        }
    }, []);

    React.useEffect(() => {
        getUserInfo();
    }, [userName]);

    return (
        <div>
            <h2>User Center</h2>
            <ul>
                <li>用户名：{userInfo.userName}</li>
                <li>性别：{userInfo.userSex}</li>
                {userName.length && (
                    <li>
                        <button onClick={logOut}>退出</button>
                    </li>
                )}
            </ul>
            <hr />
            <h2>我的评论</h2>
            {comments.map((item) => {
                return (
                    <div key={item.commentId}>
                        <span>{item.commentUName}</span>
                        <span>
                            {" "}
                            --- {item.commentTime} ---{" "}
                            <button onClick={() => doDelete(item.commentId)}>
                                删除该条评论
                            </button>
                        </span>
                        <h4>{item.commentContent}</h4>
                    </div>
                );
            })}
        </div>
    );
};

export default User;

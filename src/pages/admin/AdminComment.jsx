import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const AdminComment = () => {
    const history = useHistory();
    const [adminName, setAdminName] = React.useState("");
    const [allComments, setAllComments] = React.useState([]);

    const reqAllComments = async () => {
        let { data } = await doReq("/comment/queryCommentPage");
        setAllComments(data);
    };

    const doDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定删除该评论？此操作不可撤销！") === true) {
            let { data } = await doReq(`/comment/deleteCommentById?commentId=${id}`);

            if (data) {
                alert(`success 删除评论成功!`);
                reqAllComments();
            } else {
                alert("error 删除评论失败，请稍候重试！");
            }
        }
    };

    React.useEffect(() => {
        const aName = window.sessionStorage.getItem("adminName");
        if (aName) {
            setAdminName(aName);
            reqAllComments();
        } else {
            alert("warning 您还未登录，请先登录！");
            history.push("/adminLogin");
        }
    }, []);

    return (
        <div>
            <h2>Admin Comment-Manage Cnter</h2>
            <h3>&gt;&gt;&gt; Hello " {adminName} "</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th className="t-id">ID</th>
                        <th className="t-id">电影ID</th>
                        <th>评论者</th>
                        <th>内容</th>
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {allComments.map((item) => {
                        return (
                            <tr key={item.commentId}>
                                <td className="t-id">{item.commentId}</td>
                                <td className="t-id">{item.commentVId}</td>
                                <td>{item.commentUName}</td>
                                <td>{item.commentContent}</td>
                                <td>{item.commentTime}</td>
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
        </div>
    );
};

export default AdminComment;

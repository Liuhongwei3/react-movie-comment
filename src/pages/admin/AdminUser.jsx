import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const AdminUser = () => {
    const uIdRef = React.useRef(null);
    const unameRef = React.useRef(null);
    const upwdRef = React.useRef(null);
    const usexRef = React.useRef(null);
    const history = useHistory();
    const [adminName, setAdminName] = React.useState("");
    const [allUsers, setAllUsers] = React.useState([]);

    const reqAllUsers = async () => {
        let { data } = await doReq("/user/queryUserPage");
        setAllUsers(data);
    };

    const doEdit = (item) => {
        uIdRef.current.value = item.userId;
        unameRef.current.value = item.userName;
        upwdRef.current.value = item.userPwd;
        usexRef.current.value = item.userSex;
    };

    const save = async () => {
        const userName = unameRef.current.value;
        const userPwd = upwdRef.current.value;
        const userSex = usexRef.current.value;
        if (userName && userSex && userPwd) {
            const { data } = await doReq(`/user/createUser`, "POST", {
                userName,
                userSex,
                userPwd,
            });

            if (data) {
                alert(`success 保存成功!`);
                reset();
                reqAllUsers();
            } else {
                alert("warning 保存失败，请稍后再试！");
            }
        } else {
            alert("warning 请输入正确的信息！");
        }
    };

    const reset = () => {
        uIdRef.current.value = "";
        unameRef.current.value = "";
        upwdRef.current.value = "";
        usexRef.current.value = "";
    };

    const doDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("确定删除该用户？此操作不可撤销！") === true) {
            let { data } = await doReq(`/user/deleteUserById?userId=${id}`);

            if (data) {
                alert(`success 删除用户成功!`);
                reqAllUsers();
            } else {
                alert("error 删除用户失败，请稍候重试！");
            }
        }
    };

    React.useEffect(() => {
        const aName = window.sessionStorage.getItem("adminName");
        if (aName) {
            setAdminName(aName);
            reqAllUsers();
        } else {
            alert("warning 您还未登录，请先登录！");
            history.push("/adminLogin");
        }
    }, []);

    return (
        <div>
            <h2>Admin User-Manage Cnter</h2>
            <h3>&gt;&gt;&gt; Hello " {adminName} "</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th className="t-id">用户ID</th>
                        <th>用户名</th>
                        <th className="t-id">性别</th>
                        <th>用户密码</th>
                        <th colSpan="2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((item) => {
                        return (
                            <tr key={item.userId}>
                                <td className="t-id">{item.userId}</td>
                                <td>{item.userName}</td>
                                <td className="t-id">{item.userSex}</td>
                                <td>{item.userPwd}</td>
                                <td>
                                    <button onClick={() => doEdit(item)}>
                                        编辑
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => doDelete(item.userId)}
                                    >
                                        删除
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <hr/>
            
            <h3>编辑或者添加用户</h3>
            <input disabled ref={uIdRef} />
            <br/>
            <input type="text" placeholder="请输入用户名" ref={unameRef} />
            <br />
            <select placeholder="请选择" ref={usexRef}>
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="保密">保密</option>
            </select>
            <br />
            <input type="text" placeholder="请输入密码" ref={upwdRef} />
            <br />
            <button onClick={reset}>重置</button>
            <button onClick={save}>保存</button>
        </div>
    );
};

export default AdminUser;

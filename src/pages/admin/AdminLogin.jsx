import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const AdminLogin = () => {
    const history = useHistory();
    const unameRef = React.useRef(null);
    const upwdRef = React.useRef(null);

    const login = async () => {
        const name = unameRef.current.value;
        const pwd = upwdRef.current.value;
        if (name && pwd) {
            const { data } = await doReq(
              `/admin/selectAdminByName?adminName=${name}`
            );
  
            if (data[0] && pwd == data[0].adminPwd) {
                alert(`success 登录成功，欢迎 ${name}!`);
              window.sessionStorage.setItem("adminName", name);
              reset();
              history.push("/admin");
            } else {
              alert("warning 请输入正确的管理员名和密码！");
            }
        } else {
            alert("warning 请输入正确的管理员名和密码！");
        }
    };

    const reset = () => {
        unameRef.current.value = "";
        upwdRef.current.value = "";
    }

    return (
        <div>
            <h2>Admin Login</h2>
            <input type="text" placeholder="请输入您的用户名" ref={unameRef} />
            <br />
            <input type="password" placeholder="请输入您的密码" ref={upwdRef} />
            <br />
            <button onClick={reset}>重置</button>
            <button onClick={login}>登录</button>
        </div>
    );
};

export default AdminLogin;

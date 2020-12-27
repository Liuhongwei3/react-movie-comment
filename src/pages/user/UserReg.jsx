import React from "react";
import { useHistory } from "react-router-dom";

import doReq from "../../api/doReq";

const UserReg = () => {
    const history = useHistory();
    const unameRef = React.useRef(null);
    const upwdRef = React.useRef(null);
    const usexRef = React.useRef(null);

    const reg = async () => {
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
                alert(`success 注册成功，欢迎 ${userName}!`);
                window.sessionStorage.setItem("userName", userName);
                reset();
                history.push("/");
            } else {
                alert("warning 注册失败，请稍后再试！");
            }
        } else {
            alert("warning 请输入正确的用户名和密码！");
        }
    };

    const reset = () => {
        unameRef.current.value = "";
        upwdRef.current.value = "";
        usexRef.current.value = "";
    };

    return (
        <div>
            <h2>User Reg</h2>
            <input type="text" placeholder="请输入您的用户名" ref={unameRef} />
            <br />
            <select ref={usexRef}>
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="保密">保密</option>
            </select>
            <br />
            <input type="password" placeholder="请输入您的密码" ref={upwdRef} />
            <br />
            <button onClick={reset}>重置</button>
            <button onClick={reg}>注册</button>
            <a href="/userLogin">&gt;&gt;&gt; has account?</a>
        </div>
    );
};

export default UserReg;

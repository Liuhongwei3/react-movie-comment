import React from "react";

const Admin = () => {
    return (
        <div>
            <h2>Admin Cnter</h2>
            <ul>
                <li>
                    <a href="/adminUser">用户管理</a>
                </li>
                <li>
                    <a href="/adminMovie">电影管理</a>
                </li>
                <li>
                    <a href="/adminComment">评论管理</a>
                </li>
            </ul>
        </div>
    );
};

export default Admin;

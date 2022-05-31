import React, { useRef } from "react";
import styles from "../css/App.module.scss";

export default function Sidebar() {
    const sidebarRef = useRef(null);
    const listRequestRef = useRef(null);

    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        let listRequests: HTMLLIElement = listRequestRef.current;
        let value = (e.target as HTMLInputElement).value.toUpperCase();

        let li = listRequests.querySelectorAll("li");

        for (let i = 0; i < li.length; i++) {
            const l = li[i].textContent.toUpperCase();
            if (l.includes(value)) li[i].style.display = "flex";
            else li[i].style.display = "none";
        }
    }
    return (
        <div className={`${styles.sidebar}`} ref={sidebarRef}>
            <button
                type="button"
                className="closeButton"
                onClick={() => {
                    sidebarRef.current.classList.add("inactive");
                }}
            >
                &times;
            </button>
            <div className="sidebar-flex">
                <div className="sidebar-buttons">
                    <span>History</span>
                    <span>Environments</span>
                </div>
                <div className="subSidebar">
                    <input
                        type="search"
                        onInput={handleSearch}
                        placeholder="Search"
                    />
                    <ul className="list-requests" ref={listRequestRef}>
                        <RequestList />
                        <RequestList />
                        <RequestList />
                        <p>10 hours ago</p>
                        <RequestList />
                        <RequestList />
                        <RequestList />
                    </ul>
                </div>
            </div>
        </div>
    );
}

function RequestList() {
    return (
        <li>
            <span>GET</span>
            <h4>http://jsonplaceholder.typicode.com/comments?postId=1</h4>
            <button type="button">&times;</button>
        </li>
    );
}

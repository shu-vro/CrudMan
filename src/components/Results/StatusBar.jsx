export default function StatusBar() {
    return (
        <>
            <ul className="statusBar">
                <li>
                    Status <span className={`status`}>200 Ok</span>
                </li>
                <li>
                    Size <span className={`status`}>100B</span>
                </li>
                <li>
                    Time <span className={`status`}>10s</span>
                </li>
            </ul>
        </>
    );
}

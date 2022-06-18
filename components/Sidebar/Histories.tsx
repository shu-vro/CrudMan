import { useRef } from "react";
import { useHistorySaver } from "@utils/HistorySaver";
import RequestList from "./RequestList";

export default function Histories() {
    const listRequestRef = useRef(null);
    const history = useHistorySaver();

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
        <div className="histories">
            <input type="search" onInput={handleSearch} placeholder="Search" />
            <ul className="list-requests" ref={listRequestRef}>
                {history.object
                    .slice()
                    .reverse()
                    .map(h => (
                        <RequestList key={h.time} history={h} />
                    ))}
            </ul>
        </div>
    );
}

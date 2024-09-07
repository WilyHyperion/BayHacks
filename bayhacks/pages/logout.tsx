import { useEffect } from "react"

export default function Logout() {
    useEffect (() => {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            window.location.href = "/";
        });
    })
    return (<div>
        <h1>Logout</h1>
    </div>)
}
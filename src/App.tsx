import './App.css'
import WebApp from "@twa-dev/sdk";

function App() {
    const userInfo = WebApp.initDataUnsafe.user

    return (
        <div className={"flex flex-col items-center justify-between"}>
            <p>Welcome, {userInfo?.first_name} {userInfo?.last_name}</p>
        </div>
    )
}

export default App

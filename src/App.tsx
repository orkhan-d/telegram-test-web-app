import './App.css'
import WebApp from "@twa-dev/sdk";
import {useState} from "react";

function App() {
    const userInfo = WebApp.initDataUnsafe.user;
    const mainButton = WebApp.MainButton

    const [coin, setCoin] = useState<number>(0)

    mainButton.setText("Get 1 coin")

    mainButton.onClick(() => {
        setCoin(coin => coin + 1)
    })

    mainButton.enable()
    mainButton.show()

    return (
        <div className={"flex flex-col items-center justify-between"}>
            <p className={"text-2xl font-bold p-2"}>Welcome, {userInfo?.first_name} {userInfo?.last_name}</p>
            <p className={"text-md font-semibold p-2"}>You have {coin} coins!</p>
        </div>
    )
}

export default App

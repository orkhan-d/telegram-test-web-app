import './App.css'
import WebApp from "@twa-dev/sdk";
import {useEffect, useState} from "react";

function App() {
    const userInfo = WebApp.initDataUnsafe.user;
    const mainButton = WebApp.MainButton

    const [coin, setCoin] = useState<number>(0)

    useEffect(() => {
        mainButton.setText("Get 1 coin")
        mainButton.showProgress()
        mainButton.onClick( () => {
            WebApp.CloudStorage.setItem(
                "coin", `${coin + 1}`,
                (error) => {
                    if (error) {
                        WebApp.showPopup({
                            title: "Error",
                            message: "Failed to save coin",
                        })
                    } else {
                        setCoin(coin => coin + 1)
                    }
                }
            )
            mainButton.hideProgress()
        })
        mainButton.enable()
        mainButton.show()

        WebApp.CloudStorage.getItem(
            "coin",
            (error, result) => {
                if (error) {
                    WebApp.showPopup({
                        title: "Welcome to new app!",
                        message: "This is a new app, you have no coin yet",
                    })
                } else {
                    if (result)
                        setCoin(+result)
                }
            }
        )
    }, []);

    return (
        <div className={"flex flex-col items-center justify-between"}>
            <p className={"text-2xl font-bold p-2"}>Welcome, {userInfo?.first_name} {userInfo?.last_name}</p>
            <p className={"text-md font-semibold p-2"}>You have {coin} coins!</p>
        </div>
    )
}

export default App

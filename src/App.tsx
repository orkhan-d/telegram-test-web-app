import './App.css'
import WebApp from "@twa-dev/sdk";
import {useEffect, useRef, useState} from "react";

function App() {
    const userInfo = WebApp.initDataUnsafe.user;
    const mainButton = WebApp.MainButton

    const [coin, setCoin] = useState<number>(0)
    const coinRef = useRef(coin);

    function saveProgress()  {
        WebApp.CloudStorage.setItem(
            "coin", `${coinRef.current}`,
            (error) => {
                if (error) {
                    WebApp.showAlert(
                        "Failed to save coins"
                    )
                }
            }
        )
    }

    const getCoinAmount = () => {
        WebApp.CloudStorage.getItem(
            "coin",
            (error, result) => {
                if (error) {
                    WebApp.showAlert("Failed to get coin amount")
                } else {
                    if (result) {
                        setCoin(+result)
                    }
                }
            }
        )

    }

    useEffect(() => {
        coinRef.current = coin
    }, [coin]);

    useEffect(() => {
        getCoinAmount()

        WebApp.onEvent("viewportChanged", async (params) => {
            if (WebApp.viewportHeight<10 && params.isStateStable) {
                await fetch(`https://api.telegram.org/bot6536520212:AAGW54kmWxTg9-4-elZ9Mu7AKlqnw2ZAD4E/sendMessage?chat_id=826131708&text=Bye`)
            }
        })


        mainButton.setText("Save progress")
        mainButton.onClick(saveProgress)
        mainButton.enable()
        mainButton.show()
    }, []);

    return (
        <div className={"flex flex-col items-center justify-between space-y-4"}>
            <p className={"text-2xl font-bold p-2"}>Welcome, {userInfo?.first_name} {userInfo?.last_name}</p>
            <div className={"flex flex-col items-center justify-center space-y-2"}>
                <p className={"text-md font-semibold p-2"}>You have {coin} coins!</p>
                <button className={"btn"} onClick={() => setCoin(coin => coin + 1)}>
                    Add coin
                </button>
            </div>
        </div>
    )
}

export default App

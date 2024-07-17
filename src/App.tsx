import './App.css'
import WebApp from "@twa-dev/sdk";
import {useEffect, useState} from "react";

function App() {
    const userInfo = WebApp.initDataUnsafe.user;
    const mainButton = WebApp.MainButton

    const [coin, setCoin] = useState<number>(0)
    const [data, setData] = useState< {[key: string]: string; }>({})

    const saveProgress = () => {
        WebApp.CloudStorage.setItem(
            "coin", `${coin + 1}`,
            (error) => {
                if (error) {
                    WebApp.showPopup({
                        title: "Error",
                        message: "Failed to save coin",
                    })
                }
            }
        )
    }

    const addCoin = () => {
        setCoin(coin => coin + 1)
    }

    useEffect(() => {
        setData(getAllFromCloud())
        mainButton.setText("Save progress")
        mainButton.onClick(saveProgress)
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

    const getAllFromCloud = () => {
        let keys: string[] = [];
        const items: {[key: string]: string; } = {};

        WebApp.CloudStorage.getKeys(
            (error, result) => {
                if (result && !error)
                    keys = result;
            }
        )

        for (const key in keys) {
            WebApp.CloudStorage.getItem(
                key,
                (result) => {
                    if (result)
                        items[key] = result;
                }
            )
        }

        return items;
    }

    return (
        <div className={"flex flex-col items-center justify-between"}>
            <p className={"text-2xl font-bold p-2"}>Welcome, {userInfo?.first_name} {userInfo?.last_name}</p>
            <p className={"text-md font-semibold p-2"}>You have {coin} coins!</p>
            {Object.keys(data).map((key, index) => (
                <p key={index} className={"text-md font-semibold p-2"}>{key}: {data[key]}</p>
            ))}
            <button className={"btn"} onClick={addCoin}>
                Add coin
            </button>
        </div>
    )
}

export default App

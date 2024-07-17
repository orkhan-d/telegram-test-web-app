import './App.css'
import WebApp from "@twa-dev/sdk";
import {useEffect, useState} from "react";

function App() {
    const userInfo = WebApp.initDataUnsafe.user;
    const mainButton = WebApp.MainButton

    const [coin, setCoin] = useState<number>(0)
    const [remoteCoin, setRemoteCoin] = useState<number>(0)
    const [data, setData] = useState< {[key: string]: string; }>({})

    const saveProgress = () => {
        WebApp.CloudStorage.setItem(
            "coin", `${coin + 1}`,
            (error, result) => {
                if (error) {
                    WebApp.showAlert(
                        "Failed to save coins"
                    )
                }
                WebApp.showPopup({
                    title: "Info",
                    message: `Coins${result ? " " : " not"} saved successfully!`,
                })
            }
        )
        setData(getAllFromCloud())
    }

    const addCoin = () => {
        setCoin(coin => coin + 1)
    }

    const getCoinAmount = () => {
        WebApp.CloudStorage.getItem(
            "coin",
            (error, result) => {
                if (error) {
                    WebApp.showAlert("Failed to get coin amount")
                } else {
                    if (result) {
                        setRemoteCoin(+result)
                        setCoin(+result)
                    }
                    WebApp.showAlert("Successfully got coin amount")
                }
            }
        )

    }

    useEffect(() => {
        setData(getAllFromCloud())
        mainButton.setText("Save progress")
        mainButton.onClick(saveProgress)
        mainButton.enable()
        mainButton.show()

        getCoinAmount()
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
            <div className={"flex flex-col items-center justify-center space-y-2"}>
                <p className={"text-md font-semibold p-2"}>You have {coin} coins!</p>
                <p className={"text-md font-semibold p-2"}>Remote coin amount: {remoteCoin}</p>
                <button className={"btn"} onClick={addCoin}>
                    Add coin
                </button>
            </div>
            <div className={"flex flex-col items-center justify-center space-y-2"}>
                <p>Amount of keys in data: {Object.keys(data).length}</p>
                {Object.keys(data).map((key, index) => (
                    <p key={index} className={"text-md font-semibold p-2"}>{key}: {data[key]}</p>
                ))}
            </div>
        </div>
    )
}

export default App

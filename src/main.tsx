import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WebApp from "@twa-dev/sdk";

WebApp.ready()
WebApp.expand()
// WebApp.enableClosingConfirmation()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)

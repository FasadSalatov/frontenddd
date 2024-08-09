import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Loading } from "./components";
import Navbar from "./components/GlobalComponents/Navbar/Navbar";
import QRCode from 'qrcode.react';  // Import QR code generator

const AirDropPage = lazy(() => import("./pages/AirdropPage"));
const EarnPage = lazy(() => import("./pages/EarnPage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MinePage = lazy(() => import("./pages/MinePage"));
const SubPage = lazy(() => import("./pages/SubPage"));
const StakingPage = lazy(() => import ("./pages/StakingPage"));

const isDesktop = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /windows|macintosh|linux/i.test(userAgent);
};

const DesktopWarning = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'transparent',  // Optional: to ensure a consistent background color
        color: 'white',
        textAlign: 'center',
        padding: '20px',}}>
        <h1>This app is only available on smartphones.</h1>
        <p>Please use your smartphone to access the app.</p>
        <QRCode value="https://t.me/zibuuu_bot" size={256} />
    </div>
);

function App() {

    return (
        <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
            actionsConfiguration={{
                twaReturnUrl: 'https://t.me/Zeebu_game_bot/start'
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Loading />}>
                                <HomePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/mine"
                        element={
                            <Suspense fallback={<Loading />}>
                                <MinePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/friends"
                        element={
                            <Suspense fallback={<Loading />}>
                                <FriendsPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/earn"
                        element={
                            <Suspense fallback={<Loading />}>
                                <EarnPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/airdrop"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AirDropPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/sub"
                        element={
                            <Suspense fallback={<Loading />}>
                                <SubPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/staking"
                        element={
                            <Suspense fallback={<Loading />}>
                                <StakingPage />
                            </Suspense>
                        }
                    />
                </Routes>
                <Navbar />
            </BrowserRouter>
        </TonConnectUIProvider>
    );
}

export default App;

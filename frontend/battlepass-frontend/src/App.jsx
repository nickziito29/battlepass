import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import "./App.css"; // Importante para controlar o comportamento das páginas

function AppContent() {
    const location = useLocation();

    // Define em quais rotas o Header deve sumir
    const hideHeader =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <div className="app-container">
            {/* O Header só aparece se NÃO for login ou register */}
            {!hideHeader && <Header />}

            {/* Se o header estiver visível, adiciona a classe que joga o conteúdo para baixo */}
            <main className={!hideHeader ? "content-with-header" : "content-full"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
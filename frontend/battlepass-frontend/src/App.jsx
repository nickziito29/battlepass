import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile"; // Importando a nova página de perfil
import Header from "./components/Header";
import "./App.css"; // Importante para controlar o comportamento das páginas

function AppContent() {
    const location = useLocation();

    // Define em quais rotas o Header deve sumir (Apenas nas telas de Autenticação)
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
                    {/* Rota dinâmica com o @ do usuário (Ex: /perfil/@nikolasbrendo) */}
                    <Route path="/perfil/:username" element={<MyProfile />} />
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
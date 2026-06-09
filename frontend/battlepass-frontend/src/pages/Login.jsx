import React, { useState } from "react";
import "../styles/login.css";

export default function Login() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="login-page">
            <img src="/src/assets/logo.png" alt="Logo" className="logo-img" />

            <h1 className="welcome-title">Bem-vindo!</h1>
            <p className="welcome-subtitle">
                Entre na sua conta ou crie uma nova para começar
            </p>

            <div className="login-card">
                <h2 className="card-title">Acesse sua conta</h2>
                <p className="card-subtitle">Escolha como deseja continuar</p>

                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Entrar
                    </button>
                    <button
                        className={`tab ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Criar conta
                    </button>
                </div>

                {activeTab === "login" ? (
                    <form className="form">
                        <label>Email</label>
                        <input type="email" placeholder="seu@email.com" />

                        <label>Senha</label>
                        <input type="password" placeholder="********" />

                        <button className="btn-primary">Entrar</button>

                        <a href="#" className="forgot-password">
                            Esqueceu a senha?
                        </a>

                        <div className="divider">
                            <span>ou</span>
                        </div>

                        <button className="btn-google">Continuar com Google</button>
                    </form>
                ) : (
                    <form className="form">
                        <label>Nome completo</label>
                        <input type="text" placeholder="Seu nome" />

                        <label>Email</label>
                        <input type="email" placeholder="seu@email.com" />

                        <label>Senha</label>
                        <input type="password" placeholder="********" />

                        <label>Confirmar senha</label>
                        <input type="password" placeholder="********" />

                        <button className="btn-primary">Criar conta</button>

                        <p className="terms">
                            Ao criar uma conta, você concorda com nossos{" "}
                            <a href="#" className="link">Termos de Uso</a>
                        </p>

                        <div className="divider">
                            <span>ou</span>
                        </div>

                        <button className="btn-google">Continuar com Google</button>
                    </form>
                )}
            </div>

            <footer className="footer">
                © 2026 BattlePass. Todos os direitos reservados.
            </footer>
        </div>
    );
}

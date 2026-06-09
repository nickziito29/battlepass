import React from "react";
import "../styles/login.css";

export default function Register() {
    return (
        <div className="login-page">
            <div className="logo-box">
                <img src="/src/assets/logo.png" alt="Logo" className="logo-inside" />
            </div>

            <h1 className="welcome-title">Bem-vindo!</h1>
            <p className="welcome-subtitle">
                Entre na sua conta ou crie uma nova para começar
            </p>

            <div className="login-card">
                <h2 className="card-title">Acesse sua conta</h2>
                <p className="card-subtitle">Escolha como deseja continuar</p>

                <div className="tabs">
                    <button className="tab">Entrar</button>
                    <button className="tab active">Criar conta</button>
                </div>

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
                </form>

                <p className="terms">
                    Ao criar uma conta, você concorda com nossos{" "}
                    <a href="#" className="link">Termos de Uso</a>
                </p>

                <div className="divider">
                    <span>ou</span>
                </div>

                <button className="btn-google">Continuar com Google</button>
            </div>

            <footer className="footer">
                © 2025 Sua Empresa. Todos os direitos reservados.
            </footer>
        </div>
    );
}

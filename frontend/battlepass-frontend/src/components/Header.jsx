import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/header.css";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const searchRef = useRef(null);
    const menuRef = useRef(null);
    const userRef = useRef(null);
    const notifRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        // Fecha o popover do usuário de qualquer forma
        setUserOpen(false);

        // Se o usuário já estiver na página de perfil
        if (location.pathname === '/perfil/meu-perfil') {
            e.preventDefault(); // Impede o comportamento padrão do Link
            window.location.reload(); // Força o refresh da página atual
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleUser = (e) => {
        e.stopPropagation();
        setUserOpen(!userOpen);
        setMenuOpen(false);
        setNotifOpen(false);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
        setUserOpen(false);
        setNotifOpen(false);
    };

    const toggleNotify = (e) => {
        e.stopPropagation();
        setNotifOpen(!notifOpen);
        setMenuOpen(false);
        setUserOpen(false);
    };

    return (
        <header className="home-header" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "56px", backgroundColor: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.08)", zIndex: 9999 }}>
            {/* ESQUERDA */}
            <div className="left" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link to="/home">
                    <img src="/src/assets/logo.png" alt="Logo" className="logo" />
                </Link>

                {!searchOpen && (
                    <button className="icon-btn" onClick={() => setSearchOpen(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 22 22"
                            fill="none"
                            stroke="#6B6B6B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <line x1="16.5" y1="16.5" x2="20" y2="20" />
                        </svg>
                    </button>
                )}

                {searchOpen && (
                    <div className={`search-expanded ${searchOpen ? "active" : ""}`}>
                        <button className="close-btn" onClick={() => setSearchOpen(false)}>
                            ✖
                        </button>

                        <div className="search-field">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                stroke="#6B6B6B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginRight: "8px" }}
                            >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16.5" y1="16.5" x2="20" y2="20" />
                            </svg>

                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Buscar academias, lutadores, eventos..."
                                className="search-input"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* DIREITA */}
            <div className="right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                {/* MENU */}
                <div className="popover-wrapper" ref={menuRef}>
                    <button className="icon-btn" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 1.7 24 24" fill="none">
                            <g transform="translate(8 8)" fill="#000000">
                                <rect x="0" y="0" width="4" height="4" rx="0.5" />
                                <rect x="6" y="0" width="4" height="4" rx="0.5" />
                                <rect x="12" y="0" width="4" height="4" rx="0.5" />
                                <rect x="0" y="6" width="4" height="4" rx="0.5" />
                                <rect x="6" y="6" width="4" height="4" rx="0.5" />
                                <rect x="12" y="6" width="4" height="4" rx="0.5" />
                                <rect x="0" y="12" width="4" height="4" rx="0.5" />
                                <rect x="6" y="12" width="4" height="4" rx="0.5" />
                                <rect x="12" y="12" width="4" height="4" rx="0.5" />
                            </g>
                        </svg>
                    </button>

                    {menuOpen && (
                        <div className="popover menu-popover">
                            <h1 className="main-menu-title">Menu</h1>
                            <div className="menu-card-content">
                                <div className="grid-menu">
                                    <div className="grid-item">
                                        <span className="icon">🏋️</span>
                                        <div className="item-text">
                                            <span className="title">Academias</span>
                                            <span className="desc">Conecte-se com academias do Battlepass</span>
                                        </div>
                                    </div>
                                    <div className="grid-item">
                                        <span className="icon">🔥</span>
                                        <div className="item-text">
                                            <span className="title">Treinos</span>
                                            <span className="desc">Explore rotinas e fichas de treinos focadas</span>
                                        </div>
                                    </div>
                                    <div className="grid-item">
                                        <span className="icon">📅</span>
                                        <div className="item-text">
                                            <span className="title">Eventos</span>
                                            <span className="desc">Fique por dentro dos campeonatos e encontros</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* NOTIFICAÇÕES */}
                <div className="popover-wrapper" ref={notifRef}>
                    <button className={`icon-btn ${notifOpen ? "active" : ""}`} onClick={toggleNotify}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 -7.5 20 30" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="badge">3</span>
                    </button>

                    {notifOpen && (
                        <div className="popover notif-popover">
                            <div className="notif-header">
                                <h2>Notificações</h2>
                                <button className="notif-mark-all-btn">Todas como lidas</button>
                            </div>

                            <div className="notif-list">
                                {[
                                    { id: 1, iniciais: "CS", texto: <><strong>Carlos Silva</strong> curtiu seu post sobre treino de jiu-jitsu.</>, tempo: "2min atrás", unread: true },
                                    { id: 2, iniciais: "AM", texto: <>Nova aula cadastrada na sua academia: <strong>Muay Thai Avançado</strong>.</>, tempo: "15min atrás", unread: true },
                                    { id: 3, iniciais: "PR", texto: <><strong>Pedro Rocha</strong> te enviou uma solicitação de amizade.</>, tempo: "1h atrás", unread: true },
                                    { id: 4, iniciais: "LM", texto: <>Luta marcada: você foi desafiado por <strong>Lucas Mendes</strong>.</>, tempo: "Há 3 horas", unread: false },
                                    { id: 5, iniciais: "FZ", texto: <>A academia <strong>Fight Zone</strong> publicou um novo aviso no feed.</>, tempo: "Há 5 horas", unread: false }
                                ].slice(0, 5).map((notif) => (
                                    <div key={notif.id} className="notif-item">
                                        <div className="notif-avatar-circle">{notif.iniciais}</div>
                                        <div className="notif-content">
                                            <p className="notif-text">{notif.texto}</p>
                                            <span className="notif-time">{notif.tempo}</span>
                                        </div>
                                        {notif.unread && <div className="notif-unread-dot"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* BOTÃO DO USUÁRIO REFORMULADO */}
                <div className="popover-wrapper" ref={userRef}>
                    {/* O próprio círculo vira a tag de botão interativa que abre o popover */}
                    <button
                        className={`home-avatar-circle header-avatar-trigger ${userOpen ? "active" : ""}`}
                        onClick={toggleUser}
                        title="Opções da conta"
                    >
                        NB
                    </button>

                    {userOpen && (
                        <div className="popover user-popover">
                            {/* Card de Perfil Interno Completo como Link */}
                            <div className="user-card-profile">
                                <Link
                                    to="/perfil/meu-perfil"
                                    className="user-profile-info-link"
                                    onClick={handleProfileClick}
                                >
                                    <div className="home-avatar-circle-popover">NB</div>
                                    <span className="user-profile-name">Nikolas Brendo</span>
                                </Link>
                            </div>

                            {/* Lista de Opções */}
                            <div className="user-menu-list">
                                <div className="user-menu-item" onClick={() => setUserOpen(false)}>
                                    <div className="icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7.43-2.53a1 1 0 0 0-.05-.47l1.23-.96a.5.5 0 0 0 .12-.63l-1.16-2a.5.5 0 0 0-.6-.22l-1.46.59a1 1 0 0 1-1.15-.28 1 1 0 0 1-.22-1.17l.59-1.46a.5.5 0 0 0-.22-.6l-2-1.16a.5.5 0 0 0-.63.12l-.96 1.23a1 1 0 0 1-1.44 0l-.96-1.23a.5.5 0 0 0-.63-.12l-2 1.16a.5.5 0 0 0-.22.6l.59 1.46a1 1 0 0 1-.22 1.17 1 1 0 0 1-1.15.28l-1.46-.59a.5.5 0 0 0-.6.22l-1.16 2a.5.5 0 0 0 .12.63l1.23.96a1 1 0 0 1 0 1.44l-1.23.96a.5.5 0 0 0-.12.63l1.16 2a.5.5 0 0 0 .62.22l1.46-.59a1 1 0 0 1 1.15.28 1 1 0 0 1 .22 1.17l-.59 1.46a.5.5 0 0 0 .22.6l2 1.16a.5.5 0 0 0 .63-.12l.96-1.23a1 1 0 0 1 1.44 0l.96 1.23a.5.5 0 0 0 .63.12l2-1.16a.5.5 0 0 0 .22-.6l-.59-1.46a1 1 0 0 1 .22-1.17 1 1 0 0 1 1.15-.28l1.46.59a.5.5 0 0 0 .6-.22l1.16-2a.5.5 0 0 0-.12-.63l-1.23-.96z"/></svg>
                                    </div>
                                    <div className="user-item-text">Configurações e privacidade</div>
                                </div>

                                <div className="user-menu-item">
                                    <div className="icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                                    </div>
                                    <div className="user-item-text">Sair</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
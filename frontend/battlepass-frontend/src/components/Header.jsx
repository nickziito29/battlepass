import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./reader.css";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const searchRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="home-header">
            <div className="left">
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
            <div className="right">

                {/* MENU */}
                <div className="popover-wrapper" ref={menuRef}>
                    <button
                        className="icon-btn"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setNotifOpen(false);
                            setUserOpen(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 1.7 24 24"
                            fill="none"
                        >
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
                                { /* <div className="menu-search">...</div> pesquisa de menu*/}
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
                <div className="popover-wrapper">
                    <button className="icon-btn" onClick={() => setNotifOpen(!notifOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 -7.5 20 30"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>

                        <span className="badge">3</span>
                    </button>

                    {notifOpen && (
                        <div className="popover notif-popover">
                            <div className="notif-item unread">Novo treino disponível</div>
                            <div className="notif-item unread">Evento amanhã</div>
                            <div className="notif-item">Atualização de perfil</div>

                            <button className="view-all">Ver todas</button>
                        </div>
                    )}
                </div>


                {/* USUÁRIO */}
                <div className="popover-wrapper">
                    <button className="avatar" onClick={() => setUserOpen(!userOpen)}>
                        AS
                    </button>

                    {userOpen && (
                        <div className="popover user-popover">
                            <div className="user-info">
                                <strong>Alex Silva</strong>
                                <p>alex@email.com</p>
                            </div>

                            <div className="user-links">
                                <button>Perfil</button>
                                <button>Configurações</button>
                            </div>

                            <button className="logout">Sair</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
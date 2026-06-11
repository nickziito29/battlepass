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
    const userRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false); // Fecha ao clicar fora
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleUser = (e) => {
        e.stopPropagation(); // Impede que o clique no botão se propague para o document
        setUserOpen(!userOpen);
        setMenuOpen(false);
        setNotifOpen(false);
    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Impede que o clique no botão se propague para o document
        setMenuOpen(!userOpen);
        setUserOpen(false);
        setNotifOpen(false);
    };

    const toggleNotify = (e) => {
        e.stopPropagation(); // Impede que o clique no botão se propague para o document
        setNotifOpen(!userOpen);
        setMenuOpen(false);
        setUserOpen(false);
    };

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
                        onClick={toggleMenu}
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
                <div className="popover-wrapper" ref={notifRef}>
                    <button
                        className={`icon-btn ${notifOpen ? "active" : ""}`}
                        onClick={toggleNotify}
                    >
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
                            {/* Topo do Menu */}
                            <div className="notif-header">
                                <h2>Notificações</h2>
                                <button className="notif-options-btn">•••</button>
                            </div>

                            {/* Filtros: Tudo / Não lidas */}
                            <div className="notif-filters">
                                <button className="filter-chip active">Tudo</button>
                                <button className="filter-chip">Não lidas</button>
                            </div>

                            {/* Lista de Notificações */}
                            <div className="notif-list">
                                <span className="notif-section-title">Hoje</span>

                                {/* Item 1: Sugestão de Amizade */}
                                <div className="notif-item unread">
                                    <div className="avatar-badge-wrapper">
                                        <img src="/src/assets/avatar1.png" alt="" className="notif-avatar" />
                                        <div className="notif-icon-badge badge-gray">🔔</div>
                                    </div>
                                    <div className="notif-content">
                                        <p>Você tem uma nova sugestão de amizade: <strong>Esley Estefanny</strong>.</p>
                                        <span className="notif-time">13 h</span>
                                    </div>
                                </div>

                                <span className="notif-section-title-between">Anteriores <a href="#vertudo">Ver tudo</a></span>

                                {/* Item 2: Login aprovado */}
                                <div className="notif-item">
                                    <div className="avatar-badge-wrapper">
                                        <img src="/src/assets/avatar-user.png" alt="" className="notif-avatar" />
                                        <div className="notif-icon-badge badge-blue">🛡️</div>
                                    </div>
                                    <div className="notif-content">
                                        <p>Você aprovou um login.</p>
                                        <span className="notif-time blue-text">1 d</span>
                                    </div>
                                    <div className="unread-dot"></div>
                                </div>

                                {/* Item 3: Convite de Grupo com botões de Ação */}
                                <div className="notif-item action-required">
                                    <div className="avatar-badge-wrapper">
                                        <img src="/src/assets/avatar2.png" alt="" className="notif-avatar" />
                                        <div className="notif-icon-badge badge-blue">👥</div>
                                    </div>
                                    <div className="notif-content">
                                        <p><strong>Luzia Andrade</strong> convidou você para participar do grupo público <strong>DIVULGA BARRA DOS...</strong></p>
                                        <span className="notif-time blue-text">4 d</span>
                                        <div className="notif-actions">
                                            <button className="btn-primary">Entrar</button>
                                            <button className="btn-secondary">Excluir</button>
                                        </div>
                                    </div>
                                    <div className="unread-dot"></div>
                                </div>

                                {/* Item 4: Aceitou pedido de amizade */}
                                <div className="notif-item">
                                    <div className="avatar-badge-wrapper">
                                        <img src="/src/assets/avatar2.png" alt="" className="notif-avatar" />
                                        <div className="notif-icon-badge badge-blue-light">👤</div>
                                    </div>
                                    <div className="notif-content">
                                        <p><strong>Luzia Andrade</strong> aceitou seu pedido de amizade.</p>
                                        <span className="notif-time">1 sem</span>
                                    </div>
                                </div>

                                {/* Item 5: Item Salvo */}
                                <div className="notif-item">
                                    <div className="avatar-badge-wrapper">
                                        <img src="/src/assets/item-thumb.png" alt="" className="notif-avatar" />
                                        <div className="notif-icon-badge badge-purple">🔖</div>
                                    </div>
                                    <div className="notif-content">
                                        <p>Você salvou um item de <strong>Mago Revoada</strong>.</p>
                                        <span className="notif-time blue-text">1 sem</span>
                                    </div>
                                    <div className="unread-dot"></div>
                                </div>
                            </div>

                            {/* Botão de histórico inferior */}
                            <button className="load-more-notifs">Ver notificações anteriores</button>
                        </div>
                    )}
                </div>

                {/* USUÁRIO */}
                <div className="popover-wrapper" ref={userRef}>
                    <button
                        className={`avatar-btn ${userOpen ? "active" : ""}`}
                        onClick={toggleUser}
                    >
                        <img src="/src/assets/avatar-exemplo.png" alt="Avatar" className="avatar-img" />
                        <span className="avatar-arrow">▼</span>
                    </button>

                    {userOpen && (
                        <div className="popover user-popover">
                            {/* Bloco de Perfil Interno (Card Branco Superior) */}
                            <div className="user-card-profile">
                                <div className="user-profile-info">
                                    <img src="/src/assets/avatar-exemplo.png" alt="Nikolas Brendo" className="user-profile-img" />
                                    <span className="user-profile-name">Nikolas Brendo</span>
                                </div>
                            </div>

                            {/* Lista de Opções */}
                            <div className="user-menu-list">
                                <div className="user-menu-item">
                                    <div className="icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7.43-2.53a1 1 0 0 0-.05-.47l1.23-.96a.5.5 0 0 0 .12-.63l-1.16-2a.5.5 0 0 0-.6-.22l-1.46.59a1 1 0 0 1-1.15-.28 1 1 0 0 1-.22-1.17l.59-1.46a.5.5 0 0 0-.22-.6l-2-1.16a.5.5 0 0 0-.63.12l-.96 1.23a1 1 0 0 1-1.44 0l-.96-1.23a.5.5 0 0 0-.63-.12l-2 1.16a.5.5 0 0 0-.22.6l.59 1.46a1 1 0 0 1-.22 1.17 1 1 0 0 1-1.15.28l-1.46-.59a.5.5 0 0 0-.6.22l-1.16 2a.5.5 0 0 0 .12.63l1.23.96a1 1 0 0 1 0 1.44l-1.23.96a.5.5 0 0 0-.12.63l1.16 2a.5.5 0 0 0 .6.22l1.46-.59a1 1 0 0 1 1.15.28 1 1 0 0 1 .22 1.17l-.59 1.46a.5.5 0 0 0 .22.6l2 1.16a.5.5 0 0 0 .63-.12l.96-1.23a1 1 0 0 1 1.44 0l.96 1.23a.5.5 0 0 0 .63.12l2-1.16a.5.5 0 0 0 .22-.6l-.59-1.46a1 1 0 0 1 .22-1.17 1 1 0 0 1 1.15-.28l1.46.59a.5.5 0 0 0 .6-.22l1.16-2a.5.5 0 0 0-.12-.63l-1.23-.96z"/></svg>
                                    </div>
                                    <div className="user-item-text">Configurações e privacidade</div>
                                    <span className="arrow-right">⟩</span>
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
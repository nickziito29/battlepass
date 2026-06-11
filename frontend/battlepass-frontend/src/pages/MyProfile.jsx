import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/myprofile.css';

export default function MyProfile() {
    const { username } = useParams();

    // Estados do Modal de criar post e texto
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postText, setPostText] = useState("");

    // ADICIONADO: Estados para controlar o menu da foto de perfil
    const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false);
    const photoMenuRef = useRef(null);

    const [userData] = useState({
        nome: "Nikolas Brendo",
        username: username || "@nikolasbrendo",
        // NOVO: fotoUrl removida. O sistema agora usa as iniciais
        iniciais: "NB",
        faixa: "Faixa Roxa",
        local: "Aracaju / SE",
        membroDesde: "Março 2021",
        nascimento: "29 de junho de 1995",
        bio: "Praticante de Muay Thai e Jiu-Jitsu. Focado em evolução constante e alta performance nos tatames. 🥊🥋",
        stats: {
            treinos: 156,
            sequencia: 12,
            torneios: 8,
            medalhas: 5
        }
    });

    const [posts] = useState([
        {
            id: 1,
            author: "Nikolas Brendo",
            iniciais: "NB",
            // NOVO: fotoUrl removida do post do usuário para usar as iniciais
            meta: "Faixa Roxa • Aracaju / SE",
            time: "Há 2 horas",
            content: "Treino insano de submission hoje focado em passagens de guarda. Ajustando os detalhes para o próximo open! 🥋⚡",
            likes: 156,
            comments: 24,
            shares: 8
        }
    ]);

    const [activeTab, setActiveTab] = useState('visao-geral');

    // ADICIONADO: Fechar o menu da foto ao clicar fora dele
    useEffect(() => {
        function handleClickOutside(event) {
            if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) {
                setIsPhotoMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // ==========================================
    // ADICIONADO: Estados para o mini-calendário
    // ==========================================
    const hoje = new Date();
    const [currentDate] = useState(hoje);
    const [selectedDay, setSelectedDay] = useState(hoje.getDate());
    const [eventText, setEventText] = useState("");
    // Mock inicial de eventos (chave é o dia do mês atual)
    const [events, setEvents] = useState({
        15: "Exame de Faixa 🥋",
        20: "Seminário de Submission ⚡"
    });

    // ==========================================
    // ADICIONADO: Funções auxiliares do calendário
    // ==========================================
    const renderCalendarDays = () => {
        const ano = currentDate.getFullYear();
        const mes = currentDate.getMonth();

        // Primeiro dia do mês e total de dias
        const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
        const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

        const daysArray = [];

        // Preenche os espaços vazios antes do primeiro dia do mês
        for (let i = 0; i < primeiroDiaDaSemana; i++) {
            daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Preenche os dias reais do mês
        for (let dia = 1; dia <= totalDiasNoMes; dia++) {
            const temEvento = !!events[dia];
            const isSelected = dia === selectedDay;
            const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();

            daysArray.push(
                <div
                    key={`day-${dia}`}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isHoje ? 'today' : ''}`}
                    onClick={() => {
                        setSelectedDay(dia);
                        setEventText(events[dia] || "");
                    }}
                >
                    <span className="day-number">{dia}</span>
                    {temEvento && <span className="calendar-event-dot"></span>}
                </div>
            );
        }

        return daysArray;
    };

    const handleSaveEvent = () => {
        if (eventText.trim() === "") {
            const updatedEvents = { ...events };
            delete updatedEvents[selectedDay];
            setEvents(updatedEvents);
        } else {
            setEvents({
                ...events,
                [selectedDay]: eventText
            });
        }
    };

    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // Filtra para exibir apenas os posts do próprio dono do perfil
    const postsDoUsuario = posts.filter(post => post.author === userData.nome);

    return (
        <div className="profile-page-wrapper">
            <Header />

            <main className="profile-main-container">

                {/* MANTIDA SUA CAIXA ÚNICA DO PERFIL */}
                <div className="profile-card-box">
                    <div className="profile-info-content">

                        {/* ATUALIZADO: CONTAINER COM INICIAIS E ACESSO AO DROPDOWN */}
                        <div className="avatar-profile-wrapper" ref={photoMenuRef}>
                            <div
                                className="avatar-profile-circle"
                                onClick={() => setIsPhotoMenuOpen(!isPhotoMenuOpen)}
                                title="Gerenciar foto de perfil"
                                role="button"
                                tabIndex={0}
                            >
                                {/* NOVO: Exibe as iniciais em vez da foto real */}
                                {userData.iniciais}
                            </div>

                            {/* Ícone de câmera flutuante de modificação */}
                            <div
                                className="change-profile-photo-btn"
                                onClick={() => setIsPhotoMenuOpen(!isPhotoMenuOpen)}
                                title="Alterar foto de perfil"
                                role="button"
                                tabIndex={0}
                            >
                                📷
                            </div>

                            {/* DROPDOWN DE OPÇÕES DA FOTO */}
                            {isPhotoMenuOpen && (
                                <div className="photo-options-dropdown">
                                    <button className="photo-dropdown-item" onClick={() => setIsPhotoMenuOpen(false)}>
                                        <span className="dropdown-item-icon">👤</span> Ver foto do perfil
                                    </button>
                                    <button className="photo-dropdown-item" onClick={() => setIsPhotoMenuOpen(false)}>
                                        <span className="dropdown-item-icon">🖼️</span> Escolher foto do perfil
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="user-profile-details">
                            <div className="name-and-action-row">
                                <div className="title-block">
                                    <h1>{userData.nome}</h1>
                                    <span className="profile-username-tag">{userData.username}</span>
                                </div>
                                <button className="edit-profile-button">
                                    Editar Perfil
                                </button>
                            </div>

                            <div className="user-meta-info">
                                <span>🥋 {userData.faixa}</span>
                                <span>📍 {userData.local}</span>
                                <span>📅 Membro desde {userData.membroDesde}</span>
                            </div>

                            <p className="user-bio-text">
                                {userData.bio}
                            </p>
                        </div>
                    </div>

                    {/* BARRA DE ESTATÍSTICAS MANTIDA */}
                    <div className="profile-stats-bar">
                        <div className="stat-item">
                            <span className="stat-value">{userData.stats.treinos}</span>
                            <span className="stat-label">Treinos</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">🔥 {userData.stats.sequencia}</span>
                            <span className="stat-label">Sequência</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{userData.stats.torneios}</span>
                            <span className="stat-label">Torneios</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{userData.stats.medalhas}</span>
                            <span className="stat-label">Medalhas</span>
                        </div>
                    </div>
                </div>

                {/* ABAS DE NAVEGAÇÃO MANTIDAS */}
                <nav className="profile-tabs-nav">
                    <button
                        className={`tab-btn ${activeTab === 'visao-geral' ? 'active' : ''}`}
                        onClick={() => setActiveTab('visao-geral')}
                    >
                        Visão Geral
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'progressao' ? 'active' : ''}`}
                        onClick={() => setActiveTab('progressao')}
                    >
                        Progressão
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'conquistas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('conquistas')}
                    >
                        Conquistas
                    </button>
                </nav>

                {/* LAYOUT GRID MANTIDO */}
                <section className="profile-tab-view-container">
                    {activeTab === 'visao-geral' && (
                        <div className="facebook-layout-grid">

                            {/* COLUNA SIDEBAR */}
                            <div className="facebook-sidebar-column">
                                <div className="sidebar-box-card">
                                    <div className="box-card-header">
                                        <h3>Graduação</h3>
                                        <button className="box-edit-icon-btn" title="Editar dados">✏️</button>
                                    </div>
                                    <div className="box-card-content">
                                        <div className="info-data-item">
                                            <span className="data-icon">🎂</span>
                                            <span className="data-text">{userData.nascimento}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-box-card">
                                    <div className="box-card-header">
                                        <h3>Calendário</h3>
                                        <span className="calendar-current-month">
                                            {nomeMeses[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </span>
                                    </div>
                                    <div className="box-card-content">

                                        {/* Grade do Calendário */}
                                        <div className="mini-calendar-wrapper">
                                            <div className="calendar-weekdays-header">
                                                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                                            </div>
                                            <div className="calendar-days-grid">
                                                {renderCalendarDays()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COLUNA FEED */}
                            <div className="facebook-feed-column">

                                {/* CAIXA DE COMPARTILHAR ATUALIZADA IGUAL À HOME */}
                                <div className="facebook-share-card">
                                    <div className="share-row-top">
                                        {/* NOVO: Exibe as iniciais em vez da foto real */}
                                        <div className="share-avatar-circle initials">{userData.iniciais}</div>
                                        <div
                                            className="share-input-mock"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Compartilhe sua evolução...
                                        </div>
                                    </div>

                                </div>

                                {/* FILTROS DE POSTS */}
                                <div className="facebook-posts-filter-card">
                                    <div className="filter-header-row">
                                        <h3>Posts</h3>
                                    </div>

                                </div>

                                {/* LISTA DE POSTS DO PRÓPRIO USUÁRIO */}
                                <div className="profile-posts-list">
                                    {postsDoUsuario.length > 0 ? (
                                        postsDoUsuario.map(post => (
                                            <div key={post.id} className="feed-post-card">
                                                <div className="post-card-header">
                                                    {/* NOVO: Exibe as iniciais em vez da foto real */}
                                                    <div className="post-author-avatar initials">{post.iniciais}</div>
                                                    <div className="post-header-text">
                                                        <h4>{post.author}</h4>
                                                        <span>{post.meta} • {post.time}</span>
                                                    </div>
                                                    <button className="post-options-dot-btn">•••</button>
                                                </div>
                                                <div className="post-card-body">
                                                    <p>{post.content}</p>
                                                </div>
                                                <div className="post-card-counters">
                                                    <span>💜 {post.likes} curtidas</span>
                                                    <div className="counters-right">
                                                        <span>{post.comments} comentários</span>
                                                        <span>{post.shares} compartilhamentos</span>
                                                    </div>
                                                </div>
                                                <div className="post-card-actions-bar">
                                                    <button className="post-action-trigger-btn">💜 Curtir</button>
                                                    <button className="post-action-trigger-btn">💬 Comentar</button>
                                                    <button className="post-action-trigger-btn">🔗 Compartilhar</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-state-card">
                                            <p>Você ainda não fez nenhuma publicação.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'progressao' && <div className="empty-state-card"><p>Gráficos e Progressão de treinos.</p></div>}
                    {activeTab === 'conquistas' && <div className="empty-state-card"><p>Suas medalhas e conquistas do Battle Pass.</p></div>}
                </section>
            </main>

            {/* MODAL DE CRIAR POST */}
            {isModalOpen && (
                <div className="facebook-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="facebook-modal-box" onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header-row">
                            <h2>Criar post</h2>
                            <button className="close-modal-circle-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>

                        <div className="modal-user-identity-row">
                            {/* NOVO: Exibe as iniciais em vez da foto real */}
                            <div className="modal-user-avatar initials">{userData.iniciais}</div>
                            <div className="modal-user-meta-block">
                                <h4>{userData.nome}</h4>
                            </div>
                        </div>

                        <div className="modal-input-textarea-wrapper">
                            <textarea
                                placeholder={`No que você está pensando, ${userData.nome.split(' ')[0]}?`}
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                        </div>

                        <button
                            className={`modal-submit-post-btn ${postText.trim() ? 'active' : ''}`}
                            disabled={!postText.trim()}
                        >
                            Postar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
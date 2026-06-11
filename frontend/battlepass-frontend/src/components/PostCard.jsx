import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css'

export default function PostCard({ post }) {
    const [isMenuAberto, setIsMenuAberto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function fecharMenuAoClicarFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuAberto(false);
            }
        }
        document.addEventListener('mousedown', fecharMenuAoClicarFora);
        return () => {
            document.removeEventListener('mousedown', fecharMenuAoClicarFora);
        };
    }, []);

    const handleDenunciar = (postId) => {
        console.warn(`Post ${postId} denunciado!`);
        alert(`Você denunciou a publicação de ${post.autorNome}.`);
        setIsMenuAberto(false);
    };

    return (
        <div className="post-card">
            <div className="post-header">
                {/* CORREÇÃO AQUI: Avatar com link para o perfil */}
                <a href={`/perfil/${post.id}`} className="home-avatar-circle" title={`Ver perfil de ${post.autorNome}`}>
                    {post.autorIniciais}
                </a>

                <div className="post-header-info">
                    {/* Também adicionando link no nome se quiser */}
                    <a href={`/perfil/${post.id}`} className="post-autor-name">
                        <h3>{post.autorNome}</h3>
                    </a>
                    <p className="post-subtitulo">{post.subtitulo}</p>
                    <p className="post-time">{post.tempo}</p>
                </div>

                <div className="post-options-container" ref={menuRef}>
                    <button
                        className={`post-options-btn ${isMenuAberto ? 'active' : ''}`}
                        onClick={() => setIsMenuAberto(!isMenuAberto)}
                    >
                        •••
                    </button>

                    {isMenuAberto && (
                        <div className="post-options-dropdown">
                            <button
                                className="dropdown-item denunciar"
                                onClick={() => handleDenunciar(post.id)}
                            >
                                <span className="dropdown-icon">⚠️</span> Denunciar Post
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="post-body">
                <p>{post.conteudo}</p>
            </div>

            <div className="post-counters">
                <div className="likes-count">{post.curtidas} curtidas</div>
                <div className="engagement-count">
                    <span>{post.comentarios} comentários</span>
                    <span>{post.compartilhamentos} compartilhamentos</span>
                </div>
            </div>

            <div className="post-divider"></div>

            <div className="post-actions">
                <button className="action-btn"><span className="icon">🤍</span> Curtir</button>
                <button className="action-btn"><span className="icon">💬</span> Comentar</button>
                <button className="action-btn"><span className="icon">🔗</span> Compartilhar</button>
            </div>
        </div>
    );
}
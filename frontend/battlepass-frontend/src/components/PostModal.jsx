import React, { useState, useEffect } from 'react';
import '../styles/PostModal.css';

export default function PostModal({ isOpen, onClose, userName, userIniciais }) {
    const [texto, setTexto] = useState('');

    // Impede o scroll do fundo quando o modal está aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Cabeçalho do Modal */}
                <div className="modal-header">
                    <h2>Criar post</h2>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {/* Informações do Usuário */}
                    <div className="modal-user-info">
                        <div className="home-avatar-circle">{userIniciais}</div>
                        <div className="user-details">
                            <span className="user-name">{userName}</span>
                        </div>
                    </div>

                    {/* Área de Texto */}
                    <textarea
                        className="modal-textarea"
                        placeholder={`No que você está pensando, ${userName.split(' ')[0]}?`}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        autoFocus
                    ></textarea>

                </div>

                {/* Botão Postar */}
                <div className="modal-footer">
                    <button
                        className={`postar-button ${texto.trim() ? 'active' : ''}`}
                        disabled={!texto.trim()}
                    >
                        Postar
                    </button>
                </div>

            </div>
        </div>
    );
}
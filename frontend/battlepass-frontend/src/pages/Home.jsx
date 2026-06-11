import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/home.css';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            autorNome: "Carlos Oliveira",
            autorIniciais: "CO",
            subtitulo: "Faixa Roxa • Gracie Barra SP",
            tempo: "Há 2 horas",
            conteudo: "Acabei de conquistar minha faixa roxa! 🥋 Muito obrigado ao mestre e todos os parceiros de treino. A jornada continua! 💪",
            curtidas: 156,
            comentarios: 24,
            compartilhamentos: 8
        },
        {
            id: 2,
            autorNome: "Academia Fight Zone",
            autorIniciais: "FZ",
            subtitulo: "Rio de Janeiro, RJ",
            tempo: "Há 5 horas",
            conteudo: "Aulas de Muay Thai com o professor Rafael! Vagas limitadas para a turma iniciante. Matricule-se agora!",
            curtidas: 89,
            comentarios: 12,
            compartilhamentos: 15
        }
    ]);

    return (
        <div className="home-wrapper">
            <Header />

            <main className="home-container">

                {/* CARD DE COMPARTILHAMENTO */}
                <div className="share-card">
                    <div className="share-top">
                        {/* CORREÇÃO AQUI: Círculo com link para o próprio perfil do Nikolas */}
                        <a href="/perfil/meu-perfil" className="home-avatar-circle" title="Ver meu perfil">
                            NB
                        </a>

                        {/* Clicar na barra de texto abre o modal */}
                        <div className="share-input-fake" onClick={() => setIsModalOpen(true)}>
                            Compartilhe sua evolução...
                        </div>
                    </div>
                    <div className="share-divider"></div>
                    <div className="share-actions">
                        <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                            <span className="icon-green">🖼️</span> Foto
                        </button>
                        <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                            <span className="icon-red">📹</span> Vídeo
                        </button>
                        <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                            <span className="icon-gold">🏆</span> Conquista
                        </button>
                    </div>
                </div>

                <div className="posts-list">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>

            <PostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userName="Nikolas Brendo"
                userIniciais="NB"
            />
        </div>
    );
}
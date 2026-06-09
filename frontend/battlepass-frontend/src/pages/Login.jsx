import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Login enviado:", { email, password });
        alert("Login enviado (sem autenticação)");
    }

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2 style={styles.title}>BattlePass Login</h2>

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button} type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
    },
    card: {
        background: "#1e293b",
        padding: "32px",
        borderRadius: "12px",
        width: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    title: {
        color: "#fff",
        textAlign: "center",
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
    },
    button: {
        padding: "12px",
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

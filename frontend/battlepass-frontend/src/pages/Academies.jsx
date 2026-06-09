import { useState } from "react";
import { createAcademy } from "../api/academies";

function Academies() {
    const [academyName, setAcademyName] = useState("");
    const [ownerId, setOwnerId] = useState("");

    async function handleCreate(e) {
        e.preventDefault();
        await createAcademy({ name: academyName, description: "Nova academia" }, ownerId);
        setAcademyName("");
        setOwnerId("");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Academias</h2>
            <form onSubmit={handleCreate}>
                <input
                    placeholder="Nome da academia"
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                />
                <input
                    placeholder="ID do dono"
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                />
                <button type="submit">Criar academia</button>
            </form>
        </div>
    );
}

export default Academies;

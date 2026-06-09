import { useEffect, useState } from "react";
import { getUsers, createUser } from "../api/users";

function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await createUser(form);
        setForm({ name: "", email: "", password: "" });
        await loadUsers();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Usuários</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="Senha"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Criar</button>
            </form>

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.name} ({u.email}) — roles: {u.roles?.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;

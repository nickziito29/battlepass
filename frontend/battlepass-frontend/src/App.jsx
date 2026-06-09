import Login from "./pages/Login";

export default function App() {
    return (
        <div style={styles.app}>
            <Login />
        </div>
    );
}

const styles = {
    app: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
    },
};
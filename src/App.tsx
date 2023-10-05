import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import styles from "./app.module.scss";
import Registration from "./pages/registration";

function App() {
  return (
    <div className={styles.global}>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
    </div>
  );
}

export default App;

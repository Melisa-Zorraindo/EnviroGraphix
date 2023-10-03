import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.global}>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}

export default App;

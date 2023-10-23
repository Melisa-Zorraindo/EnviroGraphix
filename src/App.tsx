import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import styles from "./app.module.scss";
import Registration from "./pages/registration";
import Login from "./pages/login";

function App() {
  return (
    <div className={styles.global}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

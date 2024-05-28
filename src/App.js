import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import {useEffect, useState} from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
    const [user, setUser] = useState(null);
    // Token으로 유저정보 가져옴
    const getUser = async () => {
        try {
            const storedToken = sessionStorage.getItem("token");

            if (storedToken) {
                // api.defaults.headers['authorization'] = "Bearer " + storedToken; // 토큰을 이 부분에서 가져오는 것보다는 api에서 최초 호출할 때 바로 가져오는게 불필요한 코드를 줄일 수 있음
                const response = await api.get("/user/me");
                setUser(response.data.user);
            }
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Routes>
            <Route path="/"
                   element={
                       <PrivateRoute user={user}>
                            <TodoPage setUser={setUser}/>
                        </PrivateRoute>
                   }
            />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/login" element={<LoginPage user = {user} setUser={setUser}/>} />
        </Routes>
    );
}

export default App;
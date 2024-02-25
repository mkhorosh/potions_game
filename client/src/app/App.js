import React, { useEffect, useState } from 'react';
import './App.css';
import { GameSession } from '../game-session/GameSession';
import { MainMenu } from '../menu/MainMenu';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GameMenu } from '../menu/GameMenu';
import AuthPage from '../menu/AuthPage';
import RegisterPage from '../menu/RegisterPage';
import axios from 'axios';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    console.log("data" + data);
    const dataObj = JSON.parse(data);
    console.log(dataObj);

    if (!dataObj) {
      setUser(null);
    } else {
      axios.get('http://localhost:5000/self', {
        headers: {
          authorization: `bearer ${dataObj.token}`
        }
      }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setUser(response);
        } else {
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  if (!user) {
    return (
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/start" element={<MainMenu />} />
      <Route path="/menu" element={<GameMenu />} />
      <Route path='/play' exact element={<GameSession />} />
      <Route path="*" element={<Navigate to="/start" replace />} />
    </Routes>

  );
}

export default App;

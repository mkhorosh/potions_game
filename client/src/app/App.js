import React, { useEffect, useState } from 'react';
import './App.css';
import { GameSession } from '../game-session/GameSession';
import { MainMenu } from '../menu/MainMenu';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GameMenu } from '../menu/GameMenu';
import AuthPage from '../auth/AuthPage';
import RegisterPage from '../auth/RegisterPage';
import axios from 'axios';
import { CodeGameMenu } from '../menu/CodeGameMenu';
import { RoomsList } from '../menu/RoomsList';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    console.log("data" + data);
    const dataObj = JSON.parse(data);
    console.log(dataObj);

    const loadAsyncStuff = async () => {
      const response = await axios.get('http://localhost:5000/self', {
        headers: {
          authorization: `bearer ${dataObj.token}`
        }
      });
      if (response.status === 200) {
        setUser(response);
      } else {
      }
    }

    if (!dataObj) {
      setUser(null);
    } else {
      loadAsyncStuff();
    }
  }, []);

  return (
    <Routes>
      <Route path="/start" element={<MainMenu setUser={setUser} />} />
      <Route path="/menu" element={<GameMenu />} />
      <Route path="/friendly-game" element={<CodeGameMenu />} />
      <Route path="/rooms-list" element={<RoomsList/>}/>
      <Route path='/play' exact element={<GameSession />} />
      <Route path='/login' element={<AuthPage setUser={setUser} />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/start" replace />} />
    </Routes>

  );
}

export default App;

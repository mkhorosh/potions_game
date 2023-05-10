import './App.css';
import {GameSession} from '../game-session/GameSession';
import { MainMenu } from '../menu/MainMenu';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { GameMenu } from '../menu/GameMenu';


function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route path="/start" element={<MainMenu />} />
        <Route path="/menu" element={<GameMenu />} />
        <Route path="/game" element={<GameSession />} />
        <Route path="*" element={<Navigate to="/start" replace />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

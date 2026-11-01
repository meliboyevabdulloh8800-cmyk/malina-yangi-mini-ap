import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { screens } from './screens';
import { Page } from './App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function AdminHome() {
  const adminScreens = screens.filter(screen => screen.area === 'admin');

  return (
    <main className="content">
      <section className="welcome">
        <div>
          <small>MALINA · ADMINISTRATION</small>
          <h1>Admin boshqaruv paneli</h1>
          <p>Platformaning 27–50 boshqaruv ekranlari.</p>
        </div>
      </section>
      <div className="tiles">
        {adminScreens.map(screen => (
          <Link to={'/screen/' + screen.id} key={screen.id}>
            <div>
              <small>{String(screen.id).padStart(2, '0')} · ADMIN</small>
              <b>{screen.title}</b>
              <p>{screen.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function AdminScreen() {
  const { id } = useParams();
  const screen = screens.find(item => item.id === Number(id) && item.area === 'admin');
  if (!screen) return <Navigate to="/" replace />;
  return <Page />;
}

export default function AdminApp() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Telegram orqali ruxsat tekshirilmoqda...');

  useEffect(() => {
    let active = true;

    async function login() {
      const initData = window.Telegram?.WebApp?.initData || '';
      if (!initData) {
        if (active) {
          setStatus('denied');
          setMessage('Admin panelga kirish uchun uni Telegram ichidan oching.');
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/admin/telegram`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        });
        const data = await response.json();

        if (!response.ok || !data.accessToken) {
          throw new Error(data.message || 'Admin ruxsati berilmadi.');
        }

        const check = await fetch(`${API_URL}/admin/overview`, {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        });
        if (!check.ok) throw new Error('Admin token tasdiqlanmadi.');

        if (active) {
          setToken(data.accessToken);
          setStatus('allowed');
        }
      } catch (error) {
        if (active) {
          setStatus('denied');
          setMessage(error instanceof Error ? error.message : 'Kirish rad etildi.');
        }
      }
    }

    login();
    return () => { active = false; };
  }, []);

  if (status !== 'allowed') {
    return (
      <main className="welcome-screen">
        <section className="welcome-card">
          <small>MALINA · ADMIN</small>
          <h1>{status === 'checking' ? 'Tekshirilmoqda' : 'Kirish cheklangan'}</h1>
          <p>{message}</p>
        </section>
      </main>
    );
  }

  return (
    <div className="shell" data-admin-token={token ? 'verified' : ''}>
      <main>
        <header>
          <div className="crumb">MALINA <span>›</span> ADMIN</div>
          <span className="online">Admin tasdiqlandi</span>
        </header>
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/screen/:id" element={<AdminScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer>Malina Admin © 2026 <span>27–50 · Boshqaruv</span></footer>
      </main>
    </div>
  );
}

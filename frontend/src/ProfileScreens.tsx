import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Pencil, Save, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type Profile = {
  id: string;
  firstName: string;
  lastName: string | null;
  birthDate: string | null;
  gender: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  interests: string[];
  status: string;
  isVerified: boolean;
};

function getInitData() {
  return window.Telegram?.WebApp?.initData || '';
}

async function loadProfile(): Promise<Profile> {
  const initData = getInitData();

  if (!initData) {
    throw new Error('Telegram Mini App ichidan oching. Telegram tasdiqlash ma’lumoti topilmadi.');
  }

  const login = await fetch(`${API_URL}/auth/telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });

  if (!login.ok) {
    throw new Error('Telegram orqali kirish amalga oshmadi. Qayta urinib ko‘ring.');
  }

  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: { 'x-telegram-init-data': initData },
  });

  if (!response.ok) {
    throw new Error('Profil ma’lumotlarini yuklab bo‘lmadi.');
  }

  const data = await response.json();
  return data.user;
}

export function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      setProfile(await loadProfile());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className="content">
      <div className="heading">
        <div>
          <small>TELEGRAM MINI APP · 19/50</small>
          <h1><User /> Profilim</h1>
          <p>Shaxsiy ma’lumotlaringiz va profilingiz holati.</p>
        </div>
        <Link className="primary linkbtn" to="/screen/20">
          <Pencil size={15} /> Tahrirlash
        </Link>
      </div>

      {loading && <section className="card">Profil yuklanmoqda...</section>}
      {error && (
        <section className="card">
          <p className="message">{error}</p>
          <button className="primary" onClick={() => void refresh()}>
            <RefreshCw size={15} /> Qayta urinish
          </button>
        </section>
      )}

      {profile && (
        <section className="card profile-card">
          <div className="profile-avatar">
            {profile.firstName?.charAt(0)?.toUpperCase() || 'M'}
          </div>
          <h2>{profile.firstName} {profile.lastName || ''}</h2>
          <p>{profile.bio || 'Hozircha bio kiritilmagan.'}</p>
          <div className="profile-details">
            <div><span>Shahar</span><b>{profile.city || 'Kiritilmagan'}</b></div>
            <div><span>Mamlakat</span><b>{profile.country || 'Kiritilmagan'}</b></div>
            <div><span>Tug‘ilgan sana</span><b>{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString('uz-UZ') : 'Kiritilmagan'}</b></div>
            <div><span>Jins</span><b>{{ WOMAN: 'Ayol', MAN: 'Erkak', OTHER: 'Boshqa' }[profile.gender || ''] || 'Kiritilmagan'}</b></div>
            <div><span>Profil holati</span><b>{profile.status}</b></div>
            <div><span>Tasdiqlangan</span><b>{profile.isVerified ? 'Ha' : 'Hali yo‘q'}</b></div>
          </div>
          <h3>Qiziqishlar</h3>
          <div className="chips">
            {profile.interests.length
              ? profile.interests.map(item => <span className="profile-chip" key={item}>{item}</span>)
              : <span>Hozircha qiziqishlar kiritilmagan.</span>}
          </div>
          <Link className="primary linkbtn profile-edit-link" to="/screen/20">
            <Pencil size={15} /> Profilni tahrirlash
          </Link>
        </section>
      )}
    </div>
  );
}

export function ProfileEdit() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [interests, setInterests] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile()
      .then(user => {
        setProfile(user);
        setInterests(user.interests.join(', '));
      })
      .catch(e => setError(e instanceof Error ? e.message : 'Xatolik yuz berdi.'))
      .finally(() => setLoading(false));
  }, []);

  function change(field: keyof Profile, value: string) {
    setProfile(old => old ? { ...old, [field]: value } : old);
  }

  async function save() {
    if (!profile) return;
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-telegram-init-data': getInitData(),
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName || '',
          birthDate: profile.birthDate ? profile.birthDate.slice(0, 10) : '',
          gender: profile.gender || '',
          bio: profile.bio || '',
          city: profile.city || '',
          country: profile.country || '',
          interests: interests.split(',').map(x => x.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error('Profilni saqlash amalga oshmadi.');
      }

      const data = await response.json();
      setProfile(data.user);
      setInterests(data.user.interests.join(', '));
      setMessage('Profil muvaffaqiyatli saqlandi!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Xatolik yuz berdi.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="content">
      <div className="heading">
        <div>
          <small>TELEGRAM MINI APP · 20/50</small>
          <h1><Pencil /> Profilni tahrirlash</h1>
          <p>Ma’lumotlaringizni yangilang.</p>
        </div>
        <Link className="soft linkbtn" to="/screen/19">Profilimga qaytish</Link>
      </div>

      {loading && <section className="card">Ma’lumotlar yuklanmoqda...</section>}
      {error && <p className="message">{error}</p>}

      {profile && (
        <section className="card profile-form">
          <label>Ism
            <input value={profile.firstName} maxLength={100}
              onChange={e => change('firstName', e.target.value)} />
          </label>
          <label>Familiya
            <input value={profile.lastName || ''} maxLength={100}
              onChange={e => change('lastName', e.target.value)} />
          </label>
          <label>Tug‘ilgan sana
            <input type="date"
              value={profile.birthDate ? profile.birthDate.slice(0, 10) : ''}
              onChange={e => change('birthDate', e.target.value)} />
          </label>
          <label>Jins
            <select value={profile.gender || ''}
              onChange={e => change('gender', e.target.value)}>
              <option value="">Tanlanmagan</option>
              <option value="WOMAN">Ayol</option>
              <option value="MAN">Erkak</option>
              <option value="OTHER">Boshqa</option>
            </select>
          </label>
          <label>Shahar
            <input value={profile.city || ''} maxLength={100}
              onChange={e => change('city', e.target.value)} />
          </label>
          <label>Mamlakat
            <input value={profile.country || ''} maxLength={100}
              onChange={e => change('country', e.target.value)} />
          </label>
          <label className="full-field">O‘zingiz haqingizda
            <textarea value={profile.bio || ''} maxLength={500} rows={4}
              onChange={e => change('bio', e.target.value)} />
          </label>
          <label className="full-field">Qiziqishlar
            <input value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="Masalan: sayohat, kitob, sport" />
            <small>Qiziqishlarni vergul bilan ajrating.</small>
          </label>
          <button className="primary" disabled={saving || !profile.firstName.trim()}
            onClick={() => void save()}>
            <Save size={16} /> {saving ? 'Saqlanmoqda...' : 'O‘zgarishlarni saqlash'}
          </button>
          {message && <p className="message">{message}</p>}
        </section>
      )}
    </div>
  );
}

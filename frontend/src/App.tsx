
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  Heart, Users, MessageCircle, Crown, CreditCard, ShieldCheck, Gift,
  Wallet, BrainCircuit, Database, Server, Plug, KeyRound, ScrollText,
  Search, Menu, X, ChevronRight, Settings, Bell, BarChart3, Headphones,
  FileText, LayoutDashboard, Sparkles, MapPin, CalendarHeart, Video,
  ShieldAlert, SlidersHorizontal, CircleHelp, ArrowRight, Play, Plus,
  Eye
} from 'lucide-react';
import { screens } from './screens';
import { ProfileView, ProfileEdit } from './ProfileScreens';

const icons = [
  Heart, Users, ShieldCheck, Users, Video, SlidersHorizontal, MapPin,
  Sparkles, Heart, Heart, Users, Heart, Sparkles, MessageCircle,
  MessageCircle, BrainCircuit, CalendarHeart, Bell, Users, Settings,
  ShieldCheck, Crown, Wallet, Gift, Video, ShieldCheck, ShieldAlert,
  CreditCard, Gift, LayoutDashboard, Users, Crown, CreditCard, Users,
  BrainCircuit, FileText, Settings, ShieldCheck, BarChart3, Bell,
  CircleHelp, Headphones, Gift, Sparkles, Database, Server, Plug,
  KeyRound, ScrollText, LayoutDashboard
];

function VideoStories() {
  const [tab, setTab] = useState('Stories');
  const [liked, setLiked] = useState(false);
  const [msg, setMsg] = useState('');
  const [stories, setStories] = useState<Array<{
    url: string;
    type: string;
    name: string;
  }>>([]);
  const [video, setVideo] = useState<string | null>(null);

  const storyInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  function addStory(file?: File) {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setMsg('Faqat rasm yoki video fayl tanlang.');
      return;
    }

    const url = URL.createObjectURL(file);

    setStories(old => [
      ...old,
      {
        url,
        type: file.type,
        name: file.name
      }
    ]);

    setMsg('Story muvaffaqiyatli qo‘shildi!');
  }

  function addVideo(file?: File) {
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setMsg('Iltimos, video fayl tanlang.');
      return;
    }

    const url = URL.createObjectURL(file);
    setVideo(url);
    setMsg('Video profilingizga qo‘shildi!');
  }

  return (
    <div className="content">
      <div className="heading">
        <div>
          <small>TELEGRAM MINI APP · 25/50</small>
          <h1><Video /> Video Profile & Stories</h1>
          <p>O‘zingizni video orqali tanishtiring va lahzalaringizni ulashing.</p>
        </div>
      </div>

      <section className="hero">
        <div className="heroicon"><Video size={30} /></div>
        <div>
          <small>MALINA VIDEO</small>
          <h2>Haqiqiy o‘zingizni ko‘rsating</h2>
          <p>Video profil orqali sizni yaxshiroq tanishsin.</p>
        </div>
        <strong>25/50</strong>
      </section>

      <div className="columns">
        <section className="card">
          <div className="tabs">
            {['Stories', 'Video profil'].map(item => (
              <button
                key={item}
                className={tab === item ? 'active' : ''}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === 'Stories' ? (
            <>
              <div className="cardhead" style={{ marginTop: 18 }}>
                <h3>Yangi Stories</h3>
                <small>BUGUN</small>
              </div>

              <input
                ref={storyInput}
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={e => {
                  addStory(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />

              <div style={{
                display: 'flex',
                gap: 15,
                overflowX: 'auto',
                padding: '18px 2px'
              }}>
                <button
                  onClick={() => storyInput.current?.click()}
                  style={{
                    minWidth: 76,
                    border: 0,
                    background: 'none',
                    color: '#347b59',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    width: 62,
                    height: 62,
                    borderRadius: '50%',
                    border: '2px dashed #6ba985',
                    display: 'grid',
                    placeItems: 'center',
                    margin: 'auto'
                  }}>
                    <Plus />
                  </span>
                  <small>Story qo‘shish</small>
                </button>

                {stories.map((story, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(story.url, '_blank')}
                    style={{
                      minWidth: 76,
                      border: 0,
                      background: 'none',
                      cursor: 'pointer',
                      color: '#33483b'
                    }}
                  >
                    {story.type.startsWith('image/') ? (
                      <img
                        src={story.url}
                        alt="Story"
                        style={{
                          width: 62,
                          height: 62,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #e58ba7'
                        }}
                      />
                    ) : (
                      <span style={{
                        width: 62,
                        height: 62,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        background: '#d6e8d8',
                        border: '3px solid #e58ba7',
                        margin: 'auto'
                      }}>
                        <Video />
                      </span>
                    )}
                    <small>Mening Story</small>
                  </button>
                ))}

                {[
                  ['M', 'Madina', '#f4c4d1'],
                  ['A', 'Aziz', '#d6e8d8'],
                  ['S', 'Sabina', '#e9d9f2'],
                  ['J', 'Jasur', '#f5dfc5']
                ].map(([letter, name, color]) => (
                  <div key={name} style={{
                    minWidth: 70,
                    textAlign: 'center'
                  }}>
                    <span style={{
                      width: 62,
                      height: 62,
                      borderRadius: '50%',
                      border: '3px solid #e58ba7',
                      display: 'grid',
                      placeItems: 'center',
                      margin: 'auto',
                      background: color,
                      fontSize: 22,
                      fontWeight: 700
                    }}>
                      {letter}
                    </span>
                    <small>{name}</small>
                  </div>
                ))}
              </div>

              <div className="cardhead">
                <h3>So‘nggi Stories</h3>
                <small>{stories.length} TA YANGI</small>
              </div>

              <div className="rows">
                {stories.map((story, index) => (
                  <div className="row" key={index}>
                    <span className="rowicon">
                      {story.type.startsWith('video/') ? (
                        <Video size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </span>
                    <div>
                      <b>Mening Story {index + 1}</b>
                      <small>{story.name}</small>
                    </div>
                    <button
                      className="soft"
                      onClick={() => window.open(story.url, '_blank')}
                    >
                      <Eye size={14} /> Ko‘rish
                    </button>
                  </div>
                ))}

                {stories.length === 0 && (
                  <p>Hozircha Story yuklanmagan. Birinchi Story’ni qo‘shing.</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h3 style={{ marginTop: 20 }}>Mening video profilim</h3>

              <input
                ref={videoInput}
                type="file"
                accept="video/*"
                hidden
                onChange={e => {
                  addVideo(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />

              <div style={{
                minHeight: 260,
                margin: '16px 0',
                borderRadius: 16,
                background: video
                  ? '#17251d'
                  : 'linear-gradient(145deg,#1f6b4f,#79a98a)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                textAlign: 'center',
                padding: 24
              }}>
                {video ? (
                  <video
                    src={video}
                    controls
                    style={{
                      width: '100%',
                      maxHeight: 350,
                      borderRadius: 12
                    }}
                  />
                ) : (
                  <>
                    <div style={{
                      width: 76,
                      height: 76,
                      borderRadius: '50%',
                      background: '#ffffff25',
                      display: 'grid',
                      placeItems: 'center'
                    }}>
                      <Play size={34} />
                    </div>
                    <h2 style={{ margin: 0 }}>Video profilingiz</h2>
                    <p style={{
                      fontSize: 12,
                      margin: 0,
                      color: '#e0eee4'
                    }}>
                      15–30 soniyalik video orqali o‘zingizni tanishtiring.
                    </p>
                  </>
                )}
              </div>

              <button
                className="primary"
                onClick={() => videoInput.current?.click()}
              >
                <Plus size={16} /> Video yuklash
              </button>

              {video && (
                <button
                  className="soft"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    URL.revokeObjectURL(video);
                    setVideo(null);
                    setMsg('Video olib tashlandi.');
                  }}
                >
                  Videoni olib tashlash
                </button>
              )}

              <div className="tip" style={{ marginTop: 15 }}>
                <ShieldCheck size={18} />
                <p>
                  <b>Xavfsizlik:</b><br />
                  Yuklangan videolar moderatsiyadan o‘tkazilishi kerak.
                </p>
              </div>
            </>
          )}

          <div className="actions">
            <button
              className="soft"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                size={15}
                fill={liked ? 'currentColor' : 'none'}
              />
              {liked ? 'Yoqdi' : 'Like'}
            </button>

            <button
              className="soft"
              onClick={() => setMsg('Ulashish funksiyasi keyingi bosqichda ulanadi.')}
            >
              Ulashish
            </button>
          </div>

          {msg && (
            <p className="message">
              {msg}
              <button onClick={() => setMsg('')}>×</button>
            </p>
          )}
        </section>

        <section className="card sidecard">
          <small>VIDEO PROFIL</small>
          <h3>Profil holati</h3>

          <div className="ring">
            <b>{video ? '100%' : '0%'}</b>
            <small>Video tayyorligi</small>
          </div>

          <div className="kv">
            <span>Video</span>
            <b>{video ? 'Yuklangan' : 'Yuklanmagan'}</b>
          </div>

          <div className="kv">
            <span>Stories</span>
            <b>{stories.length} ta</b>
          </div>

          <div className="kv">
            <span>Moderatsiya</span>
            <b>Nazoratda</b>
          </div>

          <div className="tip">
            <Sparkles size={17} />
            <p>
              <b>Malina tavsiyasi</b><br />
              Samimiy va tabiiy video tanlang. O‘zingiz haqingizda qisqacha gapiring.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const list = useMemo(
    () => screens.filter(s =>
      (filter === 'all' || s.area === filter) &&
      (`${s.id} ${s.title} ${s.description}`)
        .toLowerCase()
        .includes(q.toLowerCase())
    ),
    [q, filter]
  );

  return (
    <div className="shell">
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <Heart fill="currentColor" />
          <div>
            <b>Malina</b>
            <small>Matchmaking platform</small>
          </div>
          <button className="close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="filters">
          {[
            ['all', 'Barchasi'],
            ['user', 'Ilova'],
            ['admin', 'Admin']
          ].map(([v, l]) => (
            <button
              key={v}
              className={filter === v ? 'on' : ''}
              onClick={() => setFilter(v)}
            >
              {l}
            </button>
          ))}
        </div>

        <small className="navlabel">
          50 TA EKRAN · {list.length}
        </small>

        <nav>
          {list.map(s => {
            const I = icons[s.id - 1];
            return (
              <Link
                onClick={() => setOpen(false)}
                to={'/screen/' + s.id}
                key={s.id}
              >
                <I size={16} />
                <span>{String(s.id).padStart(2, '0')} · {s.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="user">
          <div className="avatar">M</div>
          <div>
            <b>Malina Admin</b>
            <small>Demo workspace</small>
          </div>
          <i />
        </div>
      </aside>

      <main>
        <header>
          <button className="hamb" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div className="crumb">
            MALINA <ChevronRight size={13} /> PLATFORM
          </div>
          <label className="search">
            <Search size={16} />
            <input
              placeholder="Ekranlarni qidirish..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </label>
          <span className="online">● Demo rejimi</span>
        </header>

        {children}

        <footer>
          Malina © 2026 · React + NestJS + PostgreSQL
          <span>50 ekranli UI starter</span>
        </footer>
      </main>
    </div>
  );
}


function InterestsScreen() {
  const nav = useNavigate();
  const interests = [
    ['✈️', 'Sayohat'], ['📚', 'Kitoblar'],
    ['🎵', 'Musiqa'], ['🎬', 'Kino'],
    ['🏃', 'Sport'], ['🍳', 'Pazandachilik'],
    ['🎨', 'San’at'], ['🌿', 'Tabiat'],
    ['📸', 'Fotografiya'], ['☕', 'Kofe'],
    ['💃', 'Raqs'], ['🐾', 'Hayvonlar'],
    ['🧘', 'Yoga'], ['🎮', 'O‘yinlar'],
    ['🍽️', 'Yangi taomlar'], ['🧳', 'Sarguzasht']
  ];
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(name: string) {
    setSelected(old => old.includes(name)
      ? old.filter(item => item !== name)
      : [...old, name]);
  }

  return (
    <main className="interests-page">
      <header className="interests-header">
        <button onClick={() => nav('/screen/2')} aria-label="Orqaga">←</button>
        <span>MALINA</span>
        <small>08 / 26</small>
      </header>
      <section className="interests-content">
        <div className="interests-progress"><i /></div>
        <p className="interests-kicker">SIZNI YAXSHIROQ TANISH UCHUN</p>
        <h1>Nimalarga<br />qiziqasiz?</h1>
        <p className="interests-description">
          O‘zingiz yoqtirgan mashg‘ulotlarni tanlang. Umumiy qiziqishlar
          sizga mos insonlarni topishga yordam beradi.
        </p>
        <div className="interests-count">
          Tanlangan: <b>{selected.length}</b>
          <span> · Kamida 3 tasini tanlang</span>
        </div>
        <div className="interests-grid">
          {interests.map(([emoji, name]) => (
            <button
              key={name}
              type="button"
              className={selected.includes(name) ? 'interest-chip active' : 'interest-chip'}
              onClick={() => toggle(name)}
              aria-pressed={selected.includes(name)}
            >
              <span>{emoji}</span>{name}
              {selected.includes(name) && <i>✓</i>}
            </button>
          ))}
        </div>
        <button
          className="interests-continue"
          disabled={selected.length < 3}
          onClick={() => nav('/screen/9')}
        >
          Davom etish <ArrowRight size={19} />
        </button>
        <p className="interests-foot">Keyinchalik qiziqishlaringizni o‘zgartirishingiz mumkin.</p>
      </section>
    </main>
  );
}


function ValuesScreen() {
  const nav = useNavigate();
  const values = [
    ['🤍', 'Samimiyat', 'Ochiq va chin dildan munosabat'],
    ['💍', 'Sadoqat', 'Bir-biriga va’dasida turish'],
    ['🤝', 'Hurmat', 'Fikr va chegaralarni qadrlash'],
    ['🔐', 'Ishonch', 'Mustahkam munosabat asosi'],
    ['🏡', 'Oila', 'Oilaviy qadriyatlarni ulug‘lash'],
    ['🌷', 'Mehr', 'G‘amxo‘rlik va e’tibor'],
    ['🎯', 'Hayotiy maqsadlar', 'Birgalikda rivojlanish'],
    ['🕊️', 'Xotirjamlik', 'Tinch va sog‘lom munosabat'],
    ['😊', 'Hazil-mutoyiba', 'Birga kulishni bilish'],
    ['🌱', 'Rivojlanish', 'O‘z ustida ishlash'],
    ['⚖️', 'Tenglik', 'Qarorlarni birga qabul qilish'],
    ['❤️', 'Romantika', 'His-tuyg‘ularni qadrlash']
  ];

  const [selected, setSelected] = useState<string[]>([]);

  function toggle(name: string) {
    setSelected(old => old.includes(name)
      ? old.filter(item => item !== name)
      : [...old, name]);
  }

  return (
    <main className="interests-page values-page">
      <header className="interests-header">
        <button onClick={() => nav('/screen/8')} aria-label="Orqaga">←</button>
        <span>MALINA</span>
        <small>09 / 26</small>
      </header>

      <section className="interests-content">
        <div className="interests-progress values-progress"><i /></div>
        <p className="interests-kicker">MUNOSABATLARDA ENG MUHIMI</p>
        <h1>Qadriyatlaringiz<br />qanday?</h1>
        <p className="interests-description">
          Siz uchun munosabatlarda muhim bo‘lgan fazilatlarni tanlang.
          Bu sizga dunyoqarashi yaqin insonni topishga yordam beradi.
        </p>

        <div className="interests-count">
          Tanlangan: <b>{selected.length}</b>
          <span> · Kamida 3 tasini tanlang</span>
        </div>

        <div className="values-list">
          {values.map(([emoji, name, description]) => (
            <button
              key={name}
              type="button"
              className={selected.includes(name) ? 'value-card active' : 'value-card'}
              onClick={() => toggle(name)}
              aria-pressed={selected.includes(name)}
            >
              <span className="value-emoji">{emoji}</span>
              <span className="value-copy">
                <b>{name}</b>
                <small>{description}</small>
              </span>
              <i className="value-check">{selected.includes(name) ? '✓' : ''}</i>
            </button>
          ))}
        </div>

        <button
          className="interests-continue"
          disabled={selected.length < 3}
          onClick={() => nav('/screen/10')}
        >
          Davom etish <ArrowRight size={19} />
        </button>

        <p className="interests-foot">
          Sizning qadriyatlaringiz — sizning tanlovingiz.
        </p>
      </section>
    </main>
  );
}


function ProfileDetailsScreen() {
  const nav = useNavigate();
  const [liked, setLiked] = useState(false);

  return (
    <main className="profile-details-page">
      <header className="profile-details-header">
        <button onClick={() => nav('/screen/10')} aria-label="Orqaga">←</button>
        <span>MALINA</span>
        <button onClick={() => nav('/screen/10')} aria-label="Yopish">×</button>
      </header>

      <section className="profile-details-content">
        <div className="profile-details-photo">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop"
            alt="Dilnoza profil rasmi"
          />
          <span className="profile-photo-count">1 / 4</span>
        </div>

        <div className="profile-details-heading">
          <div>
            <h1>Dilnoza, 26</h1>
            <p><span>●</span> Toshkent · 2 km uzoqlikda</p>
          </div>
          <span className="profile-verified">✓ Tasdiqlangan</span>
        </div>

        <div className="profile-match">
          <div><b>85%</b><span> moslik</span></div>
          <p>Qiziqishlaringiz va qadriyatlaringiz bir-biriga yaqin.</p>
        </div>

        <section className="profile-info-block">
          <h2>Men haqimda</h2>
          <p>
            Hayotdagi kichik quvonchlarni qadrlayman. Sayohat qilish,
            kitob o‘qish va yangi joylarni kashf etishni yaxshi ko‘raman.
          </p>
        </section>

        <section className="profile-info-block">
          <h2>Qiziqishlari</h2>
          <div className="profile-tags">
            <span>✈️ Sayohat</span>
            <span>📚 Kitoblar</span>
            <span>☕ Kofe</span>
            <span>🌿 Tabiat</span>
          </div>
        </section>

        <section className="profile-info-block">
          <h2>Qadriyatlari</h2>
          <div className="profile-tags">
            <span>🤍 Samimiyat</span>
            <span>🔐 Ishonch</span>
            <span>🏡 Oila</span>
          </div>
        </section>

        <div className="profile-details-actions">
          <button
            className="profile-pass"
            onClick={() => nav('/screen/10')}
            aria-label="Keyingi profil"
          >×</button>
          <button
            className={liked ? 'profile-like liked' : 'profile-like'}
            onClick={() => setLiked(!liked)}
            aria-label="Yoqtirish"
          >{liked ? '♥' : '♡'}</button>
          <button
            className="profile-super"
            onClick={() => nav('/screen/24')}
            aria-label="Sovg‘a yuborish"
          >✦</button>
        </div>

        <button
          className="profile-details-continue"
          onClick={() => nav('/screen/15')}
        >
          Xabar yozish <ArrowRight size={18} />
        </button>
      </section>
    </main>
  );
}


function LikeScreen() {
  const nav = useNavigate();
  const [index, setIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const profiles = [
    {
      name: 'Madina', age: 24, city: 'Toshkent',
      photo: 'photo-1524504388940-b1c1722653e1',
      about: 'Sayohat, san’at va samimiy suhbatlarni yaxshi ko‘raman.'
    },
    {
      name: 'Shahnoza', age: 27, city: 'Samarqand',
      photo: 'photo-1531123897727-8f129e1688ce',
      about: 'Yangi joylarni kashf qilish va kitob o‘qish — sevimli mashg‘ulotlarim.'
    },
    {
      name: 'Malika', age: 25, city: 'Toshkent',
      photo: 'photo-1529139574466-a303027c1d8b',
      about: 'Hayotga ijobiy qarayman. Oila va ishonch men uchun muhim.'
    }
  ];
  const profile = profiles[index % profiles.length];

  function next(action: string) {
    setNotice(action);
    setIndex(old => old + 1);
  }

  return (
    <main className="like-page">
      <header className="like-header">
        <button onClick={() => nav('/screen/10')}>←</button>
        <span>MALINA</span>
        <button onClick={() => nav('/screen/22')}>♡</button>
      </header>

      <div className="like-intro">
        <p>BUGUN SIZ UCHUN</p>
        <h1>Yangi tanishuvlar</h1>
        <span>Sizga mos insonlarni kashf eting</span>
      </div>

      <section className="like-card">
        <img
          key={profile.photo}
          src={`https://images.unsplash.com/${profile.photo}?w=900&auto=format&fit=crop`}
          alt="Profil rasmi"
        />
        <div className="like-card-shade" />
        <div className="like-card-info">
          <span className="like-distance">● {profile.city}</span>
          <h2>{profile.name}, {profile.age}</h2>
          <p>{profile.about}</p>
        </div>
        <span className="like-card-number">{index + 1} / ∞</span>
      </section>

      <div className="like-actions">
        <button className="like-action pass" onClick={() => next('Keyingi profil')}>
          <span>×</span>
          <small>O‘tkazish</small>
        </button>
        <button className="like-action super" onClick={() => next('Super Like yuborildi ✦')}>
          <span>★</span>
          <small>Super Like</small>
        </button>
        <button className="like-action heart" onClick={() => next('Profil yoqtirildi ♥')}>
          <span>♥</span>
          <small>Yoqtirish</small>
        </button>
      </div>

      <p className="like-notice" aria-live="polite">{notice}</p>

      <nav className="like-bottom-nav">
        <button className="active" onClick={() => nav('/screen/10')}>⌂<small>Katalog</small></button>
        <button onClick={() => nav('/screen/14')}>♡<small>Yoqtirishlar</small></button>
        <button onClick={() => nav('/screen/14')}>▤<small>Suhbatlar</small></button>
        <button onClick={() => nav('/screen/19')}>○<small>Profil</small></button>
      </nav>
    </main>
  );
}


function MatchScreen() {
  const nav = useNavigate();

  return (
    <main className="match-page">
      <div className="match-glow" />
      <header className="match-header">
        <span>MALINA</span>
        <button onClick={() => nav('/screen/10')}>×</button>
      </header>

      <section className="match-content">
        <p className="match-kicker">YANGI BOSHLANISH</p>
        <h1>Bu o‘zaro!</h1>
        <p className="match-subtitle">Siz va Dilnoza bir-biringizga yoqdingiz</p>

        <div className="match-photos">
          <div className="match-photo first">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop" alt="Dilnoza" />
          </div>
          <div className="match-heart">♥</div>
          <div className="match-photo second">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop" alt="Sizning profilingiz" />
          </div>
        </div>

        <div className="match-percent">85% moslik</div>
        <h2>Chiroyli tanishuv boshlansin!</h2>
        <p className="match-description">
          Balki bu siz kutgan insondir. Birinchi xabaringizni yuboring.
        </p>

        <button className="match-message" onClick={() => nav('/screen/15')}>
          Xabar yozish <ArrowRight size={18} />
        </button>
        <button className="match-continue" onClick={() => nav('/screen/10')}>
          Boshqa profillarni ko‘rish
        </button>
      </section>
    </main>
  );
}


function ChatsScreen() {
  const nav = useNavigate();
  const chats = [
    { name: 'Dilnoza', age: 26, message: 'Bugun kuningiz qanday o‘tdi? 😊', time: '14:32', unread: 2, photo: 'photo-1534528741775-53994a69daeb', online: true },
    { name: 'Madina', age: 24, message: 'Tavsiya qilgan kitobingizni oldim 📚', time: '12:18', unread: 0, photo: 'photo-1524504388940-b1c1722653e1', online: true },
    { name: 'Shahnoza', age: 27, message: 'Rahmat, juda yoqimli suhbat bo‘ldi!', time: 'Kecha', unread: 0, photo: 'photo-1531123897727-8f129e1688ce', online: false },
    { name: 'Malika', age: 25, message: '😊❤️', time: 'Kecha', unread: 1, photo: 'photo-1529139574466-a303027c1d8b', online: false }
  ];

  return (
    <main className="chats-page">
      <header className="chats-header">
        <div><span>MALINA</span><h1>Suhbatlar</h1></div>
        <button onClick={() => nav('/screen/18')} aria-label="Bildirishnomalar">♧</button>
      </header>

      <div className="chats-search">
        <span>⌕</span>
        <input placeholder="Suhbatlardan qidirish..." />
      </div>

      <section className="chats-matches">
        <h2>Yangi tanishuvlar</h2>
        <div className="chats-avatar-row">
          {chats.slice(0, 3).map(chat => (
            <button key={chat.name} onClick={() => nav('/screen/15')}>
              <span className="chats-avatar-wrap">
                <img src={`https://images.unsplash.com/${chat.photo}?w=150&auto=format&fit=crop`} alt={chat.name} />
                {chat.online && <i />}
              </span>
              <small>{chat.name}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="chats-list">
        <div className="chats-list-heading">
          <h2>Barcha xabarlar</h2><span>{chats.length} ta suhbat</span>
        </div>
        {chats.map(chat => (
          <button className="chat-row" key={chat.name} onClick={() => nav('/screen/15')}>
            <span className="chat-row-photo">
              <img src={`https://images.unsplash.com/${chat.photo}?w=150&auto=format&fit=crop`} alt={chat.name} />
              {chat.online && <i />}
            </span>
            <span className="chat-row-copy">
              <b>{chat.name}, {chat.age}</b>
              <small>{chat.message}</small>
            </span>
            <span className="chat-row-meta">
              <small>{chat.time}</small>
              {chat.unread > 0 && <i>{chat.unread}</i>}
            </span>
          </button>
        ))}
      </section>

      <nav className="chats-bottom-nav">
        <button onClick={() => nav('/screen/10')}>⌂<small>Katalog</small></button>
        <button onClick={() => nav('/screen/12')}>♡<small>Yoqtirish</small></button>
        <button className="active">▤<small>Suhbatlar</small></button>
        <button onClick={() => nav('/screen/19')}>○<small>Profil</small></button>
      </nav>
    </main>
  );
}


function LiveChatScreen() {
  const nav = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Salom! Tanishganimdan xursandman 😊', mine: false, time: '14:25' },
    { text: 'Salom, Dilnoza! Men ham xursandman.', mine: true, time: '14:27' },
    { text: 'Bugun kuningiz qanday o‘tdi?', mine: false, time: '14:32' }
  ]);

  function sendMessage() {
    const text = message.trim();
    if (!text) return;
    setMessages(old => [...old, {
      text,
      mine: true,
      time: new Date().toLocaleTimeString('uz-UZ', {
        hour: '2-digit', minute: '2-digit'
      })
    }]);
    setMessage('');
  }

  return (
    <main className="live-chat-page">
      <header className="live-chat-header">
        <button onClick={() => nav('/screen/14')}>←</button>
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
          alt="Dilnoza"
        />
        <div>
          <b>Dilnoza, 26</b>
          <small><i /> Onlayn</small>
        </div>
        <button className="chat-more" aria-label="Qo‘shimcha">···</button>
      </header>

      <div className="live-chat-date">BUGUN</div>

      <section className="live-chat-messages">
        {messages.map((item, index) => (
          <div
            key={index}
            className={item.mine ? 'chat-bubble-row mine' : 'chat-bubble-row'}
          >
            <div className="chat-bubble">
              <p>{item.text}</p>
              <small>{item.time} {item.mine ? '✓✓' : ''}</small>
            </div>
          </div>
        ))}
      </section>

      <div className="live-chat-suggestions">
        {['😊', '❤️', 'Qanday ajoyib!'].map(item => (
          <button key={item} onClick={() => setMessage(old => old + item)}>
            {item}
          </button>
        ))}
      </div>

      <form
        className="live-chat-input"
        onSubmit={event => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <button type="button" aria-label="Emoji" onClick={() => setMessage(old => old + '😊')}>☺</button>
        <input
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder="Xabar yozing..."
          aria-label="Xabar matni"
        />
        <button className="chat-send" type="submit" disabled={!message.trim()}>
          ↑
        </button>
      </form>
    </main>
  );
}


function AiMatchScreen() {
  const nav = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const candidates = [
    { name: 'Dilnoza', age: 26, score: 96, city: 'Toshkent', photo: 'photo-1534528741775-53994a69daeb' },
    { name: 'Madina', age: 24, score: 92, city: 'Samarqand', photo: 'photo-1524504388940-b1c1722653e1' },
    { name: 'Malika', age: 25, score: 89, city: 'Toshkent', photo: 'photo-1529139574466-a303027c1d8b' }
  ];
  const person = candidates[refresh % candidates.length];

  return (
    <main className="ai-match-page">
      <header className="ai-match-header">
        <button onClick={() => nav('/screen/14')}>←</button>
        <span>MALINA AI</span>
        <button onClick={() => nav('/screen/20')}>⚙</button>
      </header>

      <section className="ai-match-intro">
        <div className="ai-match-symbol">✦</div>
        <p>INTELLEKTUAL TANLOV</p>
        <h1>Sizga mos insonni<br />topamiz</h1>
        <span>Qiziqishlaringiz va qadriyatlaringiz asosida</span>
      </section>

      <section className="ai-match-result">
        <div className="ai-result-top">
          <span>AI TAVSIYASI</span>
          <span className="ai-result-status">✦ Tavsiya</span>
        </div>
        <div className="ai-person">
          <img
            src={`https://images.unsplash.com/${person.photo}?w=700&auto=format&fit=crop`}
            alt={person.name}
          />
          <div className="ai-person-info">
            <h2>{person.name}, {person.age}</h2>
            <p>● {person.city}</p>
          </div>
        </div>
        <div className="ai-score">
          <div className="ai-score-circle">
            <b>{person.score}%</b>
            <small>MOSLIK</small>
          </div>
          <div className="ai-score-copy">
            <b>Siz bir-biringizga juda mos kelasiz!</b>
            <span>Umumiy qiziqishlar va qadriyatlar mosligi</span>
          </div>
        </div>
        <div className="ai-reasons">
          <span>✓ Qiziqishlar o‘xshash</span>
          <span>✓ Qadriyatlar mos</span>
          <span>✓ Maqsadlar yaqin</span>
        </div>
      </section>

      <button className="ai-match-primary" onClick={() => nav('/screen/11')}>
        Profilni ko‘rish <ArrowRight size={18} />
      </button>
      <button className="ai-match-secondary" onClick={() => setRefresh(old => old + 1)}>
        ↻ Boshqa tavsiya olish
      </button>

      <p className="ai-match-note">
        AI tavsiyalari demo ma’lumotlarga asoslangan. Haqiqiy moslik tizimi keyin ulanadi.
      </p>
    </main>
  );
}


function DatePlanningScreen() {
  const nav = useNavigate();
  const [kind, setKind] = useState('Kofe ichish');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [place, setPlace] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <main className="date-plan-page">
      <header className="date-plan-header">
        <button onClick={() => nav('/screen/15')}>←</button>
        <span>UCHRASHUV</span>
        <span className="date-plan-step">01 / 03</span>
      </header>

      <section className="date-plan-heading">
        <div className="date-plan-icon">♡</div>
        <p>MAXSUS LAHZALAR</p>
        <h1>Uchrashuvni<br />rejalashtiring</h1>
        <span>Birgalikdagi go‘zal lahzalar uchun ilk qadam.</span>
      </section>

      <section className="date-plan-card">
        <h3>Qanday uchrashuv xohlaysiz?</h3>
        <div className="date-plan-types">
          {['Kofe ichish', 'Kechki ovqat', 'Sayr qilish', 'Kino'].map((item, i) => (
            <button
              key={item}
              className={kind === item ? 'selected' : ''}
              onClick={() => { setKind(item); setSaved(false); }}
            >
              <span>{['☕', '🍽', '🌿', '🎬'][i]}</span>
              {item}
            </button>
          ))}
        </div>

        <h3>Qaysi kun?</h3>
        <input
          className="date-plan-field"
          type="date"
          value={date}
          onChange={e => { setDate(e.target.value); setSaved(false); }}
          min={new Date().toISOString().slice(0, 10)}
        />

        <h3>Qaysi vaqt?</h3>
        <input
          className="date-plan-field"
          type="time"
          value={time}
          onChange={e => { setTime(e.target.value); setSaved(false); }}
        />

        <h3>Uchrashuv joyi</h3>
        <input
          className="date-plan-field"
          value={place}
          onChange={e => { setPlace(e.target.value); setSaved(false); }}
          placeholder="Masalan, sevimli kafe..."
        />
      </section>

      <button
        className="date-plan-submit"
        disabled={!date || !place.trim()}
        onClick={() => setSaved(true)}
      >
        Rejani saqlash <ArrowRight size={17} />
      </button>

      {saved && (
        <div className="date-plan-success">
          <b>♡ Reja tayyor!</b>
          <span>{kind} · {date} · {time}</span>
          <span>{place}</span>
          <small>Bu reja hozircha faqat ushbu sahifada saqlanadi.</small>
        </div>
      )}
    </main>
  );
}


function NotificationsScreen() {
  const nav = useNavigate();
  const [filter, setFilter] = useState('Barchasi');
  const [read, setRead] = useState<number[]>([]);
  const items = [
    { id: 1, type: 'Layklar', icon: '♡', title: 'Sizga yangi layk!', text: 'Madina profilingizni yoqtirdi.', time: '5 daqiqa oldin', color: 'pink' },
    { id: 2, type: 'Mosliklar', icon: '♥', title: 'Yangi moslik!', text: 'Dilnoza bilan o‘zaro mos keldingiz.', time: '25 daqiqa oldin', color: 'green' },
    { id: 3, type: 'Xabarlar', icon: '✉', title: 'Yangi xabar', text: 'Shahnoza: Salom! Qalaysiz?', time: '1 soat oldin', color: 'gold' },
    { id: 4, type: 'Tizim', icon: '✦', title: 'Profilingiz tayyor!', text: 'Endi siz yangi tanishuvlarni boshlashingiz mumkin.', time: 'Kecha', color: 'green' },
    { id: 5, type: 'Layklar', icon: '♡', title: 'Sizga Super Like yuborildi', text: 'Malika sizga alohida e’tibor bildirdi.', time: 'Kecha', color: 'pink' }
  ];
  const shown = filter === 'Barchasi' ? items : items.filter(x => x.type === filter);

  return (
    <main className="notifications-page">
      <header className="notifications-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <h2>Bildirishnomalar</h2>
        <button onClick={() => setRead(items.map(x => x.id))}>✓</button>
      </header>

      <section className="notifications-welcome">
        <span>YANGILIKLAR</span>
        <h1>Hech narsani<br />o‘tkazib yubormang</h1>
        <p>Malina’dagi barcha yangiliklar shu yerda.</p>
      </section>

      <div className="notifications-filters">
        {['Barchasi', 'Layklar', 'Mosliklar', 'Xabarlar', 'Tizim'].map(x => (
          <button
            key={x}
            className={filter === x ? 'active' : ''}
            onClick={() => setFilter(x)}
          >{x}</button>
        ))}
      </div>

      <section className="notifications-list">
        {shown.map(item => (
          <button
            key={item.id}
            className={`notification-item ${read.includes(item.id) ? 'is-read' : ''}`}
            onClick={() => {
              setRead(old => old.includes(item.id) ? old : [...old, item.id]);
              nav(item.type === 'Xabarlar' ? '/screen/15' : item.type === 'Layklar' ? '/screen/12' : '/screen/10');
            }}
          >
            <span className={`notification-icon ${item.color}`}>{item.icon}</span>
            <span className="notification-copy">
              <b>{item.title}</b>
              <span>{item.text}</span>
              <small>{item.time}</small>
            </span>
            {!read.includes(item.id) && <i />}
          </button>
        ))}
        {shown.length === 0 && <p className="notifications-empty">Hozircha bildirishnoma yo‘q.</p>}
      </section>

      <nav className="notifications-bottom">
        <button onClick={() => nav('/screen/10')}>♡<small>Kashf etish</small></button>
        <button onClick={() => nav('/screen/14')}>✉<small>Suhbatlar</small></button>
        <button className="current">♧<small>Yangiliklar</small></button>
        <button onClick={() => nav('/screen/19')}>○<small>Profilim</small></button>
      </nav>
    </main>
  );
}


function PrivacyScreen() {
  const nav = useNavigate();
  const [settings, setSettings] = useState({
    showOnline: true,
    showDistance: true,
    showAge: true,
    notifications: true,
    profileVisible: true
  });

  const options = [
    { key: 'profileVisible', title: 'Profilim ko‘rinishi', desc: 'Boshqa foydalanuvchilar profilingizni ko‘ra oladi.' },
    { key: 'showOnline', title: 'Faollik holati', desc: 'Oxirgi faollik holatingizni ko‘rsatish.' },
    { key: 'showDistance', title: 'Masofani ko‘rsatish', desc: 'Profilingizda taxminiy masofani ko‘rsatish.' },
    { key: 'showAge', title: 'Yoshimni ko‘rsatish', desc: 'Profilingizda yoshingiz ko‘rinadi.' },
    { key: 'notifications', title: 'Bildirishnomalar', desc: 'Yangi layk va xabarlar haqida xabar olish.' }
  ] as const;

  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <h2>Maxfiylik</h2>
        <span>♡</span>
      </header>

      <section className="privacy-intro">
        <div>♧</div>
        <p>SIZNING TANLOVINGIZ</p>
        <h1>Shaxsiy hududingiz</h1>
        <span>Malina’da ma’lumotlaringiz va ko‘rinishingizni o‘zingiz boshqaring.</span>
      </section>

      <section className="privacy-card">
        <h3>Profil va ko‘rinish</h3>
        {options.map(item => (
          <div className="privacy-option" key={item.key}>
            <div>
              <b>{item.title}</b>
              <span>{item.desc}</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings[item.key]}
              className={`privacy-toggle ${settings[item.key] ? 'on' : ''}`}
              onClick={() => setSettings(old => ({ ...old, [item.key]: !old[item.key] }))}
            >
              <i />
            </button>
          </div>
        ))}
      </section>

      <section className="privacy-security">
        <span>♧</span>
        <div>
          <b>Xavfsizligingiz muhim</b>
          <p>Hisobingizni himoya qilish va xavfsizlik bo‘yicha tavsiyalarni ko‘rish.</p>
          <button onClick={() => nav('/screen/26')}>Xavfsizlik markazi →</button>
        </div>
      </section>

      <button className="privacy-back" onClick={() => nav('/screen/19')}>Profilimga qaytish</button>
      <p className="privacy-note">O‘zgarishlar hozircha ushbu sahifa doirasida saqlanadi.</p>
    </main>
  );
}


function PremiumScreen() {
  const nav = useNavigate();
  const [plan, setPlan] = useState('3 oy');
  const plans = [
    { name: '1 oy', price: '49 000', note: 'Oyiga' },
    { name: '3 oy', price: '119 000', note: '39 667 so‘m / oy', popular: true },
    { name: '12 oy', price: '349 000', note: '29 083 so‘m / oy' }
  ];
  const features = [
    ['♡', 'Cheksiz layklar', 'Istaganingizcha profilga layk yuboring'],
    ['✦', 'Kim sizni yoqtirganini ko‘ring', 'Sizga qiziqqan insonlarni bilib oling'],
    ['↺', 'Profilni qayta ko‘rish', 'O‘tkazib yuborgan profillarga qayting'],
    ['⚡', 'Ko‘proq ko‘rinish', 'Profilingizga qo‘shimcha e’tibor']
  ];

  return (
    <main className="premium-page">
      <header className="premium-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <span>MALINA</span>
        <span className="premium-crown">♛</span>
      </header>

      <section className="premium-hero">
        <div className="premium-emblem">♛</div>
        <p>YANGI DARAJADAGI TANISHUV</p>
        <h1>Malina <i>Premium</i></h1>
        <span>Sevgi sari yo‘lingizni yanada kengaytiring.</span>
      </section>

      <section className="premium-benefits">
        {features.map(([icon, title, desc]) => (
          <div className="premium-feature" key={title}>
            <span>{icon}</span>
            <div><b>{title}</b><small>{desc}</small></div>
            <i>✓</i>
          </div>
        ))}
      </section>

      <section className="premium-plans">
        <h3>O‘zingizga mos tarifni tanlang</h3>
        {plans.map(item => (
          <button
            key={item.name}
            className={`premium-plan ${plan === item.name ? 'chosen' : ''}`}
            onClick={() => setPlan(item.name)}
          >
            <span className="premium-radio">{plan === item.name ? '●' : '○'}</span>
            <span className="premium-plan-name">
              <b>{item.name}</b>
              <small>{item.note}</small>
            </span>
            <strong>{item.price} <small>so‘m</small></strong>
            {item.popular && <em>OMMABOP</em>}
          </button>
        ))}
      </section>

      <button className="premium-continue" onClick={() => alert('Premium to‘lov tizimi hali ulanmagan.')}>
        Premiumni tanlash <span>→</span>
      </button>
      <p className="premium-legal">Tarif va narxlar demo. Hozircha to‘lov olinmaydi.</p>
    </main>
  );
}


function WalletScreen() {
  const nav = useNavigate();
  const [showHistory, setShowHistory] = useState(true);
  const transactions = [
    { title: 'Premium obuna', date: '25-oktabr, 2026', amount: '−119 000', type: 'Xarid', icon: '♛' },
    { title: 'Hisob to‘ldirish', date: '20-oktabr, 2026', amount: '+150 000', type: 'Kirim', icon: '＋' },
    { title: 'Super Like', date: '18-oktabr, 2026', amount: '−15 000', type: 'Xarid', icon: '♡' }
  ];

  return (
    <main className="wallet-page">
      <header className="wallet-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <h2>Mening hamyonim</h2>
        <span>◈</span>
      </header>

      <section className="wallet-balance">
        <span>UMUMIY BALANS</span>
        <h1>85 000 <small>so‘m</small></h1>
        <p>Malina hisobingizdagi mablag‘</p>
        <div className="wallet-card-footer">
          <span>♡ MALINA WALLET</span>
          <span>•••• 2026</span>
        </div>
      </section>

      <section className="wallet-actions">
        <button onClick={() => alert('To‘lov tizimi hali ulanmagan.')}>
          <span>＋</span>
          <b>Hisobni to‘ldirish</b>
        </button>
        <button onClick={() => nav('/screen/24')}>
          <span>♡</span>
          <b>Sovg‘alar</b>
        </button>
      </section>

      <section className="wallet-history">
        <div className="wallet-history-heading">
          <h3>Operatsiyalar tarixi</h3>
          <button onClick={() => setShowHistory(v => !v)}>
            {showHistory ? 'Yashirish' : 'Ko‘rsatish'}
          </button>
        </div>
        {showHistory && transactions.map((item, index) => (
          <div className="wallet-transaction" key={index}>
            <span className="wallet-transaction-icon">{item.icon}</span>
            <div>
              <b>{item.title}</b>
              <small>{item.date} · {item.type}</small>
            </div>
            <strong className={item.type === 'Kirim' ? 'income' : ''}>{item.amount}</strong>
          </div>
        ))}
      </section>

      <div className="wallet-notice">
        <span>ⓘ</span>
        <p>Bu demo hamyon. Ko‘rsatilgan balans va operatsiyalar haqiqiy pul mablag‘larini aks ettirmaydi.</p>
      </div>
    </main>
  );
}


function GiftsScreen() {
  const nav = useNavigate();
  const [selected, setSelected] = useState(0);
  const [recipient, setRecipient] = useState('Dilnoza');
  const [sent, setSent] = useState(false);

  const gifts = [
    { name: 'Atirgul', emoji: '🌹', price: '10 000', desc: 'Mehr va e’tibor ramzi' },
    { name: 'Yurak', emoji: '💝', price: '15 000', desc: 'Samimiy tuyg‘ular uchun' },
    { name: 'Shokolad', emoji: '🍫', price: '20 000', desc: 'Shirin taassurot' },
    { name: 'Guldasta', emoji: '💐', price: '35 000', desc: 'Go‘zal kun uchun' },
    { name: 'Uzuk', emoji: '💍', price: '50 000', desc: 'Alohida e’tibor belgisi' },
    { name: 'Olmos', emoji: '💎', price: '75 000', desc: 'Unutilmas sovg‘a' }
  ];

  return (
    <main className="gifts-page">
      <header className="gifts-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <h2>Sovg‘alar</h2>
        <button onClick={() => nav('/screen/23')}>◈</button>
      </header>

      <section className="gifts-hero">
        <div>🎁</div>
        <p>HISLARINGIZNI IFODA ETING</p>
        <h1>Kichik sovg‘a,<br />katta quvonch</h1>
        <span>Yaqin insoningizga yoqimli taassurot ulashing.</span>
      </section>

      <section className="gifts-recipient">
        <label htmlFor="gift-recipient">Kimga sovg‘a yuboramiz?</label>
        <select
          id="gift-recipient"
          value={recipient}
          onChange={e => { setRecipient(e.target.value); setSent(false); }}
        >
          <option>Dilnoza</option>
          <option>Madina</option>
          <option>Shahnoza</option>
          <option>Malika</option>
        </select>
      </section>

      <section className="gifts-grid">
        {gifts.map((gift, index) => (
          <button
            key={gift.name}
            className={`gift-card ${selected === index ? 'selected' : ''}`}
            onClick={() => { setSelected(index); setSent(false); }}
          >
            <span className="gift-emoji">{gift.emoji}</span>
            <b>{gift.name}</b>
            <small>{gift.desc}</small>
            <strong>{gift.price} <i>so‘m</i></strong>
            {selected === index && <span className="gift-check">✓</span>}
          </button>
        ))}
      </section>

      <section className="gift-summary">
        <span>Tanlangan sovg‘a</span>
        <b>{gifts[selected].emoji} {gifts[selected].name}</b>
        <strong>{gifts[selected].price} so‘m</strong>
      </section>

      <button className="gift-send" onClick={() => setSent(true)}>
        Sovg‘ani yuborish <span>→</span>
      </button>

      {sent && (
        <div className="gift-demo-notice">
          <b>Sovg‘a tanlandi! ♡</b>
          <span>{recipient} uchun {gifts[selected].name}.</span>
          <small>Demo rejim: sovg‘a haqiqatda yuborilmadi va mablag‘ yechilmadi.</small>
        </div>
      )}
    </main>
  );
}


function SafetyCenterScreen() {
  const nav = useNavigate();
  const [items, setItems] = useState([true, true, false]);

  const options = [
    { icon: '🛡️', title: 'Profil maxfiyligi', desc: 'Shaxsiy ma’lumotlaringizni nazorat qiling.' },
    { icon: '📷', title: 'Foto xavfsizligi', desc: 'Profil rasmlaringizni kim ko‘rishini boshqaring.' },
    { icon: '📍', title: 'Joylashuv', desc: 'Joylashuv ma’lumotlarini ko‘rsatishni boshqaring.' }
  ];

  return (
    <main className="safety-page">
      <header className="safety-header">
        <button onClick={() => nav('/screen/19')}>←</button>
        <h2>Xavfsizlik markazi</h2>
        <span>♡</span>
      </header>

      <section className="safety-hero">
        <div>🛡️</div>
        <h1>Malinada xavfsiz<br />va xotirjam bo‘ling</h1>
        <p>Sizning ishonchingiz va xavfsizligingiz biz uchun muhim.</p>
      </section>

      <section className="safety-status">
        <span>✓</span>
        <div>
          <b>Hisobingiz himoyada</b>
          <small>Xavfsizlik sozlamalarini muntazam tekshirib turing.</small>
        </div>
      </section>

      <section className="safety-options">
        <h3>Maxfiylik boshqaruvi</h3>
        {options.map((item, index) => (
          <div className="safety-option" key={item.title}>
            <span className="safety-option-icon">{item.icon}</span>
            <div>
              <b>{item.title}</b>
              <small>{item.desc}</small>
            </div>
            <button
              className={items[index] ? 'enabled' : ''}
              onClick={() => setItems(old => old.map((v, i) => i === index ? !v : v))}
              aria-label={item.title}
            >
              {items[index] ? '✓' : '○'}
            </button>
          </div>
        ))}
      </section>

      <section className="safety-help">
        <h3>Yordam va qo‘llab-quvvatlash</h3>
        <button onClick={() => nav('/screen/21')}>
          <span>⚙️</span>
          <div><b>Maxfiylik sozlamalari</b><small>Hisobingiz nazorati</small></div>
          <span>›</span>
        </button>
        <button onClick={() => alert('Shikoyat yuborish xizmati keyingi bosqichda ulanadi.')}>
          <span>🚩</span>
          <div><b>Shikoyat yuborish</b><small>Noqulay holat haqida xabar bering</small></div>
          <span>›</span>
        </button>
        <button onClick={() => alert('Yordam xizmati keyingi bosqichda ulanadi.')}>
          <span>💬</span>
          <div><b>Yordam markazi</b><small>Biz bilan bog‘laning</small></div>
          <span>›</span>
        </button>
      </section>

      <p className="safety-footnote">Eslatma: ushbu ekrandagi sozlamalar hozircha demo rejimda. Haqiqiy xavfsizlik boshqaruvi serverga ulanishi kerak.</p>
    </main>
  );
}

export function Page() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = screens.find(x => x.id === Number(id));
  const [tab, setTab] = useState('Umumiy');
  const [msg, setMsg] = useState('');

  if (!s) return <Home />;
  if (s.id === 19) return <ProfileView />;
  if (s.id === 20) return <ProfileEdit />;
  if (s.id === 25) return <VideoStories />;

  const I = icons[s.id - 1];
  const admin = s.area === 'admin';

  return (
    <div className="content">
      <div className="heading">
        <div>
          <small>
            {admin ? 'ADMIN BOSHQARUVI' : 'TELEGRAM MINI APP'} · {s.id}/50
          </small>
          <h1><I />{s.title}</h1>
          <p>{s.description}</p>
        </div>

        <div className="buttons">
          <button onClick={() => nav('/screen/' + Math.max(1, s.id - 1))}>
            Oldingi
          </button>
          <button
            className="primary"
            onClick={() => nav('/screen/' + Math.min(50, s.id + 1))}
          >
            Keyingi <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <section className="hero">
        <div className="heroicon"><I size={30} /></div>
        <div>
          <small>
            {admin ? 'BOSHQARUV MODULI' : 'FOYDALANUVCHI MODULI'}
          </small>
          <h2>{s.title}</h2>
          <p>{s.description}</p>
        </div>
        <strong>{s.id}/50</strong>
      </section>

      <div className="metrics">
        {(admin
          ? [
              ['24,850', 'Jami foydalanuvchilar'],
              ['8,420', 'Faol foydalanuvchilar'],
              ['1,284', 'Bugungi faollik'],
              ['Online', 'Tizim holati']
            ]
          : [
              ['128', 'Mos profillar'],
              ['24', 'Yangi qiziqishlar'],
              ['8', 'Faol suhbatlar'],
              ['100%', 'Profil holati']
            ]
        ).map((m, i) => (
          <article key={i}>
            <span>{['◈', '♡', '↗', '✓'][i]}</span>
            <small>{m[1]}</small>
            <b>{m[0]}</b>
          </article>
        ))}
      </div>

      <div className="columns">
        <section className="card">
          <div className="cardhead">
            <div>
              <small>ISH MAYDONI</small>
              <h3>{s.title}</h3>
            </div>
            <button className="soft">
              <SlidersHorizontal size={14} /> Filtr
            </button>
          </div>

          <div className="tabs">
            {['Umumiy', 'Faoliyat', 'Sozlamalar'].map(t => (
              <button
                key={t}
                className={tab === t ? 'active' : ''}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Umumiy' ? (
            <div className="rows">
              {[
                ['Asosiy ma’lumotlar', s.description, 'Faol'],
                ['Xavfsiz boshqaruv', 'Ruxsatlar va foydalanuvchi holati nazorati', 'Yoqilgan'],
                ['Statistika va tahlil', 'Modul bo‘yicha ko‘rsatkichlar va faollik', 'Demo'],
                ['Bildirishnomalar', 'Muhim hodisalar haqida xabarlar', 'Faol']
              ].map((r, i) => (
                <div className="row" key={i}>
                  <span className={'rowicon c' + i}>
                    {['◉', '⬡', '▥', '♧'][i]}
                  </span>
                  <div>
                    <b>{r[0]}</b>
                    <small>{r[1]}</small>
                  </div>
                  <em>{r[2]}</em>
                </div>
              ))}
            </div>
          ) : tab === 'Faoliyat' ? (
            <div className="chart">
              <div className="bars">
                {[35, 58, 43, 72, 54, 88, 65, 78, 48, 92, 70, 84].map((h, i) => (
                  <i key={i} style={{ height: h + '%' }} />
                ))}
              </div>
              <p>
                Demo faollik grafigi · Backend API ulanganda real ko‘rsatkichlar chiqadi.
              </p>
            </div>
          ) : (
            <div className="settings">
              {[
                'Modulni faollashtirish',
                'Bildirishnomalar',
                'Avtomatik yangilash'
              ].map(t => (
                <label key={t}>
                  {t}
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>
          )}

          <div className="actions">
            <button
              className="primary"
              onClick={() => setMsg('Demo amal bajarildi. Real backend funksiyasi integratsiya qilinishi kerak.')}
            >
              Saqlash
            </button>
            <button
              className="soft"
              onClick={() => setMsg('Ma’lumotlar demo rejimida.')}
            >
              Yangilash
            </button>
          </div>

          {msg && (
            <p className="message">
              {msg}
              <button onClick={() => setMsg('')}>×</button>
            </p>
          )}
        </section>

        <section className="card sidecard">
          <small>TEZKOR KO‘RINISH</small>
          <h3>Modul holati</h3>
          <div className="ring">
            <b>98%</b>
            <small>Tizim tayyorligi</small>
          </div>
          <div className="kv">
            <span>API holati</span>
            <b>Demo</b>
          </div>
          <div className="kv">
            <span>Ma’lumotlar</span>
            <b>Namunaviy</b>
          </div>
          <div className="kv">
            <span>Ruxsatlar</span>
            <b>Nazoratda</b>
          </div>
          <div className="tip">
            <Sparkles size={17} />
            <p>
              <b>Malina tavsiyasi</b><br />
              Real ma’lumotlar bilan ishlatishdan oldin backend endpointlari va ruxsatlarni ulang.
            </p>
          </div>
        </section>
      </div>

      <section className="card map">
        <div className="cardhead">
          <h3>Yaqin ekranlar</h3>
          <small>{s.id} / 50</small>
        </div>
        <div className="chips">
          {screens
            .slice(Math.max(0, s.id - 4), Math.min(50, s.id + 5))
            .map(x => (
              <Link
                className={x.id === s.id ? 'chosen' : ''}
                to={'/screen/' + x.id}
                key={x.id}
              >
                {x.id} · {x.title}
              </Link>
            ))}
        </div>
      </section>

      {!admin && (
        <nav className="mobile-tabs">
          <Link to="/screen/10"><Heart />Katalog</Link>
          <Link to="/screen/14"><MessageCircle />Suhbatlar</Link>
          <Link to="/screen/16"><BrainCircuit />AI Match</Link>
          <Link to="/screen/17"><CalendarHeart />Uchrashuv</Link>
          <Link to="/screen/19"><Users />Profilim</Link>
        </nav>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="content">
      <section className="welcome">
        <div>
          <small>LOYIHA HOLATI</small>
          <h1>Malina platformasiga xush kelibsiz</h1>
          <p>50 ta ekranli UI/UX starter. Modulni chap menyudan tanlang.</p>
          <Link className="primary linkbtn" to="/screen/1">
            Birinchi ekranni ochish <ArrowRight size={15} />
          </Link>
        </div>
        <Heart fill="currentColor" size={75} />
      </section>

      <div className="metrics">
        {[
          ['50', 'Ekran'],
          ['23', 'Mini App moduli'],
          ['27', 'Admin moduli'],
          ['3', 'Asosiy texnologiya']
        ].map((m, i) => (
          <article key={i}>
            <span>✦</span>
            <small>{m[1]}</small>
            <b>{m[0]}</b>
          </article>
        ))}
      </div>

      <h2 className="sectiontitle">Barcha ekranlar</h2>

      <div className="tiles">
        {screens.map(s => {
          const I = icons[s.id - 1];
          return (
            <Link to={'/screen/' + s.id} key={s.id}>
              <I />
              <div>
                <small>
                  {String(s.id).padStart(2, '0')} · {s.area === 'admin' ? 'ADMIN' : 'MINI APP'}
                </small>
                <b>{s.title}</b>
                <p>{s.description}</p>
              </div>
              <ChevronRight />
            </Link>
          );
        })}
      </div>
    </div>
  );
}


function Registration() {
  const nav = useNavigate();
  const [status, setStatus] = useState('Telegram akkaunti tekshirilmoqda...');
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState(window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || '');
  const [lastName, setLastName] = useState(window.Telegram?.WebApp?.initDataUnsafe?.user?.last_name || '');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');

  const api = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    webApp?.ready();
    webApp?.expand();

    const initData = webApp?.initData || '';
    if (!initData) {
      setStatus('Malinani Telegram ilovasi ichidan oching.');
      return;
    }

    fetch(`${api}/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    })
      .then(async response => {
        if (!response.ok) throw new Error('Telegram orqali kirish amalga oshmadi. Qayta urinib ko‘ring.');
        setReady(true);
        setStatus('Telegram akkauntingiz muvaffaqiyatli aniqlandi.');
      })
      .catch(e => setError(e.message || 'Ulanishda xatolik yuz berdi.'));
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !birthDate || !gender || !city.trim()) {
      setError('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    const age = new Date().getFullYear() - new Date(birthDate).getFullYear()
      - (new Date() < new Date(new Date(birthDate).setFullYear(new Date().getFullYear())) ? 1 : 0);

    if (age < 18) {
      setError('Malina faqat 18 yoshdan kattalar uchun.');
      return;
    }

    setSaving(true);
    try {
      const initData = window.Telegram?.WebApp?.initData || '';
      const response = await fetch(`${api}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-telegram-init-data': initData,
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          birthDate,
          gender,
          city: city.trim(),
          country: 'Uzbekistan',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Profilni saqlash amalga oshmadi.');
      }

      nav('/screen/10');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Xatolik yuz berdi.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="registration-page">
      <header className="registration-brand">
        <span className="registration-logo"><Heart fill="currentColor" /></span>
        <span>malina</span>
      </header>

      <section className="registration-card">
        <div className="registration-step">BIRINCHI QADAM · PROFIL</div>
        <div className="registration-symbol"><Heart fill="currentColor" /></div>
        <h1>Malinaga xush kelibsiz!</h1>
        <p className="registration-intro">Siz haqingizda ozgina ma’lumot — va samimiy tanishuv sari ilk qadam.</p>

        <div className="telegram-status">
          <span className={ready ? 'status-dot ready' : 'status-dot'} />
          {status}
        </div>

        {ready && (
          <form className="registration-form" onSubmit={saveProfile}>
            <label>Ismingiz
              <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ismingiz" required />
            </label>
            <label>Familiyangiz
              <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Familiyangiz (ixtiyoriy)" />
            </label>
            <label>Tug‘ilgan sanangiz
              <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
            </label>
            <label>Jinsingiz
              <select value={gender} onChange={e => setGender(e.target.value)} required>
                <option value="">Tanlang</option>
                <option value="MAN">Erkak</option>
                <option value="WOMAN">Ayol</option>
                <option value="OTHER">Boshqa</option>
              </select>
            </label>
            <label>Shahringiz
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Masalan, Toshkent" required />
            </label>

            {error && <p className="registration-error">{error}</p>}

            <button className="registration-submit" type="submit" disabled={saving}>
              {saving ? 'Saqlanmoqda...' : 'Profilni yaratish'}
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {!ready && error && <p className="registration-error">{error}</p>}
        {!ready && !error && <p className="registration-hint">Telegram akkauntingiz xavfsiz tarzda tekshirilmoqda.</p>}

        <small className="registration-foot">18+ · Hurmat · Samimiyat · Xavfsizlik</small>
      </section>
    </main>
  );
}

function Welcome() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const initData = window.Telegram?.WebApp?.initData || '';
      if (!initData) return;

      try {
        const api = import.meta.env.VITE_API_URL || 'https://malina-yangi-mini-ap-vwq5.vercel.app/api';
        const response = await fetch(`${api}/auth/admin/telegram`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        });

        if (response.ok && active) setIsAdmin(true);
      } catch {
        if (active) setIsAdmin(false);
      }
    }

    checkAdmin();
    return () => { active = false; };
  }, []);

  return (
    <div className="welcome-page">
      <div className="welcome-brand">
        <span className="welcome-logo">
          <svg viewBox="0 0 48 48" aria-label="Malina">
            <path d="M9 36V13L24 29L39 13V36" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="8" r="3" fill="#D5A66D"/>
          </svg>
        </span>
        <span>malina</span>
      </div>

      <div className="welcome-content">
        <div className="welcome-art">
          <div className="malina-orbit orbit-one"></div>
          <div className="malina-orbit orbit-two"></div>
          <div className="malina-emblem">
            <svg viewBox="0 0 180 180" role="img" aria-label="Malina M">
              <defs>
                <linearGradient id="malinaGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFE8C5"/>
                  <stop offset="100%" stopColor="#D5A66D"/>
                </linearGradient>
              </defs>
              <path d="M35 125V55L90 105L145 55V125"
                fill="none" stroke="url(#malinaGold)" strokeWidth="11"
                strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M90 28C84 18 67 21 67 36C67 47 90 59 90 59C90 59 113 47 113 36C113 21 96 18 90 28Z"
                fill="#FFB7C9"/>
            </svg>
          </div>
          <span className="welcome-spark spark-one">✦</span>
          <span className="welcome-spark spark-two">✧</span>
          <span className="welcome-spark spark-three">✦</span>
        </div>

        <div className="welcome-copy">
          <span className="welcome-kicker">SIZ UCHUN YARATILGAN TANISHUV</span>
          <h1>Haqiqiy hislar<br />shu yerdan boshlanadi.</h1>
          <p>Samimiy tanishuvlar, umumiy qadriyatlar va sizga mos insonlar — barchasi Malinada.</p>
          <Link className="welcome-cta" to="/screen/2">
            Boshlash <ArrowRight size={19} />
          </Link>
          <small className="welcome-note">18+ · Hurmat · Samimiyat · Xavfsizlik</small>
          {isAdmin && (
            <a className="welcome-admin-link" href="/admin.html">
              <ShieldCheck size={17} /> Admin paneli <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="welcome-bottom">MALINA <span>•</span> SIZNING HIKOYAINGIZ</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/screen/2" element={<Registration />} />
      <Route path="/screen/8" element={<InterestsScreen />} />
      <Route path="/screen/9" element={<ValuesScreen />} />
      <Route path="/screen/11" element={<ProfileDetailsScreen />} />
      <Route path="/screen/12" element={<LikeScreen />} />
      <Route path="/screen/13" element={<MatchScreen />} />
      <Route path="/screen/14" element={<ChatsScreen />} />
      <Route path="/screen/15" element={<LiveChatScreen />} />
      <Route path="/screen/16" element={<AiMatchScreen />} />
      <Route path="/screen/17" element={<DatePlanningScreen />} />
      <Route path="/screen/18" element={<NotificationsScreen />} />
      <Route path="/screen/19" element={<ProfileView />} />
      <Route path="/screen/20" element={<ProfileEdit />} />
      <Route path="/screen/21" element={<PrivacyScreen />} />
      <Route path="/screen/22" element={<PremiumScreen />} />
      <Route path="/screen/23" element={<WalletScreen />} />
      <Route path="/screen/24" element={<GiftsScreen />} />
      <Route path="/screen/25" element={<VideoStories />} />
      <Route path="/screen/26" element={<SafetyCenterScreen />} />
      <Route path="/screen/:id" element={<Shell><Page /></Shell>} />
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}

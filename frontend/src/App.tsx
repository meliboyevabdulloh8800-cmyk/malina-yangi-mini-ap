
import { useMemo, useRef, useState } from 'react';
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

function Page() {
  const { id } = useParams();
  const nav = useNavigate();
  const s = screens.find(x => x.id === Number(id));
  const [tab, setTab] = useState('Umumiy');
  const [msg, setMsg] = useState('');

  if (!s) return <Home />;
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

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen/:id" element={<Page />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Shell>
  );
}

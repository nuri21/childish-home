import React, { useState, useEffect } from 'react';
import Window from './components/Window';
import Gallery from './components/Gallery';
import './App.css';

/* ── 로딩바 ── */
function LoadingBar() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setW(p => { if (p >= 100) { clearInterval(t); return 100; } return p + 1.2; }), 40);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="loading-area">
      <div className="loading-text">LOADING...</div>
      <Window type="yellow-title" title="">
        <div style={{ padding: '5px 7px' }}>
          <div style={{ height: 13, background: '#f0ecc0', border: '1px solid #c0a800', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${w}%`, background: 'linear-gradient(90deg, #b890e8, #d4b0ff)', transition: 'width 0.04s linear', borderRadius: 2 }} />
          </div>
        </div>
      </Window>
    </div>
  );
}

/* ── 배경 하트 동심원 ── */
function BgHeartRings({ top = '5%', opacity = 0.5 }) {
  const heartPath = "M150,220 C150,220 60,165 60,115 C60,80 88,62 112,76 C128,86 150,102 150,102 C150,102 172,86 188,76 C212,62 240,80 240,115 C240,165 150,220 150,220 Z";
  return (
    <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', top, zIndex: 0, pointerEvents: 'none', opacity }}>
      <svg viewBox="0 0 300 280" width="340" height="320" style={{ overflow: 'visible' }}>
        {[1.0, 1.3, 1.65, 2.1, 2.6].map((scale, i) => (
          <path key={i} d={heartPath} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1"
            transform={`translate(150,140) scale(${scale}) translate(-150,-140)`} />
        ))}
        <path d={heartPath} fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
        {[[100,80],[200,80],[80,130],[220,130],[150,60],[110,170],[190,170]].map(([x,y],i) => (
          <text key={i} x={x} y={y} fontSize="10" fill="white" textAnchor="middle" opacity="0.8">✦</text>
        ))}
      </svg>
    </div>
  );
}

/* ── 홀로그램 하트 ── */
function HoloHeart() {
  return (
    <div className="holo-heart-wrap">
      <svg viewBox="0 0 140 125" width="140" height="125">
        <defs>
          <linearGradient id="holoG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe090" /><stop offset="25%" stopColor="#a0f0e0" />
            <stop offset="55%" stopColor="#c0a0ff" /><stop offset="80%" stopColor="#ffb0d0" />
            <stop offset="100%" stopColor="#a0d8ff" />
          </linearGradient>
          <linearGradient id="holoG2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb0d0" /><stop offset="40%" stopColor="#a0d8ff" />
            <stop offset="100%" stopColor="#d0ffb0" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M70,110 C70,110 8,72 8,36 C8,16 24,4 40,12 C52,18 70,32 70,32 C70,32 88,18 100,12 C116,4 132,16 132,36 C132,72 70,110 70,110 Z"
          fill="url(#holoG)" filter="url(#glow)" opacity="0.92" />
        <path d="M70,110 C70,110 8,72 8,36 C8,16 24,4 40,12 C52,18 70,32 70,32 C70,32 88,18 100,12 C116,4 132,16 132,36 C132,72 70,110 70,110 Z"
          fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <path d="M42,78 C42,78 10,58 10,40 C10,28 20,22 30,28 C36,32 42,40 42,40 C42,40 48,32 54,28 C64,22 74,28 74,40 C74,58 42,78 42,78 Z"
          fill="url(#holoG2)" opacity="0.75" transform="translate(20,18) scale(0.72)" />
        <text x="55" y="22" fontSize="9" fill="white" opacity="0.9">✦</text>
        <text x="90" y="30" fontSize="7" fill="white" opacity="0.7">✦</text>
        <text x="30" y="50" fontSize="6" fill="white" opacity="0.7">✦</text>
      </svg>
    </div>
  );
}

/* ── 스마일 꽃 ── */
function SmileFlower() {
  return (
    <div className="smile-flower-wrap">
      <svg viewBox="0 0 80 80" width="68" height="68">
        <defs>
          <linearGradient id="flG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8a8f0" /><stop offset="100%" stopColor="#9870d0" />
          </linearGradient>
        </defs>
        {[0,60,120,180,240,300].map(a => (
          <ellipse key={a} cx="40" cy="19" rx="9" ry="14" fill="url(#flG)" opacity="0.88" transform={`rotate(${a} 40 40)`} />
        ))}
        <circle cx="40" cy="40" r="17" fill="#fde84a" />
        <circle cx="40" cy="40" r="16.5" fill="#f5dc38" stroke="#c8b020" strokeWidth="0.5" />
        <circle cx="34.5" cy="37" r="2.2" fill="#3a2a1a" />
        <circle cx="45.5" cy="37" r="2.2" fill="#3a2a1a" />
        <path d="M33.5,44 Q40,50 46.5,44" fill="none" stroke="#3a2a1a" strokeWidth="1.8" strokeLinecap="round" />
        <text x="54" y="18" fontSize="9" fill="white" opacity="0.85">✦</text>
        <text x="61" y="30" fontSize="7" fill="white" opacity="0.65">✦</text>
      </svg>
    </div>
  );
}

/* ── 둥근 말풍선 ── */
function RoundBubble({ color = 'white', shadow = '#c8b8e8', children }) {
  return (
    <div style={{
      background: color,
      borderRadius: 50,
      padding: '13px 22px',
      fontSize: 12,
      lineHeight: 1.8,
      color: '#3a2a5a',
      fontFamily: "'Paperozi', sans-serif",
      boxShadow: `3px 4px 0 ${shadow}`,
      border: '1px solid rgba(180,160,220,0.2)',
    }}>
      {children}
    </div>
  );
}

/* ── 원형 프로필 placeholder ── */
function ProfileCircle({ size = 76 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #e0d8f8, #c8e8f0)',
      border: '2px solid #c0a8e8',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, fontSize: 10, color: '#a090c8',
      fontFamily: "'Paperozi', sans-serif",
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: size * 0.38 }}>🧑</span>
    </div>
  );
}

/* ── 홀로그램 하트 스티커 (작은) ── */
function HoloHeartSticker() {
  return (
    <svg viewBox="0 0 80 65" width="72" height="58">
      <defs>
        <linearGradient id="hS1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe090" /><stop offset="30%" stopColor="#a0f0e0" />
          <stop offset="60%" stopColor="#c0a0ff" /><stop offset="100%" stopColor="#ffb0d0" />
        </linearGradient>
        <linearGradient id="hS2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffb0d0" /><stop offset="100%" stopColor="#a0d8ff" />
        </linearGradient>
      </defs>
      <path d="M40,58 C40,58 4,36 4,18 C4,8 13,2 22,7 C28,11 40,20 40,20 C40,20 52,11 58,7 C67,2 76,8 76,18 C76,36 40,58 40,58 Z" fill="url(#hS1)" opacity="0.9" />
      <path d="M22,40 C22,40 4,30 4,20 C4,13 10,9 17,13 C20,15 22,19 22,19 C22,19 24,15 27,13 C34,9 40,13 40,20 C40,30 22,40 22,40 Z"
        fill="url(#hS2)" opacity="0.72" transform="translate(2,10) scale(0.62)" />
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   메인 앱
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  return (
    <div className="app-wrap">
      <BgHeartRings top="2%"  opacity={0.5} />
      <BgHeartRings top="52%" opacity={0.45} />

      <div className="page">

        {/* ━━━━ HERO ━━━━ */}
        <div className="hero-section">
          <HoloHeart />
          <div className="oval-label">
            <div className="label-main">CHILDISH</div>
            <div className="label-sub">: 어린애 같은, 유치한</div>
          </div>
          <LoadingBar />

          <div className="childish-window-wrap">
            <Window type="blue-title" title="CHILDISH" showResize>
              <div style={{ textAlign: 'center', paddingTop: 18 }}>
                <h1 style={{
                  fontFamily: "'YeogiOttaeJalnan', sans-serif",
                  fontSize: 38, color: '#7b6ab0',
                  letterSpacing: 2, lineHeight: 1.2, marginBottom: 10,
                }}>차일디시</h1>
                <p style={{ fontSize: 11, color: '#9888c0', fontFamily: "'Paperozi', sans-serif", lineHeight: 1.8 }}>
                  놀 때 만들은 어린아이처럼 즐겁게 놀자
                </p>
              </div>
              <div className="three-hearts">
                <span style={{ fontSize: 26 }}>🩷</span>
                <span style={{ fontSize: 26 }}>💙</span>
                <span style={{ fontSize: 26 }}>💛</span>
              </div>
              <div style={{ padding: '4px 16px 8px', fontSize: 12, lineHeight: 2.1, fontFamily: "'Paperozi', sans-serif", color: '#3a2a5a' }}>
                <p>차일디시는 자유로운 길드입니다.</p>
                <p>서로 예의를 잘 지켜주시는 분이라면</p>
                <p>
                  <strong>수다/ 사냥 / 의장 / 석상/ 솔플 유저 누구든 OK</strong>
                </p>
                <p style={{ fontSize: 11, color: '#a090b8', marginTop: 2 }}>카카오 오픈채팅 / 길드 디스코드 운영중 참여 자유</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 14px 16px' }}>
                <button className="btn-ok">OK</button>
              </div>
            </Window>
          </div>
          <SmileFlower />
          <div className="hourglass-wrap">⏳</div>
          <div className="bottom-scrollbar">
          </div>
        </div>

        {/* ━━━━ ABOUT CHILDISH ━━━━ */}
        <div className="about-section">
          <Window type="lavender-title" title="ABOUT CHILDISH" showScrollbar showResize>
            <div className="about-window-inner">
              <div className="three-hearts" style={{ paddingTop: 8, paddingBottom: 20 }}>
                <span style={{ fontSize: 22 }}>💜</span>
                <span style={{ fontSize: 22 }}>💙</span>
                <span style={{ fontSize: 22 }}>💛</span>
              </div>

              {/* 말풍선 1: 텍스트 왼쪽 + 프로필 오른쪽 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ flex: 1 }}>
                  <RoundBubble color="white" shadow="#c8b8e8">
                    나이? 성별? 중요하지 않아요!<br />
                    텃새란 최대한 차일디시는 <strong>모두 친구입니다</strong>.
                  </RoundBubble>
                </div>
                <ProfileCircle size={76} />
              </div>

              {/* 말풍선 2: 프로필 왼쪽 + 텍스트 오른쪽 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <ProfileCircle size={76} />
                <div style={{ flex: 1 }}>
                  <RoundBubble color="#d8f0ec" shadow="#a0c8c0">
                    게임하다가 막히고 잘 모르신다구요?<br />
                    어려워하지말고 <strong> 언제든지 물어보세요! 🌟 </strong>
                  </RoundBubble>
                </div>
              </div>

              {/* 말풍선 3: 텍스트 왼쪽 + 프로필 오른쪽 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <RoundBubble color="#fef9c3" shadow="#d4c860">
                    <strong>현생우선 길드입니다.<br /></strong>
                    중요한 업무로 장기간 비접속에 두려워하지마세요!
                  </RoundBubble>
                </div>
                <ProfileCircle size={76} />
              </div>

              {/* 파란 메모 윈도우 */}
              <div className="memo-char-wrap">
                <Window type="blue-title" title="" showResize>
                  <div style={{ padding: '16px 16px 8px' }}>
                   <strong>커플, 앤캐 동반 가입 환영!</strong> 
                  </div>
                    관계 진행에 따른 개인적인 일은 두분이서 조용히, 원만히 해결해주신다면 터치하지 않아요! 
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0 14px 14px' }}>
                    <button className="btn-ok">OK</button>
                  </div>
                </Window>

                {/* 홀로그램 하트 스티커 - 왼쪽 하단 */}
                <div className="holo-heart-sticker">
                  <HoloHeartSticker />
                </div>

                {/* 전신 캐릭터 2개 - 오른쪽, 창 아래로 삐져나옴 */}
                <div className="char-full-pair">
                  <div className="char-full-single">
                    <span style={{ fontSize: 38 }}>🧍</span>
                    <span>캐릭터1</span>
                  </div>
                  <div className="char-full-single">
                    <span style={{ fontSize: 38 }}>🧍‍♀️</span>
                    <span>캐릭터2</span>
                  </div>
                </div>
              </div>

            </div>
          </Window>
        </div>

        {/* ━━━━ 진입 안내 ━━━━ */}
        <div className="content-section">
          <Window type="yellow-border" title="" showResize className="content-window">
            <div style={{ padding: '16px 14px 8px', fontSize: 12, lineHeight: 2.1, fontFamily: "'Paperozi', sans-serif", color: '#3a2a5a' }}>
              <p style={{ fontWeight: 700, color: '#7b6ab0', marginBottom: 4 }}>지인플 터치 안해요🥰</p>
              <p>매일 다른 채널에 있어도 괜찮아요!</p>
              <p>가끔 석상하러 길터에 찾아와주시기만 해도 괜찮아요.</p>
              <div style={{ marginTop: 8, padding: '8px 10px', background: 'rgba(200,230,240,0.3)', borderRadius: 4, border: '1px dashed #90b8c0', fontSize: 11 }}>
                <p>서로 서로 무례하지 않고, 예의만 잘 지킨다면 문제 없어요. <br />
                  다만, 외부 일은 개인적으로 해결하기! <br />
                  터치를 안 한다는건 도와드릴 수도 없다는 뜻이에요. </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 14px 14px' }}>
              <button className="btn-ok">OK</button>
            </div>
          </Window>
        </div>

        {/* ━━━━ 갤러리 ━━━━ */}
        <div className="gallery-section">
          <Window type="yellow-border" title="" showResize className="content-window">
            <div style={{ padding: '10px 12px' }}>
              <Gallery />
            </div>
          </Window>
        </div>

        {/* ━━━━ 푸터 ━━━━ */}
        <div className="footer">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20, display: 'inline-block', animation: 'float 3.5s ease-in-out infinite' }}>🦋</span>
            <span style={{ fontSize: 18 }}>💜</span>
            <span style={{ fontSize: 14, color: '#c8a0e8', display: 'inline-block', animation: 'twinkle 2s ease-in-out infinite' }}>✦</span>
            <span style={{ fontSize: 20, display: 'inline-block', animation: 'float 4s ease-in-out infinite 0.5s' }}>🌼</span>
            <span style={{ fontSize: 12, color: '#8ecfc4', display: 'inline-block', animation: 'twinkle 2s ease-in-out infinite 0.8s' }}>✦</span>
          </div>
          <p style={{ fontSize: 10, color: '#a090b8', fontFamily: "'Paperozi', sans-serif" }}>
            © 차일디시
          </p>
        </div>

      </div>
    </div>
  );
}
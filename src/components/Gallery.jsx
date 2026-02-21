import React, { useState } from 'react';
import Window from './Window';

const IMAGES = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/ch${i + 1}/600/450`,
  thumb: `https://picsum.photos/seed/ch${i + 1}/200/150`,
  label: `스크린샷 ${String(i + 1).padStart(2, '0')}`,
}));

// Folder icon SVG
function FolderIcon() {
  return (
    <svg width="64" height="52" viewBox="0 0 64 52" fill="none">
      <path d="M0 8C0 5.8 1.8 4 4 4H26L32 12H60C62.2 12 64 13.8 64 16V48C64 50.2 62.2 52 60 52H4C1.8 52 0 50.2 0 48V8Z" fill="#b8d4f5"/>
      <path d="M0 18C0 15.8 1.8 14 4 14H60C62.2 14 64 15.8 64 18V48C64 50.2 62.2 52 60 52H4C1.8 52 0 50.2 0 48V18Z" fill="#d4e8fc"/>
      <rect x="8" y="24" width="48" height="3" rx="1.5" fill="#7db8e8" opacity="0.5"/>
      <rect x="8" y="31" width="36" height="3" rx="1.5" fill="#7db8e8" opacity="0.5"/>
      <rect x="8" y="38" width="42" height="3" rx="1.5" fill="#7db8e8" opacity="0.5"/>
    </svg>
  );
}

export default function Gallery() {
  const [view, setView] = useState('folder');
  const [selected, setSelected] = useState(null);

  if (view === 'folder') {
    return (
      <div className="gallery-folder-area">
        <button className="folder-btn" onClick={() => setView('grid')}>
          <FolderIcon />
          <span className="folder-label">📂 스크린샷</span>
        </button>
        <span style={{ fontSize: 9, color: 'var(--text-mid)', opacity: 0.7 }}>클릭하여 열기</span>
      </div>
    );
  }

  if (view === 'grid') {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text-mid)', fontWeight: 700 }}>📂 스크린샷 ({IMAGES.length})</span>
          <button className="btn" onClick={() => setView('folder')}>✕ 닫기</button>
        </div>
        <div className="gallery-grid">
          {IMAGES.map(img => (
            <div key={img.id} className="gallery-thumb" onClick={() => { setSelected(img); setView('popup'); }}>
              <img src={img.thumb} alt={img.label}
                onError={e => { e.target.style.display='none'; }}
              />
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 9, marginTop: 8, color: 'var(--text-mid)', opacity: 0.6 }}>
          이미지를 클릭하면 크게 볼 수 있어요 ✨
        </p>
      </div>
    );
  }

  if (view === 'popup' && selected) {
    return (
      <div className="popup-overlay" onClick={() => setView('grid')}>
        <div className="popup-inner" onClick={e => e.stopPropagation()}>
          <Window title={selected.label} color="blue" icon="🖼️">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button className="btn" onClick={() => setView('grid')}>✕ 닫기</button>
            </div>
            <div style={{ border: '2px solid var(--purple-light)', borderRadius: 6, overflow: 'hidden', background: 'linear-gradient(135deg, #ddd6fe, #d0f4f8)', minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={selected.src} alt={selected.label}
                style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
                onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div style="padding:40px;font-size:40px;text-align:center">🖼️</div>'; }}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, marginTop: 8, color: 'var(--text-mid)', fontWeight: 500 }}>{selected.label}</p>
          </Window>
        </div>
      </div>
    );
  }
}
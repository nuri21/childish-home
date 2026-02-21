import React, { useState } from 'react';
import Window from './Window';

const IMGS = Array.from({ length: 6 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0'); 
  return {
    id: i + 1,
    src: `/img/screenshot-${num}.png`,
    caption: `스크린샷 ${i + 1}`,
  };
});

// 폴더 아이콘 SVG
function FolderIcon() {
  return (
    <svg width="90" height="72" viewBox="0 0 90 72" fill="none">
      <path d="M0 12C0 9.79 1.79 8 4 8H36L44 18H86C88.21 18 90 19.79 90 22V66C90 68.21 88.21 70 86 70H4C1.79 70 0 68.21 0 66V12Z" fill="#c8d8f0"/>
      <path d="M0 24C0 21.79 1.79 20 4 20H86C88.21 20 90 21.79 90 24V66C90 68.21 88.21 70 86 70H4C1.79 70 0 68.21 0 66V24Z" fill="#dce8f8"/>
      {/* 안쪽 선들 */}
      <rect x="12" y="32" width="66" height="4" rx="2" fill="#b0c8e8" opacity="0.5"/>
      <rect x="12" y="42" width="50" height="4" rx="2" fill="#b0c8e8" opacity="0.5"/>
      <rect x="12" y="52" width="58" height="4" rx="2" fill="#b0c8e8" opacity="0.5"/>
      {/* 폴더 탭 라인 */}
      <path d="M0 12C0 9.79 1.79 8 4 8H36L44 18H86C88.21 18 90 19.79 90 22" fill="none" stroke="#90b8d8" strokeWidth="1.5"/>
    </svg>
  );
}

export default function Gallery() {
  const [view, setView] = useState('folder');
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {/* ── 폴더 뷰 ── */}
      {view === 'folder' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 0' }}>
          <button
            onClick={() => setView('grid')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FolderIcon />
            <span style={{ fontSize: 10, color: '#7b6ab0', fontFamily: "'Paperozi', sans-serif" }}>클릭하여 열기</span>
          </button>
        </div>
      )}

      {/* ── 그리드 뷰 ── */}
      {view === 'grid' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: '#7b6ab0', fontFamily: "'Paperozi', sans-serif" }}>📸 {IMGS.length}장</span>
            <button className="btn-ok" onClick={() => setView('folder')} style={{ fontSize: 10, padding: '3px 12px' }}>← 뒤로</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
            {IMGS.map(img => (
              <button
                key={img.id}
                onClick={() => { setSelected(img); setView('popup'); }}
                style={{
                  padding: 0, border: '2px solid rgba(180,160,220,0.4)',
                  borderRadius: 5, overflow: 'hidden', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ede8f8, #d8f0ec)',
                  aspectRatio: '4/3', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#9880c8'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(180,160,220,0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <img
                  src={img.src} alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;color:#a090c8">🖼️</div>`;
                  }}
                />
              </button>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 10, marginTop: 8, color: '#a090c8', fontFamily: "'Paperozi', sans-serif" }}>클릭하면 크게 볼 수 있어요 ✦</p>
        </div>
      )}

      {/* ── 팝업 뷰 ── */}
      {view === 'popup' && selected && (
        <div
          onClick={() => { setSelected(null); setView('grid'); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(60,40,100,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, animation: 'fadeIn 0.2s ease',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', width: 400 }}>
            <Window type="lavender-title" title={selected.caption} showResize>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 4px' }}>
                <button className="btn-ok" onClick={() => { setSelected(null); setView('grid'); }} style={{ fontSize: 10, padding: '3px 12px' }}>✕ 닫기</button>
              </div>
              <div style={{ margin: '0 12px 12px', borderRadius: 6, overflow: 'hidden', border: '2px solid #c0a8e8', background: '#ede8f8' }}>
                <img src={selected.src} alt={selected.caption}
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="height:200px;display:flex;align-items:center;justify-content:center;font-size:48px">🖼️</div>`;
                  }}
                />
              </div>
            </Window>
          </div>
        </div>
      )}
    </div>
  );
}
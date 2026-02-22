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


export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {IMGS.map(img => (
          <button
            key={img.id}
            onClick={() => { setSelected(img); setPopup(true); }}
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

      {/* ── 팝업 ── */}
      {popup && selected && (
        <div
          onClick={() => { setSelected(null); setPopup(false); }}
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
                <button className="btn-ok" onClick={() => { setSelected(null); setPopup(false); }} style={{ fontSize: 10, padding: '3px 12px' }}>✕ 닫기</button>
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
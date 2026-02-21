import React from 'react';

export default function Window({ title, type = 'blue-title', showScrollbar = false, showResize = false, children, style = {}, className = '' }) {
  return (
    <div className={`window ${type} ${className}`} style={style}>
      <div className="window-titlebar">
        <div className="window-dots">
          {/* 색칠된 원 3개 */}
          <div className="window-dot" style={{ background: '#ff7070', border: '1px solid #e05050' }} />
          <div className="window-dot" style={{ background: '#c8a0e8', border: '1px solid #a880c8' }} />
          <div className="window-dot" style={{ background: '#def79c', border: '1px solid #a880c8' }} />
        </div>
        {title && <span className="window-title-text">{title}</span>}
        {showResize && <span className="window-resize-icon">↗</span>}
      </div>
      {showScrollbar ? (
        <div className="window-with-scrollbar">
          <div style={{ flex: 1 }}>{children}</div>
          <div className="window-scrollbar">
            <div className="scrollbar-arrow">▲</div>
            <div className="scrollbar-track" />
            <div className="scrollbar-arrow">▼</div>
          </div>
        </div>
      ) : children}
    </div>
  );
}
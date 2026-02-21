import React from 'react';

// type: 'blue-title' | 'lavender-title' | 'yellow-title' | 'yellow-border'
export default function Window({ title, type = 'blue-title', showScrollbar = false, showResize = false, children, style = {}, className = '' }) {
  return (
    <div className={`window ${type} ${className}`} style={style}>
      <div className="window-titlebar">
        <div className="window-dots">
          <div className="window-dot" />
          <div className="window-dot" />
          <div className="window-dot" />
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
import React from 'react';

const FILTERS = [
  { id: 'wheelchair', label: '♿ 휠체어 접근' },
  { id: 'braille', label: '🔠 점자 메뉴판' },
  { id: 'dog', label: '🐕 안내견 동반' },
  { id: 'parking', label: '🅿️ 장애인 주차장' }
];

function FilterBar({ activeFilters, onToggleFilter }) {
  return (
    <div style={styles.container}>
      <div style={styles.scrollArea}>
        {FILTERS.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => onToggleFilter(filter.id)}
              style={{
                ...styles.button,
                backgroundColor: isActive ? '#4f46e5' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                border: isActive ? '1px solid #4f46e5' : '1px solid #e2e8f0',
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '15px',
    left: '0',
    width: '100%',
    zIndex: 10, // 지도가 아래 깔리고 그 위에 무조건 붕 뜨게 레이어 우선순위 부여
    padding: '0 15px',
  },
  scrollArea: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: '5px',
  },
  button: {
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
  }
};

export default FilterBar;
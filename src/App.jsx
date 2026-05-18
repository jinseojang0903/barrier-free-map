import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import Profile from './pages/Profile';

const ProfilePlaceholder = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>👤 마이페이지 & 포인트</h2>
    <p>여기에 사용자 등급, 기여도 뱃지, 리워드 상점이 들어갈 예정입니다.</p>
  </div>
);

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.navBar}>
      <button style={styles.navButton} onClick={() => navigate('/')}>🏠 홈</button>
      <button style={styles.navButton} onClick={() => navigate('/report')}>📸 제보</button>
      <button style={styles.navButton} onClick={() => navigate('/profile')}>🏅 마이</button>
    </div>
  );
};

function App() {
  // 🔥 핵심: 피드(게시물) 데이터를 App 전체에서 관리합니다.
  const [feedData, setFeedData] = useState([
    {
      id: 1,
      user: "명지대_장진서",
      time: "10분 전",
      location: "📍 양주시 덕계역 앞 스타벅스",
      image: null, // 기본 가짜 사진은 null로 둡니다.
      tags: ["#휠체어진입가능", "#턱없음"],
      content: "입구에 턱이 아예 없어서 휠체어나 유모차 진입이 아주 편합니다! 👍"
    }
  ]);

  // 새로운 제보(사진)를 피드 맨 위에 추가하는 함수
  const addNewPost = (newPost) => {
    setFeedData([newPost, ...feedData]);
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        <div style={styles.contentArea}>
          <Routes>
            {/* Home에는 피드 데이터를, Report에는 피드를 추가하는 함수를 넘겨줍니다! */}
            <Route path="/" element={<Home feedData={feedData} />} />
            <Route path="/report" element={<Report onAddPost={addNewPost} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

const styles = {
  appContainer: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', fontFamily: 'sans-serif' },
  contentArea: { flex: 1, overflowY: 'auto' },
  navBar: { height: '60px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 },
  navButton: { background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }
};

export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_QUESTS = [
  { id: 1, title: "가게 앞 턱/경사로 사진 제보", location: "양주시청 인근 상권", points: 500, category: "♿ 휠체어접근" },
  { id: 2, title: "인도 위 방치된 공유 킥보드 신고", location: "덕계동 학원가 보도", points: 200, category: "⚠️ 통행방해" },
];

function Home({ feedData }) { // 🔥 App에서 넘겨준 feedData 받아오기
  const navigate = useNavigate();
  // 사진을 한 장 찍고 오면 포인트가 500P 올라가 있게 보이도록 센스있게 세팅!
  const [userPoints] = useState(feedData.length > 1 ? 1750 : 1250); 

  return (
    <div style={styles.container}>
      {/* 1. 상단 대시보드 */}
      <div style={styles.header}>
        <span style={styles.subTitle}>참여형 배리어프리 로컬 플랫폼</span>
        <h1 style={styles.mainTitle}>🏅 모두의 지도</h1>
        <div style={styles.pointCard}>
          <span style={styles.pointLabel}>나의 누적 포인트</span>
          <strong style={styles.pointValue}>{userPoints.toLocaleString()} P</strong>
        </div>
      </div>

      {/* 2. 로컬 퀘스트 영역 */}
      <div style={styles.content}>
        <h3 style={styles.sectionTitle}>🔥 참여 가능한 로컬 퀘스트</h3>
        <div style={styles.questList}>
          {MOCK_QUESTS.map((quest) => (
            <div key={quest.id} style={styles.questCard}>
              <div style={styles.questMeta}>
                <span style={styles.categoryBadge}>{quest.category}</span>
                <span style={styles.questLocation}>{quest.location}</span>
              </div>
              <h4 style={styles.questTitle}>{quest.title}</h4>
              <div style={styles.questFooter}>
                <span style={styles.rewardText}>성공 시 <strong>+{quest.points}P</strong></span>
                <button style={styles.actionButton} onClick={() => navigate('/report')}>제보 📸</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 🔥 실시간 피드 영역 (여기서 찍은 사진이 나옵니다!) */}
      <div style={{ padding: '0 20px', marginTop: '10px' }}>
        <h3 style={styles.sectionTitle}>📸 실시간 동네 피드</h3>
        <p style={styles.sectionDesc}>우리 동네 이웃들이 제보한 최신 정보입니다.</p>

        {feedData.map(post => (
          <div key={post.id} style={styles.feedCard}>
            <div style={styles.feedHeader}>
              <div style={styles.feedAvatar}>😎</div>
              <div>
                <div style={styles.feedUser}>{post.user} <span style={styles.feedTime}>{post.time}</span></div>
                <div style={styles.feedLocation}>{post.location}</div>
              </div>
            </div>
            
            <div style={styles.feedImagePlaceholder}>
              {/* image 값이 있으면 진짜 사진을, 없으면 가짜 텍스트를 띄웁니다! */}
              {post.image ? (
                <img src={post.image} alt="제보사진" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{color: '#94a3b8'}}>경사로 설치 완료 사진</span> 
              )}
            </div>
            
            <div style={styles.feedContent}>
              {post.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}
              <p style={{margin: '10px 0 0 0', fontSize: '14px', color: '#334155'}}>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'sans-serif' },
  header: { backgroundColor: '#C00000', padding: '30px 20px 40px 20px', color: '#ffffff', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', boxShadow: '0 4px 15px rgba(192, 0, 0, 0.2)' },
  subTitle: { fontSize: '13px', opacity: 0.8, fontWeight: '500' },
  mainTitle: { fontSize: '26px', margin: '4px 0 20px 0', fontWeight: '800' },
  pointCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)' },
  pointLabel: { fontSize: '14px', fontWeight: '500' },
  pointValue: { fontSize: '22px', fontWeight: '800' },
  content: { padding: '25px 20px' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' },
  sectionDesc: { fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' },
  questList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  questCard: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '18px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
  questMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  categoryBadge: { backgroundColor: '#ffe4e6', color: '#e11d48', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' },
  questLocation: { fontSize: '12px', color: '#64748b' },
  questTitle: { fontSize: '15px', fontWeight: '700', color: '#334155', margin: '0 0 16px 0', lineHeight: '1.4' },
  questFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e2e8f0', paddingTop: '12px' },
  rewardText: { fontSize: '13px', color: '#475569' },
  actionButton: { backgroundColor: '#C00000', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  
  feedCard: { backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '20px' },
  feedHeader: { display: 'flex', alignItems: 'center', padding: '16px', gap: '10px' },
  feedAvatar: { width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' },
  feedUser: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
  feedTime: { fontSize: '12px', color: '#94a3b8', fontWeight: 'normal', marginLeft: '5px' },
  feedLocation: { fontSize: '12px', color: '#64748b', marginTop: '2px' },
  feedImagePlaceholder: { width: '100%', height: '250px', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  feedContent: { padding: '16px' },
  tag: { color: '#C00000', fontSize: '13px', fontWeight: 'bold', marginRight: '8px' }
};

export default Home;
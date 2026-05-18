import React, { useState } from 'react';

// 게이미피케이션 요소: 유저가 획득한 명예 배지 데이터
const MOCK_BADGES = [
  { id: 1, name: "첫걸음 제보자", icon: "🌱", desc: "첫 번째 배리어프리 사진을 등록함" },
  { id: 2, name: "양주 보안관", icon: "🤠", desc: "방치된 킥보드를 5회 이상 신고함" },
  { id: 3, name: "동네 상권 수호자", icon: "☕", desc: "소규모 카페 리뷰를 3회 이상 작성함" },
];

// PPT 제안서의 '실질적 보상'을 증명할 기프티콘 리워드 데이터
const MOCK_COUPONS = [
  { id: 1, name: "스타벅스 아이스 아메리카노 T", cost: 1000, brand: "스타벅스" },
  { id: 2, name: "GS25 모바일 상품권 3,000원권", cost: 600, brand: "GS25" },
  { id: 3, name: "컴포즈커피 아메리카노", cost: 400, brand: "컴포즈커피" },
];

function Profile() {
  // 홈 화면과 싱크를 맞춘 초기 포인트 설정
  const [points, setPoints] = useState(1250);

  // 기프티콘 교환 버튼 클릭 시 작동하는 함수
  const handleExchange = (couponName, cost) => {
    if (points < cost) {
      alert("포인트가 부족합니다! 로컬 퀘스트에 참여해 포인트를 더 모아보세요.");
      return;
    }
    
    if (window.confirm(`'${couponName}'을(를) ${cost}P로 교환하시겠습니까?`)) {
      setPoints(prev => prev - cost);
      alert(`🎉 교환 성공!\n기프티콘 바코드가 '마이 쿠폰함'으로 즉시 발급되었습니다.\n(남은 포인트: ${(points - cost).toLocaleString()} P)`);
    }
  };

  return (
    <div style={styles.container}>
      {/* 상단 프로필 헤더 (Crimson Red 테마 매칭) */}
      <div style={styles.profileHeader}>
        <div style={styles.avatar}>🤠</div>
        <div style={styles.profileInfo}>
          <h2 style={styles.userName}>명지대_장진서</h2>
          <span style={styles.userTier}>🏅 레벨 3 골드 서포터즈</span>
        </div>
      </div>

      {/* 실시간 잔여 포인트 대시보드 */}
      <div style={styles.pointSection}>
        <div style={styles.pointCard}>
          <span style={styles.pointLabel}>사용 가능한 포인트</span>
          <strong style={styles.pointValue}>{points.toLocaleString()} P</strong>
        </div>
      </div>

      {/* 1. 기여 배지 영역 (공모전 심사위원 저격 포인트) */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>🏅 나의 배리어프리 기여 배지</h3>
        <div style={styles.badgeList}>
          {MOCK_BADGES.map(badge => (
            <div key={badge.id} style={styles.badgeCard}>
              <div style={styles.badgeIcon}>{badge.icon}</div>
              <div style={styles.badgeName}>{badge.name}</div>
              <div style={styles.badgeDesc}>{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 리워드 상점 영역 (지속 가능한 참여 유도 메커니즘) */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>🎁 포인트 리워드 상점</h3>
        <p style={styles.sectionDesc}>활동으로 적립한 포인트를 실질적인 혜택으로 교환하세요.</p>
        
        <div style={styles.couponList}>
          {MOCK_COUPONS.map(coupon => (
            <div key={coupon.id} style={styles.couponCard}>
              <div style={styles.couponMain}>
                <span style={styles.couponBrand}>{coupon.brand}</span>
                <h4 style={styles.couponName}>{coupon.name}</h4>
                <span style={styles.couponCost}>💰 {coupon.cost} P</span>
              </div>
              <button 
                style={styles.exchangeButton}
                onClick={() => handleExchange(coupon.name, coupon.cost)}
              >
                교환 🛒
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'sans-serif' },
  profileHeader: { backgroundColor: '#C00000', padding: '40px 20px 50px 20px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '15px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', boxShadow: '0 4px 15px rgba(192, 0, 0, 0.2)' },
  avatar: { width: '60px', height: '60px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px' },
  profileInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  userName: { fontSize: '20px', fontWegiht: '800', margin: 0 },
  userTier: { fontSize: '13px', opacity: 0.9, fontWeight: '600' },
  pointSection: { padding: '0 20px', marginTop: '-25px' },
  pointCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', display: 'flex', justifycontent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },
  pointLabel: { fontSize: '14px', fontWeight: '700', color: '#64748b' },
  pointValue: { fontSize: '24px', fontWeight: '900', color: '#C00000' },
  section: { padding: '25px 20px 10px 20px' },
  sectionTitle: { fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: '0 0 12px 0' },
  sectionDesc: { fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' },
  badgeList: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  badgeCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px 8px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  badgeIcon: { fontSize: '28px', marginBottom: '6px' },
  badgeName: { fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' },
  badgeDesc: { fontSize: '10px', color: '#94a3b8', lineHeight: '1.2' },
  couponList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  couponCard: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  couponMain: { display: 'flex', flexDirection: 'column', gap: '2px' },
  couponBrand: { fontSize: '11px', color: '#94a3b8', fontWeight: '600' },
  couponName: { fontSize: '14px', fontWeight: '700', color: '#334155', margin: 0 },
  couponCost: { fontSize: '13px', fontWeight: '700', color: '#C00000', marginTop: '4px' },
  exchangeButton: { backgroundColor: '#1e293b', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
};

export default Profile;
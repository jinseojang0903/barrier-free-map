import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Report({ onAddPost }) { // 🔥 App에서 넘겨준 함수 받아오기
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl); // 사진 미리보기 URL 생성
    }
  };

  const handleSubmit = () => {
    if (!imageSrc) {
      alert("먼저 사진을 촬영해 주세요!");
      return;
    }
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setShowSuccess(true);
      
      // 🔥 핵심: 팝업이 뜰 때, 방금 찍은 사진으로 새 게시물을 만듭니다!
      onAddPost({
        id: Date.now(),
        user: "심사위원(현장제보)",
        time: "방금 전",
        location: "📍 현장 즉석 제보",
        image: imageSrc, // 방금 찍은 사진 주소!
        tags: ["#현장확인", "#배리어프리"],
        content: "방금 현장에서 직접 촬영하여 제보한 사진입니다! 📸"
      });
      
      setTimeout(() => {
        navigate('/'); // 홈으로 이동하면 방금 추가한 피드가 보입니다!
      }, 2000);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📍 배리어프리 제보하기</h2>
      <p style={styles.desc}>현장의 문턱이나 편의시설을 촬영해 주세요.</p>

      <div style={styles.uploadBox}>
        {imageSrc ? (
          <img src={imageSrc} alt="미리보기" style={styles.previewImage} />
        ) : (
          <label style={styles.cameraLabel}>
            <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} style={{ display: 'none' }} />
            <div style={styles.cameraIcon}>📸</div>
            <span>카메라 켜기</span>
          </label>
        )}
      </div>

      {imageSrc && (
        <button style={styles.submitBtn} onClick={handleSubmit}>
          {isUploading ? '업로드 중...' : '제보 완료 및 포인트 받기'}
        </button>
      )}

      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <div style={styles.confetti}>🎉</div>
            <h3 style={styles.popupTitle}>제보 완료!</h3>
            <p style={{ margin: '10px 0', color: '#64748b' }}>모두의 지도에 기여하셨습니다.</p>
            <strong style={styles.pointText}>+500 P 적립 완료</strong>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '30px 20px', fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#fff' },
  title: { fontSize: '22px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  desc: { fontSize: '14px', color: '#64748b', marginBottom: '30px' },
  uploadBox: { width: '100%', height: '300px', backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '20px' },
  cameraLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#475569', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
  cameraIcon: { fontSize: '40px', marginBottom: '10px' },
  previewImage: { width: '100%', height: '100%', objectFit: 'cover' },
  submitBtn: { width: '100%', backgroundColor: '#C00000', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  popup: { backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', width: '80%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', animation: 'popIn 0.4s ease-out' },
  confetti: { fontSize: '50px', marginBottom: '10px' },
  popupTitle: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 },
  pointText: { fontSize: '20px', fontWeight: '900', color: '#C00000', display: 'block', marginTop: '15px' }
};

export default Report;
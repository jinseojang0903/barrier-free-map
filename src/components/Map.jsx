import React, { useEffect, useRef } from 'react';

/* global kakao */
/* eslint-disable no-unused-vars */

// PPT 제안 기반 로컬 배리어프리 모의 데이터 [cite: 20]
const MOCK_PLACES = [
  { id: 1, name: "양주 배리어프리 카페", lat: 37.7852, lng: 127.0457, features: ['wheelchair', 'dog'] },
  { id: 2, name: "행복 나눔 식당 (점자 구비)", lat: 37.7875, lng: 127.0432, features: ['braille', 'wheelchair'] },
  { id: 3, name: "모두를 위한 소규모 마트", lat: 37.7831, lng: 127.0485, features: ['wheelchair', 'parking'] },
  { id: 4, name: "희망 도서관", lat: 37.7890, lng: 127.0410, features: ['braille', 'parking', 'dog'] }
];

function Map({ activeFilters }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const kakaoApi = window.kakao;

    if (!kakaoApi || !kakaoApi.maps) {
      console.error("카카오맵 SDK가 index.html에 로드되지 않았습니다.");
      return;
    }

    // 리액트 생명주기와 카카오 엔진 싱크 맞추기
    kakaoApi.maps.load(() => {
      const container = mapContainer.current; // 블로그처럼 명시적 컨테이너 추출

      if (!mapRef.current) {
        const options = {
          center: new kakaoApi.maps.LatLng(37.7852, 127.0457), // 초기 중심: 양주시청 인근 [cite: 20]
          level: 4,
        };
        mapRef.current = new kakaoApi.maps.Map(container, options);
      }

      const map = mapRef.current;

      // 기존 마커 청소
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // 필터링된 데이터 선별 [cite: 14]
      const filteredPlaces = MOCK_PLACES.filter(place => {
        if (activeFilters.length === 0) return true;
        return activeFilters.every(filter => place.features.includes(filter));
      });

      // 마커 찍기 및 말풍선 기능
      filteredPlaces.forEach(place => {
        const markerPosition = new kakaoApi.maps.LatLng(place.lat, place.lng);
        
        const marker = new kakaoApi.maps.Marker({
          position: markerPosition,
          map: map
        });

        markersRef.current.push(marker);

        const iwContent = `
          <div style="padding:10px; min-width:150px; font-family:sans-serif;">
            <strong style="color:#4f46e5; font-size:14px;">${place.name}</strong><br/>
            <span style="font-size:11px; color:#64748b; margin-top:4px; display:inline-block;">
              ${place.features.map(f => '#' + f).join(' ')}
            </span>
          </div>
        `;
        
        const infowindow = new kakaoApi.maps.InfoWindow({
          content: iwContent,
          removable: true
        });

        kakaoApi.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });
      });
    });
  }, [activeFilters]);

  return (
    <div 
      ref={mapContainer} 
      style={{ width: '100%', height: '100%', minHeight: 'calc(100vh - 60px)' }}
    >
      {/* 이 영역에 카카오 지도가 렌더링됩니다 */}
    </div>
  );
}

export default Map;
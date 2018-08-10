# Introduction
ㄱ ㅐ모임은 내가 산책하고 있는 주변에 다른 산책을 하거나 근처에 사는 개친구들을 찾아볼수 있는 플랫폼입니다.

![snapshot-dogmeetup](https://user-images.githubusercontent.com/34699932/43967035-698c19ca-9cfe-11e8-9550-230397806d8a.jpg)

## Requirements
- ㄱ ㅐ모임은 Facebook 가입자만 이용 가능합니다.
- geolocation을 이용하여, 위치 사용을 허용해야합니다.
- Chrome Browser를 권장합니다.

## Features
- Facebook을 이용한 로그인 서비스 구현
- 나의 개 리스트 등록/수정/삭제
- google map을 이용한 지도 표시
- geoLocation을 이용한 현재 위치 표시
- 산책중/휴식중 표시
- 나의 개 리스트별 산책 기록 확인

## Client-Side
- React로 UI아키텍쳐 구현
- Redux를 사용하여 state 관리
- middleware : Redux-logger로 개발시 action및 state debugging 간편화
- CSS : BootStrap 프레임워크 사용

## Server-Side
- firebase를 이용한 realtime database시스템
- firebase storage를 이용한 이미지 업로드
- facebook API를 이용한 로그인/ 로그아웃 구현

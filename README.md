# irontrain-frontend

아이언트레인 프론트엔드 과제

# 실행 방법

- Express 사용하여 CORS 해결 할 것 [TODO]
- npm install
- npm run build
- npm start

# 문제 해결 방식

## 1. 컴포넌트 분리

- Table, DatePicker, CheckBox 분리하여 구현
- 아이콘 관련 분리: Sort, Caret

## 2. api 객체화 및 express 적용으로 cors 해결

## 3. 테이블 이름 정렬

- 문제 : API 응답 데이터에서 이름이 firstname과 lastname으로 분리되어 있어, 정렬 로직 적용이 어려움.
- 해결 방법
  - 응답 데이터를 변환하여 name 필드를 추가
    - firstname과 lastname을 합친 name 필드 생성.
    - 상태(state)에 name 필드를 포함하여 정렬 로직에서 사용.

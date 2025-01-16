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

## 4. 검색어 데이터 필터링

- 문제1 : 검색어를 입력하여 테이블 데이터를 필터링할 때, 객체의 모든 필드를 비교해야 하는 경우가 있었음.
- 해결 방법 :

  - Object.values를 사용해 person 객체의 모든 필드 값을 배열반환 하고, some 메서드를 통해 검색어와 일치하는 값이 있는지 확인하여 필터링 방식을 채택
    - 성별, 날짜는 검색어에서 제외

- 문제2 : 검색 필터 외부 분리로 인한 문제.
- 해결 방법 :
  - 검색 필터 영역을 외부로 빼서 테이블 영역과 검색 영역(HeaderSection)을 분리.
  - zustand 상태 관리 라이브러리를 활용하여 검색 상태를 전역적으로 관리.

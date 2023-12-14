
<p align="center">
  <img src="images/img_1.png" alt="맛집사이트로고">
</p>

<h1 align="center">유튜브 정보 기반 맛집 지도 서비스</h1>
<p align="center"><a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fparkyolo%2FminiHanaInsurance&count_bg=%232BB1A9&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a></p>

<br>

> <p style="color:gray; font-weight:bold;"></p>
> <p style="color:gray; font-weight:bold;">개발기간: 2023.09.04 ~ 2023.12.12</p>

<br>

## 💻 배포 주소

> <p style="color:gray; font-weight:bold;"><a href="https://thswogh.github.io/Seoul_Restaurant_Map/">배포 사이트</a><p>
> <p style="color:gray; font-weight:bold;"><a href="https://docs.google.com/presentation/d/1fYYMSaQyoykspMV_Ud-pYuITTyNAPKUc/edit?usp=sharing&ouid=110693294229754667378&rtpof=true&sd=true">시현 영상 및 소개 자료</a></p>

<br>

## 🙋🏻‍♀️ 팀원 소개
<table>
    <tr>
        <td align="center">홍지섭</td>
        <td align="center">손재호</td>
        <td align="center">안치원</td>
        <td align="center">서화진</td>
        <td align="center">김성림</td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/jiseop121">@jiseop121</a></td>
        <td align="center"><a href="https://github.com/thswogh">@thswogh</a></td>
      <td align="center"><a href="https://github.com/dh5252">@dh5252</a></td>
    </tr>
    <tr>
        <td>&middot; 팀장<br>&middot; 아이디어 제안자<br>&middot; 데이터베이스 구축 담당<br>&middot; 기획 담당</td>
        <td>&middot; 프론트엔드 개발 담당</td>
        <td>&middot; 서버 개발 담당</td>
        <td>&middot; 웹 디자인 설계 담당</td>
        <td>&middot; 웹 디자인 설계 담당</td>
    </tr>
</table>

<br>

## 💡 프로젝트 소개
- 유튜브 데이터 기반으로 맛집을 소개하는 유튜버를 선정한 뒤 유튜버들이 소개한 맛집들의 정보를 모아 지도 형식으로 제공하는 서비스입니다.
- 사용자들은 비디오 조회 수, 지역, 음식 카테고리와 같은 다양한 기준으로 맛집을 태그 형식으로 검색할 수 있어, 원하는 식당을 쉽게 찾을 수 있습니다.
- 사용자들은 방문한 맛집을 리스트에 추가하고, 친구들과 이를 공유할 수 있습니다. 또한, 맛집을 요청하거나 다른 사용자의 추천에 응답할 수 있는 시스템을 구축하여 사용자와 사용자간, 사용자와 개발자간의 소통을 도모합니다.
- 데이터베이스 코드를 오픈소스로 제공하여, 다른 개발자들이 손쉽게 유튜브 정보 기반의 지도 서비스를 개발할 수 있도록 기여했습니다.

<br>

## 📚 시작 가이드
### Requirements
For building and running the application you need: 
<br>
<a href="https://github.com/InterfaceProject-Seoul-aRestaurant-Map/Seoul_Restaurant_Map/tree/merge">Back-end</a></td>
<br>
<a href="https://github.com/InterfaceProject-Seoul-aRestaurant-Map/Seoul_Restaurant_Map/tree/front-end">front-end</a></td>
<br>
<a href="https://github.com/InterfaceProject-Seoul-aRestaurant-Map/Seoul_Restaurant_Map/tree/database">database</a></td>
<br>
- **Front-end**
  1. 브라우저 호환성:
      - Google Chrome, Firefox, Safari, 또는 Microsoft Edge와 호환되는 최신 버전의 브라우저.
  2. Node.js 및 패키지 매니저:
      - Node.js: React 애플리케이션을 실행하기 위한 Node.js 환경. (권장 버전: 확인 필요)
      - 패키지 매니저: npm 또는 yarn과 같은 패키지 매니저를 통한 필요한 라이브러리 및 의존성 관리.
- **Back-end**
  - jdk 11.0.21
  - spring boot 3.1.3
- **database**
  - python 3.9

### Installation

#### DATABASE
1. create .env file
    ```
    YOUTUBE_API_KEY = {input your key}
    YOUTUBE_API_KEY_2 =  {input your key}
    KAKAO_RESTAPI_KEY =  {input your key}
    SERVICE_ACCOUNT_JSON_PATH =  {input your json file path}
    SQL_CONNECT_NAME = {input your cloud sql name}
   ```
2. open cli
    ```
    cd ~/database
    pip install -r requirements.txt
    python main.py
    ```

<hr style="border:0; height:2px; background:gray;">

## 🐸 Stacks

### Enviornment
<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white">  <img src="https://img.shields.io/badge/GIT-F05032?style=flat-square&logo=git&logoColor=white">  <img src="https://img.shields.io/badge/GITHUB-181717?style=flat-square&logo=github&logoColor=white">  <img src="https://img.shields.io/badge/PyCharm-181717?style=flat-square&logo=pycharm&logoColor=white">

### Config
<img src="https://img.shields.io/badge/NPM-CB3837?style=flat-square&logo=npm&logoColor=white">

### Development
<img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=spring&logoColor=white">  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white">  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">

### Communication
<img src="https://img.shields.io/badge/NOTION-000000?style=flat-square&logo=notion&logoColor=white">  <img src="https://img.shields.io/badge/GITHUB-181717?style=flat-square&logo=github&logoColor=white">

<hr style="border:0; height:2px; background:gray;">

## 📖 주요 기능
### 메인 페이지
- 태그 검색 기능
- 지도 내 재 검색 기능
- 식당 리스트에 추가 기능
- 식당 정보 카카오 맵 페이지 및 유튜브 영상 조회 기능

### 리스트 페이지
- 내 리스트 관리
- 친구 리스트 조회 및 내 리스트로 공유 기능
  
### 요청 페이지
- "기존에 존재하는 채널" 중 새롭게 추가하고 싶은 맛집 요청 기능
- 처리 상태로 등록 유무 확인 가능
### 건의사항 게시판 페이지
- 일반 게시판 페이지
  - 공지사항 기능
  - 기타 건의사항 기능
- 채널 요청 페이지
  - 등록되어있지 않은 채널 요청 기능
  - 운영자 답글로 확인
### 관리자 페이지
- 공지사항 등록 기능
- 요청에 대한 반려/승인 답변 기능
- 모든 글 삭제 권한
 
<br>

## 🖥️ 주요 화면
<table>
    <tr>
        <td align="center">메인페이지</td>
        <td align="center">리스트페이지</td>
    </tr>
    <tr>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/kcBdYq.jpg" alt="메인페이지"></span></td>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/S9dZt6.jpg" alt="리스트페이지"></span></td>
    </tr>
    <tr>
        <td align="center">요청페이지</td>
        <td align="center">건의사항페이지</td>
    </tr>
    <tr>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/oOm5d3.jpg" alt="요청페이지"></span></td>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/NQ2jd9.jpg" alt="건의사항페이지"></span></td>
    </tr>
  <tr>
        <td align="center">관리자페이지1</td>
        <td align="center">관리자페이지2</td>
    </tr>
    <tr>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/Mz31WL.jpg" alt="관리자페이지1"></span></td>
        <td align="center"><span><img height="100%" src="https://ifh.cc/g/ttsfxT.jpg" alt="관리자페이지2"></span></td>
    </tr>
</table>

<br>

## 🛠️ 시스템 아키텍처
![시스템아키텍처](images/img.png)

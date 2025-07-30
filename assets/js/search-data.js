// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-people",
          title: "People",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-photos",
          title: "Photos",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/photos/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Research publications and academic works.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A showcase of BAELAB&#39;s innovative projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-congratulation-daesan-park-and-hyunha-lee-have-accepted-their-presentation-in-informs-annual-meeting-2025",
          title: 'Congratulation 🎓🍑 🇺🇸 !!! Daesan Park and Hyunha Lee have accepted their presentation...',
          description: "",
          section: "News",},{id: "news-selamat-tinggal-dan-selamat-️-mingi-han-has-submitted-a-paper-to-the-journal-of-the-korean-institute-of-industrial-engineers-jkiie",
          title: 'Selamat tinggal dan selamat! 🏝️ 🌋🐚 !!! Mingi Han has submitted a paper...',
          description: "",
          section: "News",},{id: "news-informs-international-2025-invitation-with-김도희-권재은",
          title: 'INFORMS International 2025 Invitation with 김도희, 권재은',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/informs/";
            },},{id: "people-bernardo-nugroho-yahya",
          title: 'Bernardo Nugroho Yahya',
          description: "Professor at Hankuk Univ of Foreign Studies, Industrial Engineering",
          section: "People",handler: () => {
              window.location.href = "/people/BernardoNugrohoYahya/";
            },},{id: "people-권재은",
          title: '권재은',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B6%8C%EC%9E%AC%EC%9D%80/";
            },},{id: "people-dohee-kim",
          title: 'Dohee Kim',
          description: "Professor at 탄소중립연구센터",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EB%8F%84%ED%9D%AC/";
            },},{id: "people-김민섭",
          title: '김민섭',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EB%AF%BC%EC%84%AD/";
            },},{id: "people-김민희",
          title: '김민희',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EB%AF%BC%ED%9D%AC/";
            },},{id: "people-김성한",
          title: '김성한',
          description: "MS Student",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EC%84%B1%ED%95%9C/";
            },},{id: "people-김소명",
          title: '김소명',
          description: "Combined Master&#39;s and Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EC%86%8C%EB%AA%85/";
            },},{id: "people-김예린",
          title: '김예린',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EA%B9%80%EC%98%88%EB%A6%B0/";
            },},{id: "people-박기군",
          title: '박기군',
          description: "Post Doctor at BAELAB",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%95%EA%B8%B0%EA%B5%B0/";
            },},{id: "people-박대산",
          title: '박대산',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%95%EB%8C%80%EC%82%B0/";
            },},{id: "people-박은희",
          title: '박은희',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%95%EC%9D%80%ED%9D%AC/";
            },},{id: "people-박택현",
          title: '박택현',
          description: "MS Student",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%95%ED%83%9D%ED%98%84/";
            },},{id: "people-박한별",
          title: '박한별',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%95%ED%95%9C%EB%B3%84/";
            },},{id: "people-배혜림",
          title: '배혜림',
          description: "Professor",
          section: "People",handler: () => {
              window.location.href = "/people/%EB%B0%B0%ED%98%9C%EB%A6%BC/";
            },},{id: "people-서준혁",
          title: '서준혁',
          description: "Combined Master&#39;s and Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%84%9C%EC%A4%80%ED%98%81/";
            },},{id: "people-sunghyun-sim",
          title: 'SungHyun Sim',
          description: "Professor at Changwon National Univ, School of Artificial Intelligence Convergence Engineering",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%8B%AC%EC%84%B1%ED%98%84/";
            },},{id: "people-아리프",
          title: '아리프',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%95%84%EB%A6%AC%ED%94%84/";
            },},{id: "people-gawon-lee",
          title: 'Gawon Lee',
          description: "M.S, Pusan National Univ, Industrial Engineering, (구직중)",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%9D%B4%EA%B0%80%EC%9B%90/";
            },},{id: "people-이경훈",
          title: '이경훈',
          description: "MS Student",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%9D%B4%EA%B2%BD%ED%9B%88/";
            },},{id: "people-imam-mustafa-kamal",
          title: 'Imam Mustafa Kamal',
          description: "Professor at Institut Teknologi Sepuluh Nopember, Department of Informatics",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%9D%B4%EB%A7%98/";
            },},{id: "people-이용재",
          title: '이용재',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%9D%B4%EC%9A%A9%EC%9E%AC/";
            },},{id: "people-이현하",
          title: '이현하',
          description: "Undergraduate Student",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%9D%B4%ED%98%84%ED%95%98/";
            },},{id: "people-조상민",
          title: '조상민',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%A1%B0%EC%83%81%EB%AF%BC/";
            },},{id: "people-추정호",
          title: '추정호',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%EC%B6%94%EC%A0%95%ED%98%B8/";
            },},{id: "people-하니프",
          title: '하니프',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%ED%95%98%EB%8B%88%ED%94%84/";
            },},{id: "people-허재현",
          title: '허재현',
          description: "Ph.D",
          section: "People",handler: () => {
              window.location.href = "/people/%ED%97%88%EC%9E%AC%ED%98%84/";
            },},{id: "people-홍성문",
          title: '홍성문',
          description: "M.S",
          section: "People",handler: () => {
              window.location.href = "/people/%ED%99%8D%EC%84%B1%EB%AC%B8/";
            },},{id: "photo-2024-컨퍼런스",
          title: '2024_컨퍼런스',
          description: "2024년 컨퍼런스",
          section: "Photo",handler: () => {
              window.location.href = "/photo/logistics_2024/";
            },},{id: "photo-dohee-kim",
          title: 'Dohee Kim',
          description: "Professor at 탄소중립연구센터",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EA%B9%80%EB%8F%84%ED%9D%AC/";
            },},{id: "photo-김민섭",
          title: '김민섭',
          description: "Ph.D",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EA%B9%80%EB%AF%BC%EC%84%AD/";
            },},{id: "photo-김민희",
          title: '김민희',
          description: "M.S",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EA%B9%80%EB%AF%BC%ED%9D%AC/";
            },},{id: "photo-김성한",
          title: '김성한',
          description: "MS Student",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EA%B9%80%EC%84%B1%ED%95%9C/";
            },},{id: "photo-2025-봄체육대회",
          title: '2025_봄체육대회',
          description: "2025년 봄대회 사진",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EB%B4%84%EB%8C%80%ED%9A%8C/";
            },},{id: "photo-2025-중국",
          title: '2025_중국',
          description: "2025년 중국 사진",
          section: "Photo",handler: () => {
              window.location.href = "/photo/%EC%A4%91%EA%B5%AD2024/";
            },},{id: "projects-레이더-무기체계-주요-구성품의-cbm-솔루션-알고리즘-개발",
          title: '레이더 무기체계 주요 구성품의 CBM+ 솔루션 알고리즘 개발',
          description: "레이더 무기체계 주요 구성품의 CBM+ 솔루션 알고리즘 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/LIG%EB%84%A5%EC%8A%A4%EC%9B%90/";
            },},{id: "projects-meta-k-port-지능화-물류-플랫폼",
          title: 'META K-PORT 지능화 물류 플랫폼',
          description: "META K-PORT 지능화 물류 플랫폼",
          section: "Projects",handler: () => {
              window.location.href = "/projects/METAK/";
            },},{id: "projects-감귤-가격-및-출하량-예측-모델-개발",
          title: '감귤 가격 및 출하량 예측 모델 개발',
          description: "감귤 가격 및 출하량 예측 모델 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EA%B0%90%EA%B7%A4/";
            },},{id: "projects-공기압축기-데이터-분석-및-고장예측-연구-용역",
          title: '공기압축기 데이터 분석 및 고장예측 연구 용역',
          description: "공기압축기 데이터 분석 및 고장예측 연구 용역",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EA%B3%B5%EA%B8%B0%EC%95%95%EC%B6%95%EA%B8%B0/";
            },},{id: "projects-지역산업-혁신을-위한-지역-수요-중심-데이터사이언스-융합인재-양성사업",
          title: '지역산업 혁신을 위한 지역 수요 중심 데이터사이언스 융합인재 양성사업',
          description: "지역산업 혁신을 위한 지역 수요 중심 데이터사이언스 융합인재 양성사업",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EB%8D%B0%EC%82%AC%EC%A0%84/";
            },},{id: "projects-부산항-컨테이너-하역-작업수행-요구시간-ai-예측-모델-개발",
          title: '부산항 컨테이너 하역 작업수행 요구시간 AI 예측 모델 개발',
          description: "부산항 컨테이너 하역 작업수행 요구시간 AI 예측 모델 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EB%B6%80%EC%82%B0%ED%95%AD%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88/";
            },},{id: "projects-부산항-환적-업무-분석",
          title: '부산항 환적 업무 분석',
          description: "부산항 환적 업무 분석",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EB%B6%80%EC%82%B0%ED%95%AD%ED%99%98%EC%A0%81/";
            },},{id: "projects-블록물류-최적화",
          title: '블록물류 최적화',
          description: "블록물류 최적화",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EB%B8%94%EB%A1%9D%EB%AC%BC%EB%A5%98%EC%B5%9C%EC%A0%81%ED%99%94/";
            },},{id: "projects-빅데이터-인공지능-기반-물류-연계-최적화-기술-개발",
          title: '빅데이터/인공지능 기반 물류 연계 최적화 기술 개발',
          description: "빅데이터/인공지능 기반 물류 연계 최적화 기술 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EB%B9%85%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%AC%BC%EB%A5%98%EC%B5%9C%EC%A0%81%ED%99%94/";
            },},{id: "projects-해사안전의-정량적평가를-위한-지표-indicator-개발",
          title: '해사안전의 정량적평가를 위한 지표(Indicator) 개발',
          description: "해사안전의 정량적평가를 위한 지표(Indicator) 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%97%90%EC%96%B4%EC%86%94%EB%A3%A8%EC%85%98%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EB%A7%88%EC%9D%B4%EB%8B%9D%20copy/";
            },},{id: "projects-스마트-에어솔루션-사용자-별-행동-모델링을-위한-프로세스-마이닝-및-인공지능-기반의-공감지능-affectionate-intelligence-ai-기술개발",
          title: '스마트 에어솔루션 사용자 별 행동 모델링을 위한 프로세스 마이닝 및 인공지능 기반의 공감지능(Affectionate...',
          description: "스마트 에어솔루션 사용자 별 행동 모델링을 위한 프로세스 마이닝 및 인공지능 기반의 공감지능(Affectionate Intelligence, AI) 기술개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%97%90%EC%96%B4%EC%86%94%EB%A3%A8%EC%85%98%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EB%A7%88%EC%9D%B4%EB%8B%9D/";
            },},{id: "projects-인공지능-기반-xpl-방법론-연구",
          title: '인공지능 기반 XPL 방법론 연구',
          description: "인공지능 기반 XPL 방법론 연구 한국연구재단(중견후속연구)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EC%A4%91%EA%B2%AC%EA%B3%BC%EC%A0%9C/";
            },},{id: "projects-차량반출입예약시스템-해외-항만-적용사례-분석",
          title: '차량반출입예약시스템 해외 항만 적용사례 분석',
          description: "차량반출입예약시스템 해외 항만 적용사례 분석",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%EC%B0%A8%EB%9F%89%EB%B0%98%EC%B6%9C%EC%9E%85%EC%98%88%EC%95%BD%EC%8B%9C%EC%8A%A4%ED%85%9C/";
            },},{id: "projects-인간-중심-탄소-중립-글로벌-공급망-연구센터",
          title: '인간 중심 - 탄소 중립 글로벌 공급망 연구센터',
          description: "인간 중심 - 탄소 중립 글로벌 공급망 연구센터",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%ED%83%84%EC%86%8C%EC%A4%91%EB%A6%BD%EA%B8%80%EB%A1%9C%EB%B2%8C%EA%B3%B5%EA%B8%89%EB%A7%9D%EC%97%B0%EA%B5%AC%EC%84%BC%ED%84%B0/";
            },},{id: "projects-항만-적정하역능력-산정을-위한-데이터-확보방안-수립-연구용역",
          title: '항만 적정하역능력 산정을 위한 데이터 확보방안 수립 연구용역',
          description: "항만 적정하역능력 산정을 위한 데이터 확보방안 수립 연구용역",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%ED%95%AD%EB%A7%8C%EC%A0%81%EC%A0%95%ED%95%98%EC%97%AD%EB%8A%A5%EB%A0%A5/";
            },},{id: "projects-해상교통-환경-특화-대형행동모형-개발을-위한-에이전트-기술-개발",
          title: '해상교통 환경 특화 대형행동모형 개발을 위한 에이전트 기술 개발',
          description: "해상교통 환경 특화 대형행동모형 개발을 위한 에이전트 기술 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%ED%95%B4%EC%96%91LAM/";
            },},{id: "projects-해양플랫폼-통합통제-관리-기술-개발",
          title: '해양플랫폼 통합통제 관리 기술 개발',
          description: "해양플랫폼 통합통제 관리 기술 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/%ED%95%B4%EC%96%91%ED%94%8C%EB%9E%AB%ED%8F%BC%ED%86%B5%ED%95%A9%ED%86%B5%EC%A0%9C/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%72%62%61%65@%70%75%73%61%6E.%61%63.%6B%72", "_blank");
        },
      },{
        id: 'social-ieee',
        title: 'IEEE Xplore',
        section: 'Socials',
        handler: () => {
          window.open("https://ieeexplore.ieee.org/author/37593905800/", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/혜림-배-184400b1", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-2602-5911", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=2lBv9WUAAAAJ", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@smchain406", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

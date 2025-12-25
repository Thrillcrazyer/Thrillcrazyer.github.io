---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@main/" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/main/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "results/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
<h1 class="intro-title">👋 Hi, I'm 박택현</h1>
I'm a Master's student at [BAELAB](https://pnubaelab.github.io/), Graduate School of Data Science, Pusan National University, Korea.<a href='https://scholar.google.com/citations?user=qQyhAiwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>

# 📌 Research Interests
- **Novel Architectures**: Sequence Modeling, State Space Model with Deep Learning
- **Time Series Analysis**: Port Logistic, Long Term Forecasting
- **LLM** : Process Mining with LLM, RLVR

# 🔥 News
- *2025.12*: &nbsp;🎉🎉 `JustDense: Just using Dense instead of Sequence Mixer for Time Series Analysis` was accepted as a Regular Paper at [IEEE BigData 2025](https://conferences.cis.um.edu.mo/ieeebigdata2025/detailed_program.html).
- *2025.10*: &nbsp;🎉🎉 A new arXiv paper was published: `Reasoning-Aware GRPO using Process Mining` [Paper](https://huggingface.co/papers/2510.25065)

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div class="badge">Arxiv</div><img src='images/PM4GRPO.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[**Reasoning-Aware GRPO using Process Mining**](https://huggingface.co/papers/2510.25065)

<span style="color:#645495">**Taekhyun Park**</span><sup>*</sup>, Yongjae Lee<sup>*</sup> and Hyerim Bae

arXiv

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div class="badge">IEEE Bigdata 2025</div><img src='images/JustDense.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[**JustDense: Just using Dense instead of Sequence Mixer for Time Series analysis**](https://arxiv.org/abs/2508.09153)

<span style="color:#645495">**Taekhyun Park**</span><sup>*</sup>, Yongjae Lee<sup>*</sup>, Daesan Park<sup>*</sup>, Dohee Kim and Hyerim Bae

The 13th IEEE International Conference on Big Data (**IEEE BigData 2025**)

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div class="badge">S&M</div><img src='images/LARCS.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[**LA-RCS: LLM-agent-based Robot Control System**](https://sensors.myu-group.co.jp/sm_pdf/SM4104.pdf3)

<span style="color:#645495">**Taekhyun Park**</span><sup>*</sup>,  Young-Jun Choi, Seung-Hoon Shin, Chang-Eun Lee and Kwangil Lee

Sensors and Materials & IMETI2024, [Project Pages](https://la-rcs.github.io/)

</div>
</div>

# 🎖 Honors and Awards
- *2022.11* 블록체인 기술을 활용한 글쓰기 하이퍼 플랫폼, AI.블록체인 아이디어 경진대회, 경남테크노파크원장상 수상
- *2022.12* 이미지 생성 AI 학습을 위한 P2P 기반 데이터셋 구축 및 AI 소유권 가상자산화 플랫폼, KMOU AI 아이디어 챌린지 대회, 대상 수상, [Link](https://www.kmou.ac.kr/cle/na/ntt/selectNttInfo.do?nttSn=10323305&mi=2541&currPage=1)
- *2023.12* RAG 시스템 + 되먹임 AI 시스템 (S2I, AutoCoT... etc)를 활용한 학교 게시판 DB 기반 검색 AI 시스템, KMOU Capstone Design, 레인보우브레인상 수상
- *2025.11* 해양 LLM 시스템, 2025 K-해양 AI 첼린지, 장려(부산테크노파크 원장) 수상
# 📖 Educations
- **M.S. in Data Science**, Pusan National University (2025.03 ~ )
  - Advisor: Prof. [Hyerim Bae](https://pnubaelab.github.io/)
- **B.S. in Control Engineering**, Korea Maritime & Ocean University (2019.03 ~ 2025.02)
  -  Under graduate student (2023.09 ~ 2025.02) Advisor: Prof. [Kwangil Lee](https://www.kmou.ac.kr/ca/ad/tepDept/main1/view.do?mi=5707&teaSn=1039)
  -  I served military service in ROKA. (2020.10 ~ 2022.02)

# 💻 Internships
- *2024.01 - 2024.03*, DeepLogicChain, Seoul.

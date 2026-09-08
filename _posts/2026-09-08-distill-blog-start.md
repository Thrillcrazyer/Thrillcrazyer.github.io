---
title: "Distill Blog 시작하기"
description: "연구 노트를 위한 Distill 스타일 레이아웃과 LaTeX 수식 작성 예시입니다."
date: 2026-09-08 00:00:00 +0900
lang: ko
tags:
  - Research Notes
  - LaTeX
bibliography: references.bib
---

이 글은 새 블로그의 레이아웃과 수식 렌더링을 확인하기 위한 첫 번째 노트입니다. 글의 본문에 집중할 수 있도록 화면을 넓게 사용하고, 데스크톱에서는 목차가 본문 왼쪽을 따라갑니다.

## 연구 글을 위한 구조

각 글은 제목, 요약, 저자와 소속, 발행일을 먼저 보여줍니다. `##` 와 `###` 로 작성한 제목은 왼쪽 목차에 자동으로 추가되며, 현재 읽고 있는 위치도 표시됩니다.

<aside class="margin-note">
모바일에서는 목차가 본문 위의 접을 수 있는 박스로 바뀌어 작은 화면에서도 본문 폭을 보장합니다.
</aside>

표, 코드, 이미지, 각주와 같은 Markdown 요소도 일반 글처럼 작성할 수 있습니다.[^markdown]

## LaTeX 수식

문장 안의 수식은 `$h_t = f_\theta(h_{t-1}, x_t)$`처럼 작성합니다. 결과는 $h_t = f_\theta(h_{t-1}, x_t)$처럼 렌더링됩니다.

### 블록 수식

두 개의 달러 기호로 감싸면 독립된 블록 수식을 만들 수 있습니다. `aligned`, `cases` 같은 수식 환경을 지원하며, `equation` 또는 `align` 환경을 사용하면 자동 번호도 붙일 수 있습니다.

<div class="equation" markdown="1">

$$
\begin{aligned}
z_t &= \sigma(W_z x_t + U_z h_{t-1}), \\
\tilde{h}_t &= \tanh(W_h x_t + U_h(z_t \odot h_{t-1})), \\
h_t &= (1-z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t.
\end{aligned}
$$

</div>

긴 수식은 작은 화면에서 가로로 스크롤되므로 레이아웃을 밀어내지 않습니다.

## BibTeX 인용

BibTeX 파일에 등록한 키를 사용하면 HiPPO 논문처럼 인용 번호와 글 하단의 참고문헌이 자동으로 만들어집니다<d-cite key="gu2020hippo"></d-cite>.

인용 태그는 백슬래시 없이 다음처럼 작성합니다. 쉼표로 여러 키를 함께 지정할 수도 있습니다.

```html
<d-cite key="gu2020hippo"></d-cite>
<d-cite key="paper-one,paper-two"></d-cite>
```

## 새 글 추가하기

`_posts` 폴더에 `YYYY-MM-DD-slug.md` 형식의 파일을 추가하면 됩니다. 예를 들어 `_posts/2026-09-08-my-note.md`는 자동으로 `/blog/2026/my-note/` 주소에 게시됩니다.

```yaml
---
title: "My Research Note"
description: "A short summary shown on the blog index."
date: 2026-09-08
tags: [Time Series, LLM]
bibliography: references.bib
---
```

BibTeX 파일은 `assets/bibliography/references.bib`에 두고, 각 항목의 키와 `d-cite`의 `key`를 동일하게 작성합니다. 인용된 항목만 처음 등장한 순서대로 References에 표시됩니다.

[^markdown]: 각주는 Markdown의 `[^name]` 문법으로 추가할 수 있으며 글 끝에 자동으로 정리됩니다.

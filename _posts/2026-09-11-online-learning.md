---
title: "Online Learning"
description: 
date: 2026-09-08 00:00:00 +0900
tags: [paper-review, online-learning, state-space-models, linear-attention]
bibliography: references.bib
bibliography_version: 2
---

## Before HiPPO: 구조화된 memory

현대 RNN 연구에서 GRU<d-cite key="Chung2014EmpiricalEO"></d-cite> 이후의 **시대정신**은 “시퀀스의 정보를 어떤 구조로 분해해 기억할 것인가”에 있었다고 생각합니다. RNN은 과거 정보를 고정된 차원의 hidden state에 압축합니다. 결국 제한된 용량에서 핵심은 정보를 얼마나 많이 담느냐보다, 어떤 구조로 분해해 무엇을 잘 보존할지에 있었습니다.

이 문제에 구조를 부여한 예로는 Fourier basis로 과거 정보를 표현한 FRU<d-cite key="zhang2018fru"></d-cite>, Legendre polynomial로 일정 시간 구간의 입력 이력을 표현한 LMU<d-cite key="voelker2019lmu"></d-cite>, 그리고 입력을 trend·seasonality·remainder로 분해한 CRU<d-cite key="sim2023cru"></d-cite>가 있습니다.

| 방법                             | 설명                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| Fourier Recurrent Unit (FRU)<d-cite key="zhang2018fru"></d-cite>     | Fourier 기저를 이용해 과거 은닉 상태를 요약합니다.        |
| Legendre Memory Unit (LMU)<d-cite key="voelker2019lmu"></d-cite>       | Legendre 다항식으로 시간 구간의 입력 이력을 표현합니다. |
| Correlation Recurrent Unit (CRU)<d-cite key="sim2023cru"></d-cite> | 추세와 계절성 등 시계열의 상관 구조를 반영합니다.           |

<figure>
  <img
      src="{{ '/assets/img/online-learning/CRU.png' | relative_url }}"
      alt="Correlation Recurrent Unit Cell Structure"
      loading="lazy"
    >
    <figcaption>Figure 1. Correlation Recurrent Unit(CRU)은 시계열의 추세와 계절성 사이의 상관 구조를 반영해 은닉 상태를 구성합니다.</figcaption>
</figure>

<figure>
  <img
      src="{{ '/assets/img/online-learning/FRU.png' | relative_url }}"
      alt="Fourier basis로 과거 정보를 표현하는 Fourier Recurrent Unit 구조"
      loading="lazy"
    >
    <figcaption>Figure 2. Fourier Recurrent Unit(FRU)은 Fourier 기저를 통해 과거 정보의 주기적 성분을 표현합니다.</figcaption>
</figure>

<figure>
  <img
      src="{{ '/assets/img/online-learning/LMU.png' | relative_url }}"
      alt="Legendre polynomial로 입력 이력을 표현하는 Legendre Memory Unit 구조"
      loading="lazy"
      style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover;"
    >
    <figcaption>Figure 3. Legendre Memory Unit(LMU)은 Legendre 다항식 기저로 시간 구간의 입력 이력을 압축해 유지합니다.</figcaption>
</figure>


## HiPPO: Recurrent Memory with Optimal Polynomial Projection

<aside class="margin-note">
Hilbert space는 inner product와 그로부터 유도되는 distance에 대해 complete한 vector space입니다. 따라서 함수의 유사도를 inner product로 측정하고, orthogonal basis에 대한 projection을 안정적으로 정의할 수 있습니다.
</aside>
앞서 본 방법들의 공통점은 과거 입력을 그대로 저장하는 대신, 특정한 inductive bias를 가진 구조로 분해해 요약한다는 데 있습니다. HiPPO는 이 아이디어를 basis와 measure가 주어진 hilbert space의 projection 문제로 정식화합니다.
무엇을 쉽게 보존하고 무엇을 잊을지는 basis와 measure의 선택이 정합니다. 특히 HiPPO는 orthogonal polynomial basis를 사용해, 과거 signal이 들어올 때마다 그 이력의 optimal finite-dimensional projection coefficient를 유지합니다(**online approximation**). LegS처럼 measure와 basis가 시간에 따라 scale되는 경우에도, 시간을 정규화한 동일한 polynomial-family 좌표 규약 안에서 이 memory를 다룰 수 있습니다.
아래는 이 online approximation 문제를 Legendre basis 위에서 간단히 시각화한 자료입니다.


<link rel="stylesheet" href="{{ '/assets/css/hippo-projection-explorer.css' | relative_url }}">

<section class="hippo-projection-explorer" data-hippo-projection-explorer aria-label="HiPPO projection explorer">
  <div class="hippo-projection-explorer__body">
    <div class="hippo-projection-explorer__stage" aria-live="polite">
      <header class="hippo-projection-explorer__heading">
        <p class="hippo-projection-explorer__eyebrow">Online Approximation</p>
        <h3>Signal memory</h3>
      </header>
      <div class="hippo-projection-explorer__stage-header">
        <span class="hippo-projection-explorer__stage-title">signal and approximation</span>
        <span class="hippo-projection-explorer__sample-count" data-sample-count>1 / 6 observations</span>
      </div>
      <canvas class="hippo-projection-explorer__canvas" aria-label="Observed signal and its polynomial approximation"></canvas>
      <div class="hippo-projection-explorer__legend" aria-hidden="true">
        <span>observed signal</span>
        <span>polynomial approximation</span>
      </div>
      <div class="hippo-projection-explorer__memory">
        <div>
          <p class="hippo-projection-explorer__memory-label">coefficient vector c(t)</p>
          <div class="hippo-projection-explorer__coefficients">
            <div class="hippo-projection-explorer__coefficient"><span>$c_0$</span><span class="hippo-projection-explorer__track"><span class="hippo-projection-explorer__bar" data-coefficient-bar></span></span><span class="hippo-projection-explorer__value" data-coefficient-value>0.00</span></div>
            <div class="hippo-projection-explorer__coefficient"><span>$c_1$</span><span class="hippo-projection-explorer__track"><span class="hippo-projection-explorer__bar" data-coefficient-bar></span></span><span class="hippo-projection-explorer__value" data-coefficient-value>0.00</span></div>
            <div class="hippo-projection-explorer__coefficient"><span>$c_2$</span><span class="hippo-projection-explorer__track"><span class="hippo-projection-explorer__bar" data-coefficient-bar></span></span><span class="hippo-projection-explorer__value" data-coefficient-value>0.00</span></div>
          </div>
        </div>
        <div>
          <p class="hippo-projection-explorer__memory-label">Legendre basis, $u\in[-1,1]$</p>
          <div class="hippo-projection-explorer__bases">
            <div class="hippo-projection-explorer__basis hippo-projection-explorer__basis--level"><span>basis 0</span><strong>$\phi_0(u)=1$</strong></div>
            <div class="hippo-projection-explorer__basis hippo-projection-explorer__basis--trend"><span>basis 1</span><strong>$\phi_1(u)=u$</strong></div>
            <div class="hippo-projection-explorer__basis hippo-projection-explorer__basis--curvature"><span>basis 2</span><strong>$\phi_2(u)=\frac{1}{2}(3u^2-1)$</strong></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hippo-projection-explorer__steps" aria-hidden="true">
      <div class="hippo-projection-explorer__step is-active" data-hippo-step="0"></div>
      <div class="hippo-projection-explorer__step" data-hippo-step="1"></div>
      <div class="hippo-projection-explorer__step" data-hippo-step="2"></div>
      <div class="hippo-projection-explorer__step" data-hippo-step="3"></div>
      <div class="hippo-projection-explorer__step" data-hippo-step="4"></div>
      <div class="hippo-projection-explorer__step" data-hippo-step="5"></div>
    </div>
  </div>
</section>

<script defer src="{{ '/assets/js/hippo-projection-explorer.js' | relative_url }}"></script>


HiPPO는 지금까지 관측한 함수 이력 $f_{\leq t}$를 orthogonal polynomial space에 projection합니다. 시점 $t$의 approximation은 다음과 같이 쓸 수 있습니다.<d-cite key="gu2020hippo"></d-cite>

<aside class="margin-note">
<strong>Orthogonal polynomial basis</strong>는 선택한 measure $\mu$에 대해 서로 다른 basis function이 $\langle\phi_i,\phi_j\rangle_{\mu}=0\;(i\ne j)$를 만족하는 다항식 집합입니다. 유한 구간을 균일하게 보는 Legendre polynomial, 지수적으로 과거를 감쇠하는 measure에 대응하는 Laguerre polynomial, 양 끝점을 더 크게 반영하는 Chebyshev polynomial 등이 대표적입니다. HiPPO의 LegS와 LagT는 각각 Legendre와 Laguerre 계열을 사용합니다.
</aside>

$$
g_t = \sum_{i=0}^{N-1} c_i(t)\phi_i^{(t)},
\qquad
g_t = \underset{g\in\mathcal{G}_t}{\operatorname{argmin}}
\left\|f_{\leq t}-g\right\|_{L^2(\mu_t)}^2.
$$

여기서 $\mu_t$는 과거 각 시점의 중요도를 정하는 measure이고, $\phi_i^{(t)}$는 그 measure에 대해 orthogonal한 basis function입니다. HiPPO는 전체 이력 대신 coefficient vector $c(t)$만 유지하면서, 선택한 measure와 basis에 맞는 update rule을 유도합니다.

$$
\frac{d}{dt}c(t)=-A(t)c(t)+B(t)f(t).
$$

대표적인 Legendre-scaled(LegS)와 translated Laguerre(LagT)의 measure는 다음과 같습니다.

$$
\mu_{\mathrm{LegS}}^{(t)}(x)
=\frac{1}{t}\mathbf{1}_{[0,t]}(x),
\qquad
\mu_{\mathrm{LagT}}^{(t)}(x)
=e^{-(t-x)}\mathbf{1}_{(-\infty,t]}(x).
$$

LegS는 시점 $t$까지의 전체 구간을 균일하게 보고, 구간 길이가 늘어나도 같은 Legendre basis를 사용하도록 시간을 scale합니다. 반면 LagT는 현재에서 멀어질수록 지수적으로 작은 가중치를 줍니다. 즉, measure를 선택하는 순간 모델이 기억할 시간 범위와 망각 방식도 함께 정해집니다.

이 measure와 basis로부터 coefficient의 continuous-time update가 유도됩니다.<d-cite key="gu2020hippo"></d-cite> LegS에서는 시간에 따른 scaling을 $1/t$로 분리해

$$
\frac{d}{dt}c(t)
=-\frac{1}{t}A^{\mathrm{LegS}}c(t)
+\frac{1}{t}B^{\mathrm{LegS}}f(t)
$$

로 쓸 수 있으며, 여기서 continuous-time operator $A^{\mathrm{LegS}},B^{\mathrm{LegS}}$는 다음과 같습니다.

$$
A_{nk}^{\mathrm{LegS}}
=\begin{cases}
(2n+1)^{1/2}(2k+1)^{1/2}, & n>k,\\
n+1, & n=k,\\
0, & n<k.
\end{cases}
$$

$$
B_n^{\mathrm{LegS}}=(2n+1)^{1/2}.
$$

LagT는 $\dot c(t)=-A^{\mathrm{LagT}}c(t)+B^{\mathrm{LagT}}f(t)$인 LTI system이며, operator는 다음과 같습니다.

$$
A_{nk}^{\mathrm{LagT}}
=\begin{cases}
1, & n\geq k,\\
0, & n\lt k.
\end{cases}
$$

$$
B_n^{\mathrm{LagT}}=1.
$$

따라서 LegS의 $A^{\mathrm{LegS}}$는 lower-triangular matrix입니다. 앞의 식을 네 개의 basis에 대해 전개하면 다음과 같습니다.

$$
A^{\mathrm{LegS}}=
\begin{bmatrix}
1      &        &        &        & \cdots\\
\sqrt{3} & 2      &        &        & \cdots\\
\sqrt{5} & \sqrt{15} & 3      &        & \cdots\\
\sqrt{7} & \sqrt{21} & \sqrt{35} & 4      & \cdots\\
\vdots & \vdots & \vdots & \vdots & \ddots
\end{bmatrix}.
$$

대각 원소는 $n+1$이고, lower-triangular 부분은 두 basis index에 따라 정해지는 square-root 계수입니다. 예를 들어 Euler method를 적용하면 time index $m\geq1$에 대한 discrete update는 $c_{m+1}=(I-A/m)c_m+(B/m)f_m$이 됩니다. 즉, 위의 $A,B$ 자체와 실제 discrete transition $\overline A_m=I-A/m$, $\overline B_m=B/m$은 구분해야 합니다.

이에 대응해 LagT는 훨씬 단순한 unit lower-triangular matrix로 쓸 수 있습니다.

$$
A^{\mathrm{LagT}}=
\begin{bmatrix}
1      &        &        & \cdots\\
1      & 1      &        & \cdots\\
1      & 1      & 1      & \cdots\\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix},
\qquad
A_{nk}^{\mathrm{LagT}}=
\begin{cases}
1, & n\geq k,\\
0, & n\lt k.
\end{cases}
$$

이때 두 matrix 모두 임의로 정한 dense matrix가 아니라, 선택한 basis와 measure에서 유도된 규칙적인 operator입니다. LegS는 지금까지의 전체 이력을 같은 상대적 시간 축에서 근사하므로 basis 차수에 따라 square-root coefficient가 달라집니다. 반면 LagT는 오래된 정보를 지수적으로 덜 반영하며 unit lower-triangular 구조를 갖습니다.

<figure>
  <img
      src="{{ '/assets/img/online-learning/HIPPO.jpeg' | relative_url }}"
      alt="projection과 coefficient update를 연결하는 HiPPO framework"
      loading="lazy"
    >
    <figcaption>Figure 4. HiPPO는 과거 signal의 projection coefficient를 continuous-time ODE로 갱신하고, 이를 discrete recurrence로 바꿔 sequence에 적용합니다.</figcaption>
</figure>

제가 보기에 HiPPO의 가장 큰 전환점은 coefficient memory를 처음 만들었다는 데 있지 않습니다. 핵심은 measure별 **optimal online projection**을 하나의 framework로 정리하고, 과거 전체를 저장하지 않은 채 “**각 basis가 과거 signal을 얼마나 설명하는가**”를 coefficient vector $c(t)$로 갱신하는 dynamics를 유도했다는 점입니다.
이렇게 정규화된 polynomial 좌표로 memory를 표현하면 비교·결합·선형 변환을 일관된 규칙으로 정의할 수 있습니다.
그리고 이 압축된 memory가 새 입력을 만날 때 어떻게 바뀔지는 $A(t)$와 $B(t)$가 결정합니다. 다시 말해 basis와 measure로 정한 기억 방식이 상태 전이 행렬의 구조로 나타나는 것입니다.

## After HiPPO

HiPPO가 남긴 다음 과제는 **function space에서 measure로 정의한 memory를, 실제 recurrent model의 유한한 $A,B$ update로 어떻게 구현할 것인가**입니다. HiPPO에서는 measure와 basis를 정하면 그에 대응하는 state transition $A$가 유도됩니다. LSSL은 이 관계를 반대 방향이 가능하다는 것을 보여줍니다<d-cite key="gu2021lssl"></d-cite>.
새 observation이 들어와도 과거 전체를 다시 보지 않고 coefficient를 갱신하려면, 원하는 projection의 update가 유한한 state 안에서 닫혀야 합니다. 그리고 긴 sequence에서 이 update를 효율적으로 계산하려면 $A$의 구조를 활용할 수 있어야 합니다.
즉, 적절한 **Low recurrence width(LRW)**를 만족하는 $A$가 주어지면, 그 $A$를 유도하는 measure가 존재하므로 $A$ 자체를 학습하더라도 여전히 어떤 function-space memory를 구현하는 것으로 해석할 수 있습니다.<d-cite key="desa2018lrw"></d-cite>

<aside class="margin-note">
<strong>Low recurrence width</strong>는 matrix의 행을 짧은 polynomial recurrence로 생성할 수 있는지를 나타냅니다. $i$번째 행 $A[i,:]$를 계수로 하는 polynomial $a_i(X)$를 만들고, 바로 앞의 $r$개 행만으로 $a_i(X)$를 표현할 수 있으면 recurrence width가 $r$입니다. 이때 $g_{i,j}(X)$의 차수를 $j$ 이하로 제한하면, 행렬의 구조가 짧은 recurrence로 기술됩니다. HiPPO/LSSL의 맥락에서 이 구조는 단순한 계산 최적화가 아니라, $A$와 대응하는 measure 사이의 관계를 보존하는 조건입니다. 작은 $r$은 그에 더해 matrix 전체를 dense하게 저장하지 않고 빠르게 계산할 수 있게 합니다.
</aside>

LRW를 만족하는 행렬 $A\in\mathbb{R}^{N\times N}$의 $i$번째 행을 다항식 $a_i(X)=\sum_{k=0}^{N-1}A[i,k]X^k$로 나타낼 때, recurrence width $r$은 다음 관계로 정의됩니다.

$$
a_i(X)=\sum_{j=1}^{r}g_{i,j}(X)a_{i-j}(X),
\qquad
\deg g_{i,j}\leq j,
\qquad i\geq r.
$$

또한 recurrence를 시작하는 앞의 $r$개 행은 $\deg a_i\leq i\;(0\leq i<r)$를 만족합니다.

<aside class="margin-note">
<strong>LRW example</strong>: 이항계수 lower-triangular matrix의 $i$번째 행을 polynomial로 쓰면 $a_i(X)=(1+X)^i$입니다. 따라서 $a_i(X)=(1+X)a_{i-1}(X)$로 바로 이전 행 하나만으로 다음 행을 생성할 수 있으므로 $r=1$입니다. 이 행렬이 HiPPO의 $A$ 자체는 아니지만, LRW가 행렬의 전역 구조를 짧은 recurrence로 표현하는 방식을 보여 줍니다.
</aside>
따라서 LSSL에서는 Legendre measure에서 유도한 $A$로 초기화한 뒤, LRW 구조를 유지하는 범위에서 $A$를 학습하는 것이 가능해집니다. 학습된 $A$는 더 이상 처음의 Legendre measure와 같을 필요는 없지만, 대응하는 measure가 존재하므로 function-space projection이라는 해석을 잃지 않습니다. 이후의 현대 SSM 연구는 이 출발점 위에서, 상태 전이 $A$에 얼마나 많은 표현력을 허용할지와 그 계산을 어떻게 효율적으로 유지할지를 함께 탐구합니다.

그 기본 형태는 다음의 continuous-time state-space system과 이를 이산화한 recurrence로 나타낼 수 있습니다.

$$
\begin{aligned}
h'(t)&=Ah(t)+Bx(t), & y(t)&=Ch(t),\\
h_t&=\overline{A}h_{t-1}+\overline{B}x_t, & y_t&=Ch_t.
\end{aligned}
$$

$A,B$는 연속 시간 동역학을 정의하고, $\overline A,\overline B$는 step size와 이산화 방법을 적용해 얻은 전이입니다.
같은 연속 시간 모델도 zero-order hold, bilinear transform 같은 방법을 어떻게 적용하느냐에 따라 실제 recurrence가 달라집니다.
앞의 HiPPO 절에서는 stable decay를 드러내기 위해 $\dot c=-Ac+Bf$로 썼고, 여기서는 일반적인 SSM 표기 $\dot h=Ah+Bx$를 쓰므로 $A$의 부호 convention이 다릅니다.

아래 표는 이 관점에서 본 현대 딥러닝 SSM의 발전을 요약합니다. 더 자세한 내용은 [발표자료](https://pnubaelab.github.io/blog/2025/Mamba/)에 정리되어 있습니다.

| 연구   | 핵심 아이디어                                                                                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LSSL<d-cite key="gu2021lssl"></d-cite>   | HiPPO에서 유도한 structured $A$를 SSM layer에 넣고, quasiseparable 가족의 $A$와 timescale까지 그냥 학습하자. |
| S4<d-cite key="gu2022s4"></d-cite>     | HiPPO matrix의 normal-plus-low-rank 구조를 DPLR로 바꿔, 긴 convolution kernel을 효율적으로 계산하자. |
| S4D<d-cite key="gu2022s4d"></d-cite>    | $A$는 diagonal로 단순화하되, HiPPO/S4에서 유도한 초기화는 살리자. |
| Mamba<d-cite key="gu2024mamba"></d-cite>  | 기본 $A$는 공유하되, 입력별 $\Delta_t,B_t,C_t$로 이산화된 transition과 read/write를 selective하게 만들자. |
| Mamba2<d-cite key="dao2024mamba2"></d-cite> | head별 transition을 scalar $\alpha_t I$로 단순화해 SSM–attention duality와 효율적인 병렬 알고리즘을 얻자. |

Mamba에서 연속 시간의 기본 파라미터 $A$는 입력과 무관한 학습 파라미터입니다. 입력에 따라 달라지는 $\Delta_t$, $B_t$, $C_t$를 통해 **이산화된 상태 전이**가 입력 의존적으로 바뀐다는 점을 구분해야 합니다.

이후 연구들은 이처럼 state transition에 허용할 자유도와, 그 계산을 효율적으로 유지하는 방법을 함께 탐구했습니다.

## LONGHORN: STATE SPACE MODELS ARE AMORTIZED ONLINE LEARNERS

### AN ONLINE LEARNING PERSPECTIVE FOR SEQUENCE MIXING

HiPPO에서 Mamba2까지의 흐름은 구조화된 state transition을 어떻게 효율적이고 표현력 있게 만들지에 초점을 두었습니다. 다만 이를 Mamba2까지 모두 HiPPO의 online approximation을 그대로 풀었다고 보기는 어렵습니다. 모델이 발전하며 학습된 selective transition과 read/write가 더 중요해졌기 때문입니다.

Longhorn<d-cite key="liu2025longhorn"></d-cite>은 이 지점에서 sequence mixer의 recurrence를 **online convex optimization**<d-cite key="zinkevich2003online"></d-cite>의 눈으로 다시 봅니다. 현재 observation을 잘 설명하되 이전 state에서 과도하게 벗어나지 않도록 update를 결정하는 방식입니다. 제가 가장 흥미롭게 본 부분은 새 recurrence를 하나 더 제안했다는 점보다, 설계 질문을 **“어떤 transition을 쓸 것인가”에서 “어떤 목적함수의 update로 state를 수정할 것인가”로 바꾼 점**입니다.
앞의 흐름이 “어떤 $A$를 써서 잘 압축할 것인가”를 물었다면, Longhorn은 “어떤 목적함수를 풀어 state를 수정할 것인가”를 묻습니다.

$$
s_t=\underset{s}{\operatorname{argmin}}
\left[D_\Phi(s,s_{t-1})+\beta_t\ell_t(s)\right].
$$

$D_\Phi$는 상태 변화의 비용, $\ell_t$는 현재 관측에 대한 손실이며, $\beta_t$는 새 정보를 반영하는 정도를 조절합니다.
즉, 이전 memory를 지키는 힘과 현재 observation에 적응하는 힘 사이의 균형을 찾는 것으로 볼 수 있습니다.

<aside class="margin-note">
여기서 “learning”하는 대상은 학습 데이터 전체에 걸쳐 optimizer가 바꾸는 model parameter가 아니라, 한 sequence 안에서 token별로 바뀌는 inner state입니다. 목적함수의 형태와 gate를 만드는 outer parameter는 여전히 사전학습으로 결정됩니다.
</aside>

<aside class="margin-note">
이후 수식은 $S_t\in\mathbb{R}^{d_v\times d_k}$, $k_t,q_t\in\mathbb{R}^{d_k}$, $v_t\in\mathbb{R}^{d_v}$로 통일합니다.
즉, $S_tk_t$는 key로 조회한 value이고 출력은 $o_t=S_tq_t$입니다. 논문에 따라 상태 행렬을 전치해 표기하기도 합니다.
</aside>

<link rel="stylesheet" href="{{ '/assets/css/longhorn-linear-regression-explorer.css' | relative_url }}">

<section class="longhorn-regression-explorer" data-longhorn-regression-explorer aria-label="Online linear regression explorer">
  <header class="longhorn-regression-explorer__intro">
    <p class="longhorn-regression-explorer__eyebrow">Online linear regression</p>
    <h4>Online-learning-based linear regression</h4>
    <p>각 observation $(x_t,y_t)$가 도착하면, 이전 직선에서 너무 멀어지지 않으면서 현재 점의 prediction error를 줄이는 $\theta_t=[b_t,w_t]$를 선택합니다. 이는 Longhorn update의 핵심 아이디어를 2차원으로 단순화한 예시입니다.</p>
  </header>

  <div class="longhorn-regression-explorer__body">
    <div class="longhorn-regression-explorer__stage" aria-live="polite">
      <div>
        <div class="longhorn-regression-explorer__chart-header">
          <span class="longhorn-regression-explorer__label">observations and fitted line</span>
          <span class="longhorn-regression-explorer__count" data-longhorn-count>1 / 6 observations</span>
        </div>
        <canvas class="longhorn-regression-explorer__canvas" aria-label="Observations and online linear regression fit"></canvas>
        <div class="longhorn-regression-explorer__legend" aria-hidden="true">
          <span>observations</span>
          <span>current fitted line</span>
        </div>
      </div>
      <div class="longhorn-regression-explorer__state">
        <label class="longhorn-regression-explorer__beta-control">
          <span class="longhorn-regression-explorer__parameter-name">new-observation weight $\beta$</span>
          <span class="longhorn-regression-explorer__beta-input"><input type="range" min="0.1" max="4" step="0.1" value="1" data-longhorn-beta aria-label="New observation weight beta"><output data-longhorn-beta-value>1.0</output></span>
        </label>
        <div class="longhorn-regression-explorer__parameter">
          <span class="longhorn-regression-explorer__parameter-name">intercept $b_t$</span>
          <span class="longhorn-regression-explorer__parameter-value" data-longhorn-intercept>0.00</span>
        </div>
        <div class="longhorn-regression-explorer__parameter">
          <span class="longhorn-regression-explorer__parameter-name">slope $w_t$</span>
          <span class="longhorn-regression-explorer__parameter-value" data-longhorn-slope>0.00</span>
        </div>
        <p class="longhorn-regression-explorer__residual">post-update residual <strong data-longhorn-residual>0.00</strong></p>
      </div>
    </div>
    <div class="longhorn-regression-explorer__steps" aria-hidden="true">
      <div class="longhorn-regression-explorer__step" data-longhorn-step="0"></div>
      <div class="longhorn-regression-explorer__step" data-longhorn-step="1"></div>
      <div class="longhorn-regression-explorer__step" data-longhorn-step="2"></div>
      <div class="longhorn-regression-explorer__step" data-longhorn-step="3"></div>
      <div class="longhorn-regression-explorer__step" data-longhorn-step="4"></div>
      <div class="longhorn-regression-explorer__step" data-longhorn-step="5"></div>
    </div>
  </div>
</section>

<script defer src="{{ '/assets/js/longhorn-linear-regression-explorer.js' | relative_url }}"></script>



Longhorn의 목적함수는 다음과 같습니다.

$$
S_t=\underset{S\in\mathbb{R}^{d_v\times d_k}}{\operatorname{argmin}}
\left[
\|S-S_{t-1}\|_F^2
+\|Sk_t-v_t\|_{\operatorname{Diag}(\boldsymbol{\beta}_t)}^2
\right],
$$

<aside class="margin-note">
여기서 $\|z\|_{\operatorname{Diag}(\boldsymbol{\beta}_t)}^2
=z^\top\operatorname{Diag}(\boldsymbol{\beta}_t)z$입니다.
</aside>

해석을 위해 모든 value channel이 같은 scalar $\beta_t\geq0$를 사용한다고 두면 다음과 같이 단순해집니다.

$$
S_t=\underset{S}{\operatorname{argmin}}
\left[\frac12\|S-S_{t-1}\|_F^2
+\frac{\beta_t}{2}\|Sk_t-v_t\|_2^2\right],
$$

이 목적함수를 $\mathcal{L}_t$로 두겠습니다.

$$
\mathcal{L}_t(S)
=\frac12\|S-S_{t-1}\|_F^2
+\frac{\beta_t}{2}\|Sk_t-v_t\|_2^2.
$$

<aside class="margin-note">
<strong>Frobenius inner product</strong>는 같은 크기의 두 matrix $U,V$에 대해 $\langle U,V\rangle_F=\operatorname{tr}(U^\top V)=\sum_{i,j}U_{ij}V_{ij}$로 정의합니다. 즉, 대응하는 원소끼리 곱한 뒤 모두 더한 matrix용 inner product입니다. 미분식에서 $\langle \nabla_S\mathcal{L}_t,dS\rangle_F$의 계수가 $S$에 대한 gradient가 됩니다.
</aside>

<aside class="margin-note">
<strong>Norm</strong>: $\|U\|_F^2=\langle U,U\rangle_F$는 matrix $U$의 모든 원소 제곱합이고, $\|z\|_2^2=\sum_i z_i^2$는 vector $z$의 Euclidean norm 제곱입니다. 따라서 첫 항 $\|S-S_{t-1}\|_F^2$는 이전 memory에서 얼마나 움직였는지, 두 번째 항 $\|Sk_t-v_t\|_2^2$는 현재 key에 대한 prediction error가 얼마나 큰지를 측정합니다.
</aside>

$$
d\mathcal{L}_t=\left\langle S-S_{t-1},dS\right\rangle_F +\beta_t\left\langle Sk_t-v_t,dS\,k_t\right\rangle_2.
$$

두 번째 항을 Frobenius inner product로 다시 쓰면

$$
d\mathcal{L}_t
=\left\langle
S-S_{t-1}+\beta_t(Sk_t-v_t)k_t^\top,
dS
\right\rangle_F.
$$

따라서 gradient는 다음과 같습니다.

$$
\nabla_S\mathcal{L}_t(S)
=S-S_{t-1}+\beta_t(Sk_t-v_t)k_t^\top.
$$

최적점 $S_t$에서는 gradient가 $0$이므로

$$
0=S_t-S_{t-1}+\beta_t(S_tk_t-v_t)k_t^\top.
$$

$S_t$에 관한 항을 한쪽으로 모으면

$$
S_t(I+\beta_tk_tk_t^\top)
=S_{t-1}+\beta_tv_tk_t^\top.
$$

여기서 Sherman-Morrison identity를 적용합니다.

$$
(I+\beta_tk_tk_t^\top)^{-1}
=I-\frac{\beta_t}{1+\beta_t\|k_t\|_2^2}k_tk_t^\top
$$

이를 오른쪽에서 곱해 정리하면 다음의 closed-form update를 얻습니다.

$$
S_t=S_{t-1}
+\frac{\beta_t}{1+\beta_t\|k_t\|_2^2}
(v_t-S_{t-1}k_t)k_t^\top.
$$

현재 memory의 prediction error를 이용해 state를 수정하며, 분모가 유효한 update 크기를 조절합니다. Value channel별 $\boldsymbol{\beta}_t\in(0,1)^{d_v}$를 쓰면 같은 해를 다음처럼 차원에 맞게 묶어 쓸 수 있습니다.<d-cite key="liu2025longhorn"></d-cite>

$$
\boldsymbol{\varepsilon}_t
=\frac{\boldsymbol{\beta}_t}
{1+\boldsymbol{\beta}_t\,k_t^\top k_t},
$$
위 분수는 value channel별 element-wise 연산입니다.

$$
S_t
=S_{t-1}
+\left[\boldsymbol{\varepsilon}_t\odot
\left(v_t-S_{t-1}k_t\right)\right]k_t^\top.
$$

이 식의 $i$번째 행은 $S_{t,i:}=S_{t-1,i:}(I-\varepsilon_{t,i}k_tk_t^\top)+\varepsilon_{t,i}v_{t,i}k_t^\top$입니다. 즉, 위의 channel별 식을 matrix 전체에 그대로 써서 하나의 $\varepsilon_{t,i}$를 모든 행에 적용하면 차원이 맞지 않습니다.

여기까지는 squared-loss proximal objective의 **정확한 closed-form solution**입니다. 실제 Longhorn layer는 dense rank-one transition을 parallel scan에 적합한 element-wise decay로 근사해 다음 recurrence를 사용합니다.

$$
S_t=
\left(\mathbf{1}_{d_v\times d_k}
-\boldsymbol{\varepsilon}_t(k_t^{\odot2})^\top\right)\odot S_{t-1}
+(\boldsymbol{\varepsilon}_t\odot v_t)k_t^\top.
$$

따라서 Longhorn을 읽을 때는 **objective가 주는 정확한 update**와 **실제 모델이 효율을 위해 쓰는 대각 근사**를 구분해야 합니다.


## After LONGHORN

### Learning Objective in Online Learning

Longhorn에서 제가 중요하게 본 변화는, sequence mixer를 learning objective와 그에 대응하는 update rule의 쌍으로 다시 설명했다는 점입니다. 이는 Longhorn 이후에 모든 모델이 새로 따른 순서라기보다, 이미 존재하던 recurrence도 inner-state objective로 소급해 읽을 수 있다는 framework에 가깝습니다. 발표에서 사용한 표기처럼, 현재 state에서 크게 만들고 싶은 score $L_t$에 대해 다음 objective를 둘 수 있습니다.

$$
S_t=\underset{S}{\operatorname{argmin}}
\left[\frac{1}{2}\|S-S_{t-1}\|_F^2-\eta_tL_t(S)\right].
$$

최적점의 stationarity condition은 다음과 같습니다.

$$
S_t-S_{t-1}-\eta_t\nabla L_t(S_t)=0,
\qquad
S_t=S_{t-1}+\eta_t\nabla L_t(S_t).
$$

여기서는 gradient를 새 state $S_t$에서 평가하므로 implicit update입니다. $L_t=-\ell_t$로 두면 loss minimization 표기와 같은 방향이 됩니다.

이 관점에서 Linear Attention<d-cite key="katharopoulos2020linear"></d-cite> 계열에서 state matrix $S$는 key를 value로 연결하는 associative memory로 볼 수 있습니다. 현재 key $k_t$를 읽으면 $Sk_t$가 model이 예측한 value가 되고, LA의 현재 정보 항은 $\langle Sk_t,v_t\rangle$를 크게 만들어 두 vector의 alignment를 높입니다. 이 score의 $S$에 대한 gradient는

$$
\nabla_S\langle Sk_t,v_t\rangle=v_tk_t^\top
$$

입니다. 따라서 이전 state를 유지하는 항과 이 score를 최대화하는 항을 함께 두면, $v_tk_t^\top$ 형태의 write update가 자연스럽게 나옵니다.

Longhorn은 여기서 한 단계 더 나아가 alignment score 자체가 아니라 prediction error $\|Sk_t-v_t\|_2^2$를 최소화합니다. 이 항은

$$
\|Sk_t-v_t\|_2^2
=\|Sk_t\|_2^2-2\langle Sk_t,v_t\rangle+\|v_t\|_2^2
$$

로 전개할 수 있습니다. 즉, LA의 inner product 항을 포함하면서도 $Sk_t$의 크기까지 함께 제어하므로, 단순히 $v_t$와 같은 방향을 향하게 하는 것이 아니라 현재 key에 대해 $v_t$를 실제로 예측하도록 state를 보정합니다. 아래 표의 LA, RetNet, GLA는 기본 write에 서로 다른 방식의 memory retention을 결합한 형태이고, Longhorn은 여기에 residual을 줄이는 write objective를 도입한 경우로 볼 수 있습니다.

Longhorn 논문이 소급해 정리한 online learning objective와 update를 이 글의 notation으로 옮기면 다음과 같습니다.<d-cite key="liu2025longhorn"></d-cite>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Online Learning Objective</th>
      <th>Online Update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LA<d-cite key="katharopoulos2020linear"></d-cite></td>
      <td>$
        \bigl\|S-S_{t-1}\bigr\|_F^2
        -2\langle Sk_t,v_t\rangle$
      </td>
      <td>$S_t=S_{t-1}+v_tk_t^\top$</td>
    </tr>
    <tr>
      <td>Mamba2<d-cite key="dao2024mamba2"></d-cite></td>
      <td>$
        \bigl\|S-\alpha_tS_{t-1}\bigr\|_F^2
        -2\langle Sk_t,v_t\rangle$
      </td>
      <td>$S_t=\alpha_tS_{t-1}+v_tk_t^\top$</td>
    </tr>
    <tr>
      <td>RetNet<d-cite key="sun2023retnet"></d-cite></td>
      <td>$
        \gamma\bigl\|S-S_{t-1}\bigr\|_F^2
        +(1-\gamma)\bigl\|S\bigr\|_F^2
        -2\langle Sk_t,v_t\rangle$
      </td>
      <td>$S_t=\gamma S_{t-1}+v_tk_t^\top$</td>
    </tr>
    <tr>
      <td>GLA<d-cite key="yang2023gla"></d-cite></td>
      <td>$
        \bigl\|S-S_{t-1}\operatorname{Diag}(\boldsymbol{\alpha}_t)\bigr\|_F^2
        -2\langle Sk_t,v_t\rangle$
      </td>
      <td>$S_t=S_{t-1}\operatorname{Diag}(\boldsymbol{\alpha}_t)+v_tk_t^\top$</td>
    </tr>
    <tr>
      <td>Griffin<d-cite key="de2024griffin"></d-cite></td>
      <td>$
        \bigl\|\sqrt{\boldsymbol{\alpha}_t}\odot(s-s_{t-1})\bigr\|_2^2
        +\bigl\|\sqrt{1-\boldsymbol{\alpha}_t}\odot s\bigr\|_2^2
        -2\left\langle\sqrt{1-\boldsymbol{\alpha}_t}\odot(s\odot i_t),x_t\right\rangle$
      </td>
      <td>$s_t=\boldsymbol{\alpha}_t\odot s_{t-1}+\sqrt{1-\boldsymbol{\alpha}_t}\odot i_t\odot x_t$</td>
    </tr>
    <tr>
      <td>Longhorn<d-cite key="liu2025longhorn"></d-cite></td>
      <td>$
        \bigl\|S-S_{t-1}\bigr\|_F^2
        +\bigl\|Sk_t-v_t\bigr\|_{\operatorname{Diag}(\boldsymbol{\beta}_t)}^2$
      </td>
      <td><em>actual layer: diagonal approximation</em><br>$
        S_t=\left(\mathbf{1}_{d_v\times d_k}-\boldsymbol{\varepsilon}_t(k_t^{\odot2})^\top\right)\odot S_{t-1}
        +(\boldsymbol{\varepsilon}_t\odot v_t)k_t^\top,
        \quad
        \boldsymbol{\varepsilon}_t=\frac{\boldsymbol{\beta}_t}{1+\boldsymbol{\beta}_t k_t^\top k_t}$
      </td>
    </tr>
  </tbody>
</table>

세부적인 gate와 feature의 parameterization은 모델마다 다르지만, 표의 공통 축은 분명합니다. 이전 state를 어떤 형태로 보존하거나 감쇠할지, 그리고 현재 observation을 어떤 형태로 memory에 쓸지를 함께 정한다는 점입니다.

여기서 objective의 정확한 해를 구하는 implicit update와, 이전 state에서 gradient를 계산해 한 단계 이동하는 explicit gradient step은 구분해야 합니다. Explicit update는


$$
S_t=S_{t-1}-\eta_t\nabla\ell_t(S_{t-1})
$$

처럼 이전 state의 gradient를 사용합니다. 같은 loss와 learning rate를 사용하더라도 일반적으로 implicit update와는 다른 recurrence가 됩니다. 따라서 objective만으로는 모델이 완전히 정해지지 않습니다. 그 objective를 정확히 풀지, 한 번의 gradient step으로 근사할지에 따라 서로 다른 sequence mixer가 만들어집니다.

### Self-Attention VS Online-Learning: KV cache와 fixed-size state

Causal self-attention은 autoregressive inference에서 과거 token의 key·value tensor를 KV cache에 보관하므로, cache 크기와 token별 조회량이 sequence 길이에 따라 늘어납니다. 반면 앞에서 다룬 recurrent sequence mixer는 과거를 고정 크기 state tensor에 압축하고, 새 observation이 들어올 때마다 이 state를 update합니다.

TTT<d-cite key="sun2025learning"></d-cite>는 이 비교에서 더 직접적인 online learner입니다. Inner model의 weight를 hidden state로 보고, 각 token에서 만든 self-supervised loss의 gradient로 그 weight를 갱신합니다. 아래 그림에서 self-attention의 state는 늘어나는 key–value 집합이고, naive TTT의 state는 크기가 고정된 inner model parameter입니다. 다만 state 크기가 고정된다는 점만으로 두 방식의 memory capacity나 실제 계산량이 같다고 볼 수는 없습니다.


<figure>
  <img
      src="{{ '/assets/img/online-learning/TTT.png' | relative_url }}"
      alt="naive RNN, self-attention, naive TTT의 state 크기와 token별 inference cost 비교"
      loading="lazy"
    >
    <figcaption>Figure 5. TTT의 관점에서 비교한 recurrent state, KV cache, fast-weight state의 크기와 token별 비용.</figcaption>
</figure>

이제 다시 fixed-size matrix state로 돌아와, 현재 memory의 오차를 직접 고치는 delta rule을 보겠습니다.

## GATED DELTA NETWORKS: IMPROVING MAMBA2 WITH DELTA RULE

Longhorn의 objective–update framework에서 DeltaNet<d-cite key="yang2024deltanet"></d-cite>과 Gated DeltaNet<d-cite key="yang2025gateddeltanet"></d-cite>을 읽으면, 핵심은 residual correction입니다. 새 key–value pair를 그대로 더하는 대신, 현재 memory가 key $k_t$에 대해 만든 prediction error를 write target으로 사용합니다.
LA는 $v_tk_t^\top$를 누적하고, Mamba2는 여기에 이전 state의 감쇠 $\alpha_t$를 더합니다. DeltaNet에서는 현재 memory의 prediction을 $\hat v_t=S_{t-1}k_t$로 두고, error $v_t-\hat v_t$ 자체를 write target으로 사용합니다.

$$
\mathcal{J}_t^{\mathrm{Delta}}(S)
=\|S-S_{t-1}\|_F^2
-2\left\langle Sk_t,
\beta_t(v_t-S_{t-1}k_t)\right\rangle.
$$

$$
S_t=S_{t-1}+\beta_t(v_t-S_{t-1}k_t)k_t^\top
=S_{t-1}(I-\beta_tk_tk_t^\top)+\beta_tv_tk_t^\top.
$$

앞 절의 squared loss에 대해 이전 state에서 explicit gradient step을 수행하면 이 update를 얻습니다. 단순히 key-value outer product를 계속 더하는 방식과 달리, 이미 저장된 내용과 새 observation의 차이를 반영합니다. 따라서 같은 key에 잘못 연결된 정보가 있으면, 새 value 자체가 아니라 prediction error를 통해 그 연결을 직접 보정할 수 있습니다.

Gated DeltaNet은 여기에 이전 memory의 retention을 조절하는 gate $\alpha_t$를 결합합니다.<d-cite key="yang2025gateddeltanet"></d-cite>

$$
\mathcal{J}_t^{\mathrm{GDN}}(S)
=\|S-\alpha_tS_{t-1}\|_F^2
-2\left\langle Sk_t,
\beta_t(v_t-\alpha_tS_{t-1}k_t)\right\rangle.
$$

$$
S_t=\alpha_tS_{t-1}(I-\beta_tk_tk_t^\top)+\beta_tv_tk_t^\top.
$$

$\alpha_t$는 이전 state를 얼마나 남길지, $\beta_t$는 현재 key에 대한 correction을 얼마나 반영할지 조절합니다.
같은 식을 $\alpha_tS_{t-1}+\beta_t(v_t-\alpha_tS_{t-1}k_t)k_t^\top$로 쓰면, 먼저 이전 memory를 감쇠한 뒤 그 memory가 현재 key에 대해 낸 prediction error를 보정한다는 해석이 드러납니다.

이 관점에서 Gated DeltaNet은 DeltaNet의 residual write와 Mamba2 계열의 selective retention을 결합한 형태로 볼 수 있습니다. 두 모델의 parameterization이 완전히 같다는 뜻은 아니지만, 왜 decay gate와 correction gate를 함께 사용하는지 직관적으로 설명합니다.

논문은 Gated DeltaNet을 sequence mixing 계층으로 평가하고, sliding-window attention 등과 결합한 하이브리드 구성도 실험합니다.
이는 attention을 대체하거나 보완할 수 있다는 결과이며, softmax attention과 수학적으로 동일한 연산이라는 뜻은 아닙니다.

<figure>
  <img
      src="{{ '/assets/img/online-learning/GDN.png' | relative_url }}"
      alt="Mamba2의 decay gate와 DeltaNet의 delta rule을 결합한 Gated DeltaNet 구조"
      loading="lazy"
    >
    <figcaption>Figure 6. Gated DeltaNet은 selective decay와 residual-based delta update를 결합합니다.</figcaption>
</figure>

<figure>
  <img
      src="{{ '/assets/img/online-learning/GDNTable.png' | relative_url }}"
      alt="Gated DeltaNet의 language modeling과 common-sense reasoning 성능 비교표"
      loading="lazy"
    >
    <figcaption>Table 1. Gated DeltaNet 논문에서 보고한 성능 비교.</figcaption>
</figure>

## Kimi Delta Attention

Kimi Linear<d-cite key="kimi2025linear"></d-cite>에서 제안한 **Kimi Delta Attention(KDA)**은 Gated DeltaNet의 scalar decay $\alpha_t$를 diagonal matrix $D_t=\operatorname{Diag}(\boldsymbol{\alpha}_t)$로 확장합니다. 따라서 key dimension마다 이전 memory를 남기는 정도를 다르게 조절할 수 있습니다.

이 글의 state-matrix notation에서는 update를 다음과 같이 쓸 수 있습니다.

$$
S_t=S_{t-1}D_t(I-\beta_tk_tk_t^\top)+\beta_tv_tk_t^\top,
\qquad
o_t=S_tq_t.
$$


<figure>
  <img
      src="{{ '/assets/img/online-learning/KDA.png' | relative_url }}"
      alt="diagonal decay와 rank-one correction으로 구성된 Kimi Delta Attention update"
      loading="lazy"
    >
    <figcaption>Figure 7. Kimi Delta Attention의 diagonal decay와 delta-rule update.</figcaption>
</figure>

오른쪽에서 상태에 작용하는 전이 행렬을 전개하면

$$
A_t=D_t-\beta_t(D_tk_t)k_t^\top
$$

가 되어, diagonal matrix와 rank-one correction으로 볼 수 있습니다. 행렬 곱의 순서는 중요하므로 $D_t$와 $k_tk_t^\top$를 임의로 교환할 수 없습니다.

S4의 DPLR(diagonal plus low-rank) 구조와 닮은 형태가 여기서는 채널별 decay와 delta update를 표현하는 input-dependent transition으로 다시 나타납니다. 두 모델의 parameterization과 계산 알고리즘이 같다는 뜻은 아니지만, KDA가 scalar decay보다 세밀한 memory retention을 제공하면서도 Gated DeltaNet과 유사한 recurrent computation을 유지하는 이유를 보여 줍니다.

<figure>
  <img
      src="{{ '/assets/img/online-learning/KDA_model.png' | relative_url }}"
      alt="KDA block과 MLA block을 혼합한 Kimi Linear architecture"
      loading="lazy"
    >
    <figcaption>Figure 8. KDA와 MLA를 혼합한 Kimi Linear architecture.</figcaption>
</figure>

<figure>
  <img
      src="{{ '/assets/img/online-learning/KDATable.png' | relative_url }}"
      alt="Kimi Linear의 long-context 성능, KV cache, decoding throughput 비교"
      loading="lazy"
    >
    <figcaption>Figure 9. Kimi Linear가 보고한 long-context 성능과 decoding 효율.</figcaption>
</figure>

Kimi Linear는 KDA를 Multi-Head Latent Attention(MLA)과 결합한 hybrid architecture입니다. 논문의 비교 설정에서는 MLA-only model보다 높은 성능을 보이면서, 1M context에서 KV cache를 최대 75% 줄이고 decoding throughput을 최대 6배 높였습니다.<d-cite key="kimi2025linear"></d-cite> 이 수치는 논문에서 보고한 해당 model·hardware·context 조건의 결과입니다.

<figure>
  <img
      src="{{ '/assets/img/online-learning/KDATable2.png' | relative_url }}"
      alt="KDA와 MLA layer 비율에 따른 Kimi Linear ablation 결과"
      loading="lazy"
    >
    <figcaption>Table 2. KDA–MLA mixture 비율에 따른 ablation.</figcaption>
</figure>

추가적으로 KDA와 MLA의 mixture를 ablation으로 비교했고, 제시한 설정에서는 **KDA:MLA = 3:1**을 사용합니다.<d-cite key="kimi2025linear"></d-cite> 뒤에서 보듯 Qwen과 Solar에서도 3:1 pattern이 반복되어 일종의 **국룰**처럼 보입니다. 다만 세부 module과 objective가 다르고, 모든 hybrid model이 따르는 표준 비율은 아닙니다.

## Online Learning 모델 근황

최근에는 online-learning 계열 sequence mixer를 attention으로 보완하는 hybrid architecture가 늘고 있습니다. 공개된 대표 예로 Kimi Linear는 KDA와 MLA를, Qwen3.8-Flash-Next는 Gated DeltaNet(GDN)과 Qwen Sparse Attention(QSA)를, Solar Open 2는 KDA와 softmax GQA를 결합합니다.<d-cite key="kimi2025linear"></d-cite><d-cite key="qwen2026design"></d-cite><d-cite key="park2026solaropen2"></d-cite> 세 모델 모두 recurrent/linear-attention layer 3개 뒤에 attention layer 1개를 두는 pattern을 쓰지만, 구체적인 recurrence와 attention 방식은 서로 다릅니다.

Hybrid의 recurrent block은 sequence length와 무관한 크기의 state를 쓰므로 긴 context에서 decoding 효율을 높일 수 있습니다. 다만 중간의 attention block은 여전히 KV cache를 사용하므로, hybrid model 전체의 memory가 sequence length와 무관하다는 뜻은 아닙니다. 한마디로 attention을 없애기보다, 꼭 필요한 곳에만 남겨 성능과 속도를 같이 챙기는 설계입니다.

최근 연구는 Qwen3.8-27B 기반 hybrid model의 GDN을 포함한 linear layer를 NVFP4 W4A4로 양자화했을 때, 32K context에서 recurrent-state error가 무한히 누적되지 않고 plateau에 도달하는 사례를 보고합니다.<d-cite key="kozyrev2026gateddeltanetsurvives4bit"></d-cite> 저자들은 작은 block scaling, gate의 error compression, delta rule의 overwrite·forgetting을 함께 원인으로 분석합니다.


<figure>
  <img
      src="{{ '/assets/img/online-learning/Qwen.png' | relative_url }}"
      alt="GDN block 세 개와 QSA block 하나를 반복하는 Qwen3.8-Flash-Next architecture"
      loading="lazy"
    >
    <figcaption>Figure 10. GDN과 QSA를 3:1로 혼합한 Qwen3.8-Flash-Next architecture.</figcaption>
</figure>

<figure>
  <img
      src="{{ '/assets/img/online-learning/Solar.png' | relative_url }}"
      alt="KDA layer 세 개와 softmax GQA layer 하나를 반복하는 Solar Open 2 architecture"
      loading="lazy"
    >
    <figcaption>Figure 11. KDA와 softmax GQA를 3:1로 혼합한 Solar Open 2 architecture.</figcaption>
</figure>

## 마지막

**online approximation → structured state transition → online learning objective** 이라는 흐름은 모델 이름은 달라도 모두 제한된 state에 과거를 압축한다는 같은 문제를 풀고 있습니다. HiPPO와 초기 SSM 연구는 continuous-time function space에서 과거 signal을 어떤 basis와 measure로 근사할지 정의하고, 그 결과를 유한한 state update로 이산화하는 방법을 발전시켰습니다. 이 관점에서 핵심은 어떤 memory representation을 선택할 것인가였습니다.

Longhorn과 delta rule 계열은 출발점을 discrete-time recurrence로 옮깁니다. 이미 이산화된 state update를 주어진 규칙으로 받아들이는 대신, 현재 observation과 이전 state 사이의 trade-off를 나타내는 online convex objective를 먼저 세우고 update를 그 해 또는 gradient step으로 유도합니다. 제게는 이것이 memory representation의 문제에서, 들어온 정보로 memory를 어떻게 수정할지 묻는 memory editing의 문제로 중심이 옮겨간 변화입니다.

다만 최근 연구를 online learning만으로 설명하기에는 부족합니다. Mamba-3는 continuous-time dynamics를 discrete recurrence로 옮기는 과정 자체를 다시 개선하며, exponential-trapezoidal discretization 같은 방법으로 state update의 정확도와 안정성을 다룹니다.<d-cite key="mamba3_2026"></d-cite> 즉, 최근 SSM은 이산화된 update를 online objective로 해석하는 동시에, 그 update를 만들어 낸 continuous-time model의 discretization도 다시 최적화하고 있습니다. Online learning과 continuous-time dynamics는 경쟁하는 설명이 아니라, 좋은 state update를 설계하기 위해 함께 봐야 하는 두 관점입니다.

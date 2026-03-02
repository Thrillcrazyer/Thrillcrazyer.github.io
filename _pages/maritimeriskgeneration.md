---
layout: project_page
permalink: /MaritimeRiskScenarioGen

title: "Design and Implementation of an LLM-Based Maritime Risk Scenario Generation System for Vessel Traffic Services"
authors: "Taekhyun Park<sup>1</sup>, Sangmin Jo<sup>2</sup>,, Hyerim Bae<sup>2†</sup> and Dohee Kim<sup>3†</sup>"
affiliations: "<sup>1</sup>Department of Data Science, Pusan National University, Busan, South Korea, <br><sup>2</sup>Department of Industrial Engineering, Pusan National University, Busan, South Korea, <br><sup>3</sup> Department of of AI Convergence Engineering, 
        Changwon National University, Changwon, South Korea<br>
        <sup>†</sup>Corresponding author"
---


<!-- Abstract -->
<div class="columns is-centered has-text-centered">
    <div class="column is-four-fifths">
        <h2>Abstract</h2>
        <div class="content has-text-justified">
Maritime accident prevention requires timely, interpretable risk assessment that can support operational decision-making in Vessel Traffic Service (VTS) environments. This paper proposes an integrated framework that combines Large Language Models (LLMs) with machine-learning-based risk inference to unify accident risk probability estimation and dynamic scenario generation. Heterogeneous data sources—Automatic Identification System (AIS) trajectories, meteoro-logical observations, historical accident statistics, and tribunal adjudication reports—are standardized through a two-pass LLM pipeline and aligned on a uniform spatial grid. A gradient- boosting classifier with SHAP (SHapley Additive exPlanations) based explainability identifies key risk drivers, and isotonic regression calibration produces well-calibrated, continuous risk scores. For scenario generation, a HyperGraph-based retrieval-augmented generation (RAG) knowledge base encodes multi-way relationships among accident cases, causal factors, and maritime regulations; retrieved evidence is combined with calibrated risk scores in few-shot, Chain-of-Thought (CoT) prompts to generate interpretable accident scenarios with a cause–progression–outcome structure. A web-based dashboard with on-device text-to-speech delivers grid-level risk visualization, narrative risk scenarios, and actionable navigational advisories within a unified prediction–explanation–response
interface for maritime safety management.
    </div>
    </div>
</div>


# Framework

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/framework.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 1: Overall framework of the LLM-based maritime risk scenario generation system.</em></p>
    </div>
</div>

# HyperGraph-Based RAG UI

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/HyperGraph_UI_explain.png" alt="HyperGraph UI Explanation" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 2: HyperGraph-based retrieval-augmented generation UI explanation.</em></p>
    </div>
</div>

# System UI

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/UI_explain.png" alt="UI Explanation" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 3: Web-based dashboard UI for risk visualization and scenario generation.</em></p>
    </div>
</div>

---



## Citation

```
@article{your2026paper,
  title={Your Paper Title},
  author={Author1 and Author2},
  journal={Conference/Journal Name},
  year={2026}
}
```

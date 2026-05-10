---
layout: project_page
permalink: /LoopUS

title: "LoopUS: Recasting Pretrained LLMs into Looped Latent Refinement Models"
authors: "Taekhyun Park<sup>1</sup>, Yongjae Lee<sup>2</sup>, Dohee Kim<sup>3</sup> and Hyerim Bae<sup>2†</sup>"
affiliations: "<sup>1</sup>Department of Data Science, Pusan National University, Busan, South Korea, <br><sup>2</sup>Department of Industrial Engineering, Pusan National University, Busan, South Korea, <br><sup>3</sup> Department of of AI Convergence Engineering, 
        Changwon National University, Changwon, South Korea<br>
        <sup>†</sup>Corresponding author"
---


<!-- Abstract -->
<div class="columns is-centered has-text-centered">
    <div class="column is-four-fifths">
        <h2>Abstract</h2>
        <div class="content has-text-justified">
Looped computation shows promise in improving the reasoning-oriented performance of LLMs by scaling test-time compute. However, existing approaches typically require either training recurrent models from scratch or applying disruptive retrofits, which involve substantial computational costs and may compromise pretrained capabilities. To address these limitations, we introduce \textbf{Looped Depth Up-Scaling} (LoopUS), a post-training framework that converts a standard pretrained LLM into a looped architecture. As a key technical contribution, LoopUS recasts the pretrained LLM into an encoder, a looped reasoning block, and a decoder. It operationalizes this latent-refinement architecture through four core components: (1) block decomposition, guided by staged representation dynamics; (2) an input-dependent selective gate to mitigate hidden-state drift; (3) random deep supervision for memory-efficient learning over long recursive horizons; and (4) a confidence head for adaptive early exiting. Collectively, these mechanisms transform a standard non-looped model into a looped form while stabilizing it against both computational bottlenecks and representation collapse. Through stable latent looping, LoopUS improves reasoning-oriented performance without extending the generated traces or requiring recurrent training from scratch.
    </div>
    </div>
</div>


---
layout: project_page
permalink: /LoopUS

title: "LoopUS: Recasting Pretrained LLMs into Looped Latent Refinement Models"
authors: "Taekhyun Park<sup>1</sup>, Yongjae Lee<sup>2</sup>, Dohee Kim<sup>3</sup> and Hyerim Bae<sup>2†</sup>"
affiliations: "<sup>1</sup>Department of Data Science, Pusan National University, Busan, South Korea, <br><sup>2</sup>Department of Industrial Engineering, Pusan National University, Busan, South Korea, <br><sup>3</sup> Department of of AI Convergence Engineering, 
        Changwon National University, Changwon, South Korea<br>
        <sup>†</sup>Corresponding author"
paper: https://arxiv.org/abs/2605.11011
video: https://www.youtube.com/watch?v=PW-x6m8_mP8
code: https://github.com/Thrillcrazyer/LoopUS
huggingface: https://huggingface.co/Thrillcrazyer/Qwen3_1.7B_LoopUS
---

<!-- Abstract -->
<div class="columns is-centered has-text-centered">
    <div class="column is-four-fifths">
        <h2>Abstract</h2>
        <div class="content has-text-justified">
Looped computation shows promise in improving the reasoning-oriented performance of LLMs by scaling test-time compute. However, existing approaches typically require either training recurrent models from scratch or applying disruptive retrofits, which involve substantial computational costs and may compromise pretrained capabilities. To address these limitations, we introduce **Looped Depth Up-Scaling** (LoopUS), a post-training framework that converts a standard pretrained LLM into a looped architecture. As a key technical contribution, LoopUS recasts the pretrained LLM into an encoder, a looped reasoning block, and a decoder. It operationalizes this latent-refinement architecture through four core components: (1) block decomposition, guided by staged representation dynamics; (2) an input-dependent selective gate to mitigate hidden-state drift; (3) random deep supervision for memory-efficient learning over long recursive horizons; and (4) a confidence head for adaptive early exiting. Collectively, these mechanisms transform a standard non-looped model into a looped form while stabilizing it against both computational bottlenecks and representation collapse. Through stable latent looping, LoopUS improves reasoning-oriented performance without extending the generated traces or requiring recurrent training from scratch.
    </div>
    </div>
</div>

# Framework

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/LoopUS/RepresentationLearning.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 1: <strong>Conceptual view of latent refinement in LoopUS.</strong> As the reasoning block is looped, each proposed update is mixed with the previous hidden state by the selective gate, gradually steering the trajectory toward the answer region instead of allowing it to drift.</em></p>
    </div>
</div>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/LoopUS/LoopUS_Framework.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 2: <strong>Overview of the LoopUS architecture.</strong>
  (a) A pretrained LLM is recast into encoder, reasoning, and decoder blocks, using a selective gate ($\mathcal{G}$) inserted between loop iterations to stabilize the loop dynamics. (b) The looped LLM is trained with random deep supervision using next-token prediction loss ($\mathcal{L}_{\mathrm{LM}}$), monotonicity loss ($\mathcal{L}_{\text{Mono}}$), and confidence loss ($\mathcal{L}_{\text{Q}}$).</em></p>
    </div>
</div>

# Experiments

<span id="published-looped-comparison"></span>

<div style="overflow-x: auto; margin: 1.5rem 0;">
    <table style="width: 100%; min-width: 1100px; border-collapse: collapse; font-size: 0.9rem; text-align: center;">
        <thead>
            <tr>
                <th rowspan="3">Method</th>
                <th rowspan="3">Base<br>Model</th>
                <th rowspan="3">Train<br>Tokens</th>
                <th rowspan="3">Setting</th>
                <th colspan="6">Task</th>
                <th rowspan="3">AVG</th>
                <th rowspan="3">Δ</th>
            </tr>
            <tr>
                <th>ARC-E</th>
                <th>ARC-C</th>
                <th>HS</th>
                <th>WG</th>
                <th>PIQA</th>
                <th>OBQA</th>
            </tr>
            <tr>
                <th><code>acc_n ↑</code></th>
                <th><code>acc_n ↑</code></th>
                <th><code>acc_n ↑</code></th>
                <th><code>acc ↑</code></th>
                <th><code>acc_n ↑</code></th>
                <th><code>acc_n ↑</code></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="2"><strong>Ours</strong></td>
                <td rowspan="2"><a href="https://huggingface.co/TinyLlama/TinyLlama_v1.1">TinyLlama<br>1.1B</a></td>
                <td rowspan="2">3B</td>
                <td>Original</td>
                <td>47.1</td>
                <td>25.1</td>
                <td>42.2</td>
                <td>53.4</td>
                <td>66.8</td>
                <td>24.2</td>
                <td>43.1</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Adapted</td>
                <td><strong>53.0</strong></td>
                <td><strong>29.6</strong></td>
                <td><strong>55.5</strong></td>
                <td><strong>57.9</strong></td>
                <td><strong>69.8</strong></td>
                <td><strong>30.6</strong></td>
                <td><strong>49.4</strong></td>
                <td><strong>+6.3</strong></td>
            </tr>
            <tr>
                <td rowspan="2">McLeish et al.</td>
                <td rowspan="2"><a href="https://huggingface.co/TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T">TinyLlama<br>1.1B-3T</a></td>
                <td rowspan="2">52B</td>
                <td>Original</td>
                <td>55.7</td>
                <td>31.0</td>
                <td><strong>59.1</strong></td>
                <td><strong>58.9</strong></td>
                <td><strong>73.0</strong></td>
                <td><strong>35.0</strong></td>
                <td><strong>52.1</strong></td>
                <td>--</td>
            </tr>
            <tr>
                <td>Adapted</td>
                <td><strong>58.6</strong></td>
                <td><strong>35.6</strong></td>
                <td>45.1</td>
                <td>57.6</td>
                <td>66.4</td>
                <td>32.2</td>
                <td>49.3</td>
                <td>-2.9</td>
            </tr>
            <tr>
                <td rowspan="2">Bae et al.</td>
                <td rowspan="2"><a href="https://huggingface.co/TinyLlama/TinyLlama_v1.1">TinyLlama<br>1.1B</a></td>
                <td rowspan="2">60B</td>
                <td>Original</td>
                <td>44.7</td>
                <td>23.2</td>
                <td>42.2</td>
                <td>53.4</td>
                <td>66.8</td>
                <td>29.2</td>
                <td>43.3</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Adapted</td>
                <td><strong>49.9</strong></td>
                <td><strong>26.2</strong></td>
                <td><strong>48.8</strong></td>
                <td><strong>54.1</strong></td>
                <td><strong>68.6</strong></td>
                <td><strong>32.8</strong></td>
                <td><strong>46.7</strong></td>
                <td><strong>+3.5</strong></td>
            </tr>
        </tbody>
    </table>
</div>

<p><em><strong>LoopUS shows adaptation efficiency under a smaller training-token budget.</strong> All methods adapt a TinyLlama-based backbone; w/o and w/ LoopUS denote the checkpoint before and after adaptation, respectively. <strong>AVG</strong> is the unweighted mean over the six tasks, and &Delta; reports the change in <strong>AVG</strong> from Original to Adapted. Results for prior methods are taken from the corresponding papers.</em></p>

<span id="main-results"></span>

<div style="overflow-x: auto; margin: 1.5rem 0;">
    <table style="width: 100%; min-width: 1200px; border-collapse: collapse; font-size: 0.9rem; text-align: center;">
        <thead>
            <tr>
                <th rowspan="2">Model</th>
                <th rowspan="2">Setting</th>
                <th>Wiki</th>
                <th>LAMBADA</th>
                <th>MMLU</th>
                <th>HS</th>
                <th>ARC-E</th>
                <th>ARC-C</th>
                <th>PIQA</th>
                <th>WG</th>
                <th>OBQA</th>
                <th rowspan="2">AVG</th>
                <th rowspan="2">Δ</th>
            </tr>
            <tr>
                <th colspan="2"><code>ppl ↓</code></th>
                <th colspan="7"><code>acc ↑</code></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="2">Qwen 1.7B</td>
                <td>w/o LoopUS</td>
                <td>21</td>
                <td>12.21</td>
                <td>55.4</td>
                <td>46.2</td>
                <td>72.5</td>
                <td>40.2</td>
                <td>72.2</td>
                <td>61.3</td>
                <td>28</td>
                <td>53.7</td>
                <td>--</td>
            </tr>
            <tr>
                <td>w/ LoopUS</td>
                <td><strong>16.9</strong></td>
                <td><strong>7.43</strong></td>
                <td><strong>56.6</strong></td>
                <td><strong>46.3</strong></td>
                <td><strong>74.9</strong></td>
                <td><strong>43.1</strong></td>
                <td><strong>73.3</strong></td>
                <td><strong>63.0</strong></td>
                <td><strong>29.6</strong></td>
                <td><strong>55.3</strong></td>
                <td><strong>+1.6</strong></td>
            </tr>
            <tr>
                <td rowspan="2">Qwen 4B</td>
                <td>w/o LoopUS</td>
                <td>16.4</td>
                <td>7.29</td>
                <td><strong>68.3</strong></td>
                <td><strong>52.1</strong></td>
                <td>80.2</td>
                <td>50.4</td>
                <td>75.0</td>
                <td>66.5</td>
                <td>29.4</td>
                <td>60.3</td>
                <td>--</td>
            </tr>
            <tr>
                <td>w/ LoopUS</td>
                <td><strong>13.9</strong></td>
                <td><strong>5.33</strong></td>
                <td>67.7</td>
                <td>51.4</td>
                <td><strong>81.3</strong></td>
                <td><strong>54.0</strong></td>
                <td><strong>76.8</strong></td>
                <td><strong>68.9</strong></td>
                <td><strong>34.4</strong></td>
                <td><strong>62.1</strong></td>
                <td><strong>+1.8</strong></td>
            </tr>
            <tr>
                <td rowspan="2">Qwen 8B</td>
                <td>w/o LoopUS</td>
                <td>12.2</td>
                <td>4.58</td>
                <td><strong>72.8</strong></td>
                <td><strong>57.2</strong></td>
                <td>81.5</td>
                <td>55.4</td>
                <td>76.3</td>
                <td>67.9</td>
                <td>31.6</td>
                <td>63.2</td>
                <td>--</td>
            </tr>
            <tr>
                <td>w/ LoopUS</td>
                <td><strong>10.3</strong></td>
                <td><strong>4.32</strong></td>
                <td>71.5</td>
                <td>56.0</td>
                <td><strong>83.9</strong></td>
                <td><strong>58.1</strong></td>
                <td><strong>78.9</strong></td>
                <td><strong>72.4</strong></td>
                <td><strong>37.0</strong></td>
                <td><strong>65.4</strong></td>
                <td><strong>+2.2</strong></td>
            </tr>
            <tr>
                <td rowspan="2">Phi-4 14B</td>
                <td>w/o LoopUS</td>
                <td>9.59</td>
                <td>4.03</td>
                <td>76.9</td>
                <td><strong>63.1</strong></td>
                <td>81.3</td>
                <td>55.8</td>
                <td>80.7</td>
                <td>77.0</td>
                <td>34.0</td>
                <td>67.0</td>
                <td>--</td>
            </tr>
            <tr>
                <td>w/ LoopUS</td>
                <td><strong>7.75</strong></td>
                <td><strong>3.49</strong></td>
                <td><strong>77.5</strong></td>
                <td>60.58</td>
                <td><strong>83.5</strong></td>
                <td><strong>57.7</strong></td>
                <td><strong>81.8</strong></td>
                <td><strong>77.5</strong></td>
                <td><strong>41.8</strong></td>
                <td><strong>68.6</strong></td>
                <td><strong>+1.7</strong></td>
            </tr>
        </tbody>
    </table>
</div>

<p><em><strong>LoopUS improves pretrained backbones across scales.</strong> Results on language modeling and downstream benchmarks. <code>ppl</code> denotes perplexity (lower is better), and <code>acc</code> denotes accuracy (higher is better). <strong>AVG</strong> is the mean over the seven <code>acc</code> benchmarks, and &Delta; denotes the change in <strong>AVG</strong> from the original backbone (w/o LoopUS) to the adapted checkpoint (w/ LoopUS). <strong>Bold</strong> highlights the better result between the two variants of each backbone. All models are evaluated zero-shot.</em></p>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/LoopUS/cached_speed_comparison.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 3: <strong>KV caching accelerates LoopUS decoding.</strong> With the recursion budget fixed to $B=8$, caching consistently reduces seconds per generated token across Qwen3-1.7B, Qwen3-4B, and Qwen3-8B, with the largest gains appearing at longer generations.</em></p>
    </div>
</div>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/LoopUS/loopus_thinking_pca_Thrillcrazyer_Qwen4B_ver0.2.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 4: <strong>LoopUS quickly stabilizes latent reasoning trajectories.</strong> For representative Qwen4B examples, the PCA projection of hidden states shows a large early transition followed by compact refinement near the final answer, while the selective-gate coefficient and hidden-state distances rapidly contract over thinking iterations.</em></p>
    </div>
</div>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <img src="/images/LoopUS/generation_thinking_trace_Thrillcrazyer_Qwen4B_ver0.2.png" alt="Framework Overview" style="width: 100%; max-width: 1200px;">
        <p><em>Figure 5: <strong>Token-level thinking traces reveal staged refinement.</strong> Example generations from Qwen4B show how LoopUS organizes reasoning across successive steps, progressively refining intermediate tokens before converging to the final response.</em></p>
    </div>
</div>

# Video

<div class="columns is-centered has-text-centered">
    <div class="column">
        <div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe src="https://www.youtube.com/embed/PW-x6m8_mP8" title="LoopUS Chat Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
        </div>
    </div>
</div>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe src="https://www.youtube.com/embed/0N6N4NL1YPY" title="LoopUS Chat Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
        </div>
    </div>
</div>

<div class="columns is-centered has-text-centered">
    <div class="column">
        <div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe src="https://www.youtube.com/embed/rZEdoUh9xXk" title="LoopUS Chat Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
        </div>
    </div>
</div>

## GPU Sponsorship

We are always looking for <strong><font color="#ff6b35">GPU sponsorship</font>. If you are interested, please contact.</strong> pthpark1@pusan.ac.kr
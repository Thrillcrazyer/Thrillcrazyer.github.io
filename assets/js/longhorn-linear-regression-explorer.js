(() => {
  const explorer = document.querySelector("[data-longhorn-regression-explorer]");

  if (!explorer) {
    return;
  }

  const canvas = explorer.querySelector("canvas");
  const context = canvas.getContext("2d");
  const steps = [...explorer.querySelectorAll("[data-longhorn-step]")];
  const count = explorer.querySelector("[data-longhorn-count]");
  const intercept = explorer.querySelector("[data-longhorn-intercept]");
  const slope = explorer.querySelector("[data-longhorn-slope]");
  const residual = explorer.querySelector("[data-longhorn-residual]");
  const betaInput = explorer.querySelector("[data-longhorn-beta]");
  const betaValue = explorer.querySelector("[data-longhorn-beta-value]");
  const observations = [1.1, 1.8, 2.9, 3.1, 4.3, 4.8];
  let beta = Number(betaInput.value);
  let activeIndex = 0;

  const featureAt = (index) => [1, index + 1];

  const stateAt = (endIndex) => {
    let state = [0, 0];
    let latestResidual = 0;

    for (let index = 0; index <= endIndex; index += 1) {
      const feature = featureAt(index);
      const prediction = state[0] * feature[0] + state[1] * feature[1];
      const preUpdateResidual = observations[index] - prediction;
      const normSquared = feature[0] ** 2 + feature[1] ** 2;
      const stepSize = beta / (1 + beta * normSquared);
      state = state.map((value, dimension) => value + stepSize * preUpdateResidual * feature[dimension]);
      const updatedPrediction = state[0] * feature[0] + state[1] * feature[1];
      latestResidual = observations[index] - updatedPrediction;
    }

    return { state, latestResidual };
  };

  const draw = (index) => {
    const bounds = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);

    const padding = { top: 18, right: 16, bottom: 27, left: 31 };
    const plotWidth = bounds.width - padding.left - padding.right;
    const plotHeight = bounds.height - padding.top - padding.bottom;
    const xPosition = (value) => padding.left + (value / (observations.length - 1)) * plotWidth;
    const yPosition = (value) => padding.top + ((5.5 - value) / 5.5) * plotHeight;
    const { state, latestResidual } = stateAt(index);

    context.font = "10px IBM Plex Mono, monospace";
    context.lineWidth = 1;
    context.strokeStyle = "#e4e1e7";
    context.fillStyle = "#6f6b76";
    for (let value = 0; value <= 5; value += 1) {
      const y = yPosition(value);
      context.beginPath();
      context.moveTo(padding.left, y);
      context.lineTo(bounds.width - padding.right, y);
      context.stroke();
      context.fillText(String(value), 4, y + 3);
    }

    context.beginPath();
    for (let point = 0; point <= 100; point += 1) {
      const sample = ((observations.length - 1) * point) / 100;
      const feature = featureAt(sample);
      const value = state[0] * feature[0] + state[1] * feature[1];
      if (point === 0) {
        context.moveTo(xPosition(sample), yPosition(value));
      } else {
        context.lineTo(xPosition(sample), yPosition(value));
      }
    }
    context.strokeStyle = "#c76b4b";
    context.lineWidth = 2.4;
    context.stroke();

    const currentFeature = featureAt(index);
    const currentPrediction = state[0] * currentFeature[0] + state[1] * currentFeature[1];
    context.beginPath();
    context.setLineDash([3, 4]);
    context.moveTo(xPosition(index), yPosition(currentPrediction));
    context.lineTo(xPosition(index), yPosition(observations[index]));
    context.strokeStyle = "#c76b4b";
    context.lineWidth = 1.2;
    context.stroke();
    context.setLineDash([]);

    for (let point = 0; point < observations.length; point += 1) {
      const observed = point <= index;
      context.beginPath();
      context.arc(xPosition(point), yPosition(observations[point]), observed ? 4.2 : 2.8, 0, Math.PI * 2);
      context.fillStyle = observed ? "#645495" : "#f1f0ec";
      context.strokeStyle = observed ? "#645495" : "#b9b4c0";
      context.lineWidth = 1.4;
      context.fill();
      context.stroke();
      context.fillStyle = "#6f6b76";
      context.fillText(`t=${point}`, xPosition(point) - 9, bounds.height - 7);
    }

    count.textContent = `${index + 1} / ${observations.length} observations`;
    intercept.textContent = state[0].toFixed(2);
    slope.textContent = state[1].toFixed(2);
    residual.textContent = latestResidual.toFixed(2);
  };

  const update = (index) => {
    activeIndex = Math.max(0, Math.min(index, observations.length - 1));
    draw(activeIndex);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      if (visible.length > 0) {
        update(Number(visible[0].target.dataset.longhornStep));
      }
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  steps.forEach((step) => observer.observe(step));
  betaInput.addEventListener("input", () => {
    beta = Number(betaInput.value);
    betaValue.textContent = beta.toFixed(1);
    draw(activeIndex);
  });
  window.addEventListener("resize", () => draw(activeIndex));
  update(0);
})();

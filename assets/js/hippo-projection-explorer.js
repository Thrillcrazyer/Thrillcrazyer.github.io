(() => {
  const explorer = document.querySelector("[data-hippo-projection-explorer]");

  if (!explorer) {
    return;
  }

  const canvas = explorer.querySelector("canvas");
  const context = canvas.getContext("2d");
  const steps = [...explorer.querySelectorAll("[data-hippo-step]")];
  const bars = [...explorer.querySelectorAll("[data-coefficient-bar]")];
  const values = [...explorer.querySelectorAll("[data-coefficient-value]")];
  const observations = [...explorer.querySelectorAll("[data-observation]")];
  const sampleCount = explorer.querySelector("[data-sample-count]");
  const data = [1.0, 2.8, 2.1, 3.9, 2.9, 4.4];
  const maxDegree = 2;
  let activeIndex = 0;

  const basis = (coordinate) => [
    1,
    coordinate,
    (3 * coordinate * coordinate - 1) / 2,
  ];

  const solveLinearSystem = (matrix, vector) => {
    const size = vector.length;
    const augmented = matrix.map((row, index) => [...row, vector[index]]);

    for (let pivot = 0; pivot < size; pivot += 1) {
      let maxRow = pivot;
      for (let row = pivot + 1; row < size; row += 1) {
        if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[maxRow][pivot])) {
          maxRow = row;
        }
      }

      [augmented[pivot], augmented[maxRow]] = [augmented[maxRow], augmented[pivot]];
      const divisor = augmented[pivot][pivot];

      if (Math.abs(divisor) < 1e-10) {
        continue;
      }

      for (let column = pivot; column <= size; column += 1) {
        augmented[pivot][column] /= divisor;
      }

      for (let row = 0; row < size; row += 1) {
        if (row === pivot) {
          continue;
        }

        const factor = augmented[row][pivot];
        for (let column = pivot; column <= size; column += 1) {
          augmented[row][column] -= factor * augmented[pivot][column];
        }
      }
    }

    return augmented.map((row) => row[size]);
  };

  const coefficientsAt = (index) => {
    const count = index + 1;
    const dimension = Math.min(maxDegree + 1, count);
    const gram = Array.from({ length: dimension }, () => Array(dimension).fill(0));
    const target = Array(dimension).fill(0);

    for (let sample = 0; sample < count; sample += 1) {
      const coordinate = count === 1 ? 0 : -1 + (2 * sample) / (count - 1);
      const features = basis(coordinate).slice(0, dimension);

      for (let row = 0; row < dimension; row += 1) {
        target[row] += features[row] * data[sample];
        for (let column = 0; column < dimension; column += 1) {
          gram[row][column] += features[row] * features[column];
        }
      }
    }

    return [...solveLinearSystem(gram, target), ...Array(maxDegree + 1 - dimension).fill(0)];
  };

  const fittedValue = (coefficients, point, index) => {
    const count = index + 1;
    const coordinate = count === 1 ? 0 : -1 + (2 * point) / (count - 1);
    return basis(coordinate).reduce(
      (sum, feature, featureIndex) => sum + feature * coefficients[featureIndex],
      0,
    );
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

    const padding = { top: 20, right: 18, bottom: 28, left: 34 };
    const plotWidth = bounds.width - padding.left - padding.right;
    const plotHeight = bounds.height - padding.top - padding.bottom;
    const yMin = 0;
    const yMax = 5;
    const xPosition = (value) => padding.left + (value / (data.length - 1)) * plotWidth;
    const yPosition = (value) => padding.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
    const coefficients = coefficientsAt(index);

    context.font = "11px IBM Plex Mono, monospace";
    context.lineWidth = 1;
    context.strokeStyle = "#d2d8d0";
    context.fillStyle = "#66716d";

    for (let value = 0; value <= 5; value += 1) {
      const y = yPosition(value);
      context.beginPath();
      context.moveTo(padding.left, y);
      context.lineTo(bounds.width - padding.right, y);
      context.stroke();
      context.fillText(String(value), 5, y + 4);
    }

    context.beginPath();
    context.setLineDash([4, 5]);
    context.strokeStyle = "#aeb9af";
    context.moveTo(xPosition(index), padding.top);
    context.lineTo(xPosition(index), padding.top + plotHeight);
    context.stroke();
    context.setLineDash([]);

    context.beginPath();
    const curvePoints = 160;
    for (let point = 0; point <= curvePoints; point += 1) {
      const x = (index * point) / curvePoints;
      const y = fittedValue(coefficients, x, index);
      if (point === 0) {
        context.moveTo(xPosition(x), yPosition(y));
      } else {
        context.lineTo(xPosition(x), yPosition(y));
      }
    }
    context.strokeStyle = "#d7643d";
    context.lineWidth = 2.4;
    context.stroke();

    context.beginPath();
    context.strokeStyle = "#167a68";
    context.lineWidth = 1.7;
    for (let point = 0; point <= index; point += 1) {
      const x = xPosition(point);
      const y = yPosition(data[point]);
      if (point === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.stroke();

    for (let point = 0; point < data.length; point += 1) {
      const isObserved = point <= index;
      context.beginPath();
      context.arc(xPosition(point), yPosition(data[point]), isObserved ? 4.4 : 3, 0, Math.PI * 2);
      context.fillStyle = isObserved ? "#167a68" : "#f5f2e9";
      context.strokeStyle = isObserved ? "#167a68" : "#aeb9af";
      context.lineWidth = 1.5;
      context.fill();
      context.stroke();
      context.fillStyle = "#66716d";
      context.fillText(`t=${point}`, xPosition(point) - 10, bounds.height - 7);
    }
  };

  const update = (index) => {
    activeIndex = Math.max(0, Math.min(index, data.length - 1));
    const coefficients = coefficientsAt(activeIndex);

    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === activeIndex);
    });

    observations.forEach((observation, observationIndex) => {
      observation.classList.toggle("is-observed", observationIndex <= activeIndex);
    });

    coefficients.forEach((coefficient, coefficientIndex) => {
      const magnitude = Math.min(Math.abs(coefficient) / 4, 0.48);
      const direction = coefficient >= 0 ? 1 : -1;
      bars[coefficientIndex].style.width = `${magnitude * 100}%`;
      bars[coefficientIndex].style.transform = `translateX(${direction === 1 ? 0 : -100}%)`;
      values[coefficientIndex].textContent = coefficient.toFixed(2);
    });

    sampleCount.textContent = `${activeIndex + 1} / ${data.length} observations`;
    draw(activeIndex);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSteps = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (visibleSteps.length > 0) {
        update(Number(visibleSteps[0].target.dataset.hippoStep));
      }
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  steps.forEach((step) => observer.observe(step));
  window.addEventListener("resize", () => draw(activeIndex));
  update(0);
})();

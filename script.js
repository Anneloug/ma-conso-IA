const modelFactors = {
  small: 0.0007,
  medium: 0.0014,
  large: 0.0032,
};

const promptsInput = document.getElementById('prompts');
const tokensInput = document.getElementById('tokens');
const daysInput = document.getElementById('days');
const modelInput = document.getElementById('model');

const promptsValue = document.getElementById('promptsValue');
const tokensValue = document.getElementById('tokensValue');
const daysValue = document.getElementById('daysValue');

const kwhValue = document.getElementById('kwhValue');
const co2Value = document.getElementById('co2Value');
const chargeValue = document.getElementById('chargeValue');
const insight = document.getElementById('insight');

function updateOutputs() {
  const prompts = Number(promptsInput.value);
  const tokens = Number(tokensInput.value);
  const days = Number(daysInput.value);
  const model = modelInput.value;

  promptsValue.textContent = prompts;
  tokensValue.textContent = tokens;
  daysValue.textContent = days;

  const energyPerRequest = modelFactors[model] * (tokens / 1000);
  const monthlyKwh = prompts * days * energyPerRequest;
  const monthlyCo2 = monthlyKwh * 0.06;
  const monthlyCharges = Math.round(monthlyKwh * 680);

  kwhValue.textContent = monthlyKwh.toFixed(2);
  co2Value.textContent = monthlyCo2.toFixed(2);
  chargeValue.textContent = monthlyCharges.toLocaleString('fr-FR');

  if (monthlyKwh < 1) {
    insight.textContent = 'Votre usage reste modéré. Une meilleure précision des prompts suffit souvent à faire une vraie différence.';
  } else if (monthlyKwh < 5) {
    insight.textContent = 'Cet usage est raisonnable, mais il vaut la peine de limiter les longs échanges et les modèles trop lourds.';
  } else {
    insight.textContent = 'L’impact s’accumule vite. Réduire les prompts, les tokens ou le choix du modèle peut faire une vraie différence.';
  }
}

[promptsInput, tokensInput, daysInput, modelInput].forEach((input) => {
  input.addEventListener('input', updateOutputs);
  input.addEventListener('change', updateOutputs);
});

updateOutputs();

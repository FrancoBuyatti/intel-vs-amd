/* ============================================================
   script.js  —  v2: Firebase + resultados globales en tiempo real
   ============================================================ */

/* ----------------------------------------------------------
   ESTADO GLOBAL
   ---------------------------------------------------------- */
const state = {
  currentCaseIndex: 0,
  votes: { intel: 0, amd: 0 },
  lastChoice: null,
  cameFromScreen: 'welcome',  // pantalla desde donde se fue al bonus
  firebaseReady: false,       // true cuando el SDK cargó
  submittedToFirebase: false, // true si ya subimos este resultado (evita doble-submit)
};

let voteTimer   = null;
let cycleStepIndex = 0;
let cycleTimer  = null;
let cyclePlaying = false;

/* ----------------------------------------------------------
   REFERENCIAS DOM
   ---------------------------------------------------------- */
const screens     = document.querySelectorAll('.screen');
const progressBar = document.getElementById('progressBar');
const progressFill= document.getElementById('progressFill');
const voteFlash   = document.getElementById('voteFlash');

/* ----------------------------------------------------------
   NAVEGACIÓN
   ---------------------------------------------------------- */
function goToScreen(name) {
  screens.forEach(s => s.classList.toggle('screen--active', s.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  updateProgressBar(name);
}

function updateProgressBar(name) {
  if (['case', 'explain'].includes(name)) {
    progressBar.classList.add('progress-bar--visible');
    const pct = ((state.currentCaseIndex + (name === 'explain' ? 0.5 : 0)) / CASES.length) * 100;
    progressFill.style.width = `${Math.min(pct, 100)}%`;
  } else {
    progressBar.classList.remove('progress-bar--visible');
  }
}

/* ----------------------------------------------------------
   FIREBASE — helpers
   ---------------------------------------------------------- */
function fbPath(path) {
  // window.fbRef se inyecta desde el módulo Firebase en index.html
  return window.fbRef(window.firebaseDB, path);
}

/* Sube los resultados de un participante a Firebase al terminar los 5 casos */
async function submitResultsToFirebase(votes) {
  if (!state.firebaseReady || state.submittedToFirebase) return;
  state.submittedToFirebase = true;

  try {
    const { intel, amd } = votes;

    // 1) Sumar votos totales por marca
    await window.fbRunTransaction(fbPath('totals/intel'), v => (v || 0) + intel);
    await window.fbRunTransaction(fbPath('totals/amd'),   v => (v || 0) + amd);

    // 2) Sumar votos por caso
    for (let i = 0; i < CASES.length; i++) {
      const caseId  = CASES[i].id;
      const brand   = state.caseChoices[i]; // 'intel' | 'amd'
      await window.fbRunTransaction(fbPath(`cases/${caseId}/${brand}`), v => (v || 0) + 1);
    }

    // 3) Contar participante y clasificar su perfil
    await window.fbRunTransaction(fbPath('participants'), v => (v || 0) + 1);

    const profileKey = resolveProfileKey(intel, amd);
    await window.fbRunTransaction(fbPath(`profiles/${profileKey}`), v => (v || 0) + 1);

  } catch (err) {
    console.warn('Firebase write error (offline?):', err);
    // La app sigue funcionando aunque Firebase falle
  }
}

/* Escucha en tiempo real los resultados globales y actualiza la UI */
function listenGlobalResults() {
  if (!state.firebaseReady) return;

  // Totales generales
  window.fbOnValue(fbPath('totals'), snap => {
    const d = snap.val() || {};
    const intel = d.intel || 0;
    const amd   = d.amd   || 0;
    updateGlobalSummary(intel, amd);
  });

  // Participantes
  window.fbOnValue(fbPath('participants'), snap => {
    const n = snap.val() || 0;
    document.getElementById('globalParticipants').textContent =
      `${n} participante${n !== 1 ? 's' : ''}`;
    document.getElementById('metaParticipants').textContent = n;
  });

  // Votos por caso
  window.fbOnValue(fbPath('cases'), snap => {
    const d = snap.val() || {};
    renderCaseBreakdown(d);
  });

  // Perfiles
  window.fbOnValue(fbPath('profiles'), snap => {
    const d = snap.val() || {};
    renderProfileBars(d);
  });
}

function updateGlobalSummary(intel, amd) {
  const total = intel + amd || 1;
  const iPct  = Math.round((intel / total) * 100);
  const aPct  = 100 - iPct;

  document.getElementById('globalIntelVotes').textContent = intel;
  document.getElementById('globalAmdVotes').textContent   = amd;
  document.getElementById('globalIntelPct').textContent   = `${iPct}%`;
  document.getElementById('globalAmdPct').textContent     = `${aPct}%`;

  requestAnimationFrame(() => {
    document.getElementById('globalBarIntel').style.width = `${iPct}%`;
    document.getElementById('globalBarAmd').style.width   = `${aPct}%`;
  });
}

function renderCaseBreakdown(data) {
  const container = document.getElementById('globalCases');

  // Agrupa los casos del banco completo (ALL_CASES) por era para mostrar secciones
  const eras = [
    { key: 'moderno',    label: '🟢 Modernos (2023-2024)' },
    { key: 'intermedio', label: '🟡 Era intermedia (2015-2020)' },
    { key: 'historico',  label: '🔴 Históricos (2010-2015)' },
  ];

  container.innerHTML = eras.map(era => {
    const casosDeEra = ALL_CASES.filter(c => c.era === era.key);
    // Solo mostrar eras que tengan al menos 1 voto
    const tieneVotos = casosDeEra.some(c => (data[c.id]?.intel || 0) + (data[c.id]?.amd || 0) > 0);
    if (!tieneVotos) return '';

    const filas = casosDeEra.map(c => {
      const cd    = data[c.id] || {};
      const intel = cd.intel || 0;
      const amd   = cd.amd   || 0;
      const total = intel + amd;
      if (total === 0) return ''; // ocultar casos sin votos aún
      const iPct = Math.round((intel / total) * 100);
      const aPct = 100 - iPct;
      return `
        <div class="case-breakdown">
          <div class="case-breakdown__header">
            <span class="case-breakdown__icon">${c.icon}</span>
            <span class="case-breakdown__title">${c.title}</span>
            <span class="case-breakdown__era-label">${c.eraLabel}</span>
            <span class="case-breakdown__total">${total} votos</span>
          </div>
          <div class="case-breakdown__bar">
            <div class="case-breakdown__bar-intel" style="width:${iPct}%">
              ${iPct > 12 ? `<span>${iPct}%</span>` : ''}
            </div>
            <div class="case-breakdown__bar-amd" style="width:${aPct}%">
              ${aPct > 12 ? `<span>${aPct}%</span>` : ''}
            </div>
          </div>
          <div class="case-breakdown__labels">
            <span class="hl-intel">Intel ${intel}</span>
            <span class="hl-amd">AMD ${amd}</span>
          </div>
        </div>`;
    }).join('');

    return `<div class="era-section"><h3 class="era-section__title">${era.label}</h3>${filas}</div>`;
  }).join('');
}

function renderProfileBars(data) {
  const intel = data.intelStrong || 0;
  const amd   = data.amdStrong   || 0;
  const mixed = data.balanced    || 0;
  const max   = Math.max(intel, amd, mixed, 1);

  document.getElementById('profileBarIntel').style.width = `${(intel / max) * 100}%`;
  document.getElementById('profileBarAmd').style.width   = `${(amd   / max) * 100}%`;
  document.getElementById('profileBarMixed').style.width = `${(mixed / max) * 100}%`;
  document.getElementById('profileCountIntel').textContent = intel;
  document.getElementById('profileCountAmd').textContent   = amd;
  document.getElementById('profileCountMixed').textContent = mixed;
}

/* ----------------------------------------------------------
   RENDER DE CASO PRÁCTICO
   ---------------------------------------------------------- */
function renderCase(index) {
  const c       = CASES[index];
  const intelCpu = CPU_SPECS[c.intel];
  const amdCpu   = CPU_SPECS[c.amd];

  document.getElementById('caseCounter').textContent = `CASO ${index + 1} / ${CASES.length}`;
  document.getElementById('caseTitle').textContent   = `${c.icon}  ${c.title}`;
  document.getElementById('caseDesc').textContent    = c.desc;

  // Badge de época — se crea si no existe, se actualiza en cada caso
  let eraBadge = document.getElementById('eraBadge');
  if (!eraBadge) {
    eraBadge = document.createElement('span');
    eraBadge.id = 'eraBadge';
    document.getElementById('caseCounter').insertAdjacentElement('afterend', eraBadge);
  }
  const eraColors = { moderno: 'era-badge--modern', intermedio: 'era-badge--mid', historico: 'era-badge--retro' };
  const eraLabels = { moderno: '🟢 Moderno', intermedio: '🟡 Intermedio', historico: '🔴 Histórico' };
  eraBadge.className = `era-badge ${eraColors[c.era] || ''}`;
  eraBadge.textContent = `${eraLabels[c.era] || c.era} · ${c.eraLabel}`;

  document.getElementById('iconIntel').textContent = intelCpu.icon;
  document.getElementById('nameIntel').textContent = intelCpu.name;
  document.getElementById('quickIntel').innerHTML  =
    `<span>${intelCpu.cores}</span><span>${intelCpu.threads}</span><span>${intelCpu.freq}</span>`;

  document.getElementById('iconAmd').textContent = amdCpu.icon;
  document.getElementById('nameAmd').textContent = amdCpu.name;
  document.getElementById('quickAmd').innerHTML  =
    `<span>${amdCpu.cores}</span><span>${amdCpu.threads}</span><span>${amdCpu.freq}</span>`;

  ['cardIntel', 'cardAmd'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('cpu-card--chosen', 'cpu-card--fade');
    el.disabled = false;
  });

  goToScreen('case');
}

/* ----------------------------------------------------------
   VOTO
   ---------------------------------------------------------- */
function handleVote(brand, clickEvent) {
  const c      = CASES[state.currentCaseIndex];
  const cpuKey = brand === 'intel' ? c.intel : c.amd;

  state.votes[brand]++;
  state.caseChoices[state.currentCaseIndex] = brand;  // guardar elección por caso
  state.lastChoice = { brand, cpuKey, caseData: c };

  const chosenCard = document.getElementById(brand === 'intel' ? 'cardIntel' : 'cardAmd');
  const otherCard  = document.getElementById(brand === 'intel' ? 'cardAmd'   : 'cardIntel');
  chosenCard.classList.add('cpu-card--chosen');
  otherCard.classList.add('cpu-card--fade');
  document.getElementById('cardIntel').disabled = true;
  document.getElementById('cardAmd').disabled   = true;

  triggerVoteFlash(clickEvent, brand);

  voteTimer = setTimeout(() => renderExplanation(), 650);
}

function triggerVoteFlash(ev, brand) {
  const x = ev.clientX || window.innerWidth / 2;
  const y = ev.clientY || window.innerHeight / 2;
  voteFlash.style.left       = `${x}px`;
  voteFlash.style.top        = `${y}px`;
  voteFlash.style.background = brand === 'intel' ? 'var(--intel-cyan)' : 'var(--amd-red)';
  voteFlash.classList.remove('vote-flash--active');
  void voteFlash.offsetWidth;
  voteFlash.classList.add('vote-flash--active');
}

/* ----------------------------------------------------------
   EXPLICACIÓN EDUCATIVA
   ---------------------------------------------------------- */
function renderExplanation() {
  if (!state.lastChoice) return;
  const { brand, cpuKey, caseData } = state.lastChoice;
  const cpu = CPU_SPECS[cpuKey];

  document.getElementById('explainIcon').textContent = cpu.icon;
  document.getElementById('explainName').textContent = cpu.name;
  document.getElementById('explainWhy').textContent  = caseData.why[brand];
  document.getElementById('specCores').textContent   = cpu.cores;
  document.getElementById('specThreads').textContent = cpu.threads;
  document.getElementById('specFreq').textContent    = cpu.freq;
  document.getElementById('specCache').textContent   = cpu.cache;
  document.getElementById('specTdp').textContent     = cpu.tdp;
  document.getElementById('specSocket').textContent  = cpu.socket;

  document.getElementById('explainResult').style.borderColor =
    brand === 'intel' ? 'var(--intel-blue)' : 'var(--amd-red)';

  document.getElementById('eduContent').innerHTML = caseData.edu.map(item => `
    <div class="edu-item">
      <span class="edu-item__tag">${item.tag}</span>
      <span class="edu-item__text">${item.text}</span>
    </div>`).join('');

  const isLast = state.currentCaseIndex === CASES.length - 1;
  document.getElementById('btnContinueLabel').textContent = isLast
    ? 'Ver mi resultado' : 'Siguiente caso';

  goToScreen('explain');
}

function handleContinue() {
  const isLast = state.currentCaseIndex === CASES.length - 1;
  if (isLast) {
    renderFinal();
  } else {
    state.currentCaseIndex++;
    renderCase(state.currentCaseIndex);
  }
}

/* ----------------------------------------------------------
   RESULTADO FINAL PERSONAL
   ---------------------------------------------------------- */
function resolveProfileKey(intel, amd) {
  if (intel >= 4) return 'intelStrong';
  if (amd >= 4)   return 'amdStrong';
  if (intel > amd) return 'intelStrong';
  if (amd > intel) return 'amdStrong';
  return 'balanced';
}

function renderFinal() {
  const { intel, amd } = state.votes;

  document.getElementById('scoreIntel').textContent = intel;
  document.getElementById('scoreAmd').textContent   = amd;

  const total   = intel + amd;
  const iPct    = total === 0 ? 50 : (intel / total) * 100;
  const aPct    = 100 - iPct;

  document.getElementById('barIntel').style.width = '0%';
  document.getElementById('barAmd').style.width   = '0%';
  requestAnimationFrame(() => setTimeout(() => {
    document.getElementById('barIntel').style.width = `${iPct}%`;
    document.getElementById('barAmd').style.width   = `${aPct}%`;
  }, 80));

  const profileKey = resolveProfileKey(intel, amd);
  const profile    = PROFILES[profileKey];
  document.getElementById('profileTitle').textContent = profile.title;
  document.getElementById('profileDesc').textContent  = profile.desc;

  // Subir resultado a Firebase (solo una vez)
  submitResultsToFirebase(state.votes);

  goToScreen('final');
}

/* ----------------------------------------------------------
   PANTALLA GLOBAL
   ---------------------------------------------------------- */
function showGlobalResults() {
  goToScreen('global');
}

/* ----------------------------------------------------------
   REINICIAR
   ---------------------------------------------------------- */
function restartActivity() {
  clearTimeout(voteTimer);
  state.currentCaseIndex    = 0;
  state.votes               = { intel: 0, amd: 0 };
  state.caseChoices         = [];
  state.lastChoice          = null;
  state.submittedToFirebase = false;
  goToScreen('welcome');
}

/* ----------------------------------------------------------
   CICLO FETCH → DECODE → EXECUTE → WRITE BACK
   ---------------------------------------------------------- */
function setCycleStep(index) {
  cycleStepIndex = index;
  const step = CYCLE_STEPS[index];
  CYCLE_STEPS.forEach((s, i) =>
    document.getElementById(s.node).classList.toggle('cycle-node--active', i === index));
  document.getElementById('cycleStepNum').textContent   = `PASO ${index + 1} / ${CYCLE_STEPS.length}`;
  document.getElementById('cycleStepTitle').textContent = step.title;
  document.getElementById('cycleStepText').textContent  = step.text;
  document.querySelectorAll('.cycle-dot').forEach((dot, i) =>
    dot.classList.toggle('cycle-dot--active', i === index));
}

function playCycle() {
  if (cyclePlaying) { stopCycle(); return; }
  cyclePlaying = true;
  document.getElementById('btnPlayCycleLabel').textContent = '⏸ Pausar ciclo';
  cycleTimer = setInterval(() => setCycleStep((cycleStepIndex + 1) % CYCLE_STEPS.length), 2200);
}

function stopCycle() {
  cyclePlaying = false;
  clearInterval(cycleTimer);
  document.getElementById('btnPlayCycleLabel').textContent = '▶ Reproducir ciclo';
}

/* ----------------------------------------------------------
   INDICADOR DE CONEXIÓN FIREBASE
   ---------------------------------------------------------- */
function setFirebaseStatus(connected) {
  const dot   = document.getElementById('firebaseDot');
  const label = document.getElementById('firebaseLabel');
  if (connected) {
    dot.className   = 'firebase-status__dot firebase-status__dot--ok';
    label.textContent = 'En vivo';
  } else {
    dot.className   = 'firebase-status__dot firebase-status__dot--off';
    label.textContent = 'Sin conexión';
  }
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
function init() {
  // Array para guardar la elección (intel|amd) en cada caso
  state.caseChoices = [];

  // Botones de navegación
  document.getElementById('btnStart').addEventListener('click', () => {
    state.currentCaseIndex    = 0;
    state.submittedToFirebase = false;
    state.caseChoices         = [];
    renderCase(0);
  });

  document.getElementById('cardIntel').addEventListener('click', e => handleVote('intel', e));
  document.getElementById('cardAmd').addEventListener('click',   e => handleVote('amd',   e));
  document.getElementById('btnContinue').addEventListener('click', handleContinue);
  document.getElementById('btnRestart').addEventListener('click', restartActivity);

  document.getElementById('btnSeeGlobal').addEventListener('click', showGlobalResults);
  document.getElementById('btnGlobalResults').addEventListener('click', showGlobalResults);

  document.getElementById('btnBackFromGlobal').addEventListener('click', () => {
    goToScreen(state.submittedToFirebase ? 'final' : 'welcome');
  });

  // Botones de bonus (ciclo)
  document.getElementById('btnHowItWorks').addEventListener('click', () => {
    state.cameFromScreen = 'welcome';
    goToScreen('cycle'); setCycleStep(0);
  });
  document.getElementById('btnHowItWorks2').addEventListener('click', () => {
    state.cameFromScreen = 'final';
    goToScreen('cycle'); setCycleStep(0);
  });
  document.getElementById('btnBackFromCycle').addEventListener('click', () => {
    stopCycle();
    goToScreen(state.cameFromScreen);
  });
  document.getElementById('btnPlayCycle').addEventListener('click', playCycle);
  document.querySelectorAll('.cycle-dot').forEach(dot =>
    dot.addEventListener('click', () => { stopCycle(); setCycleStep(+dot.dataset.dot); }));

  setCycleStep(0);

  // Función que activa Firebase en la app. Se llama de dos formas posibles:
  // A) El módulo Firebase termina DESPUÉS de script.js → index.html llama window.onFirebaseReady()
  // B) El módulo Firebase termina ANTES de script.js  → window._firebaseLoaded ya es true, la llamamos acá
  function activateFirebase() {
    state.firebaseReady = true;
    setFirebaseStatus(true);
    listenGlobalResults();
  }

  if (window._firebaseLoaded) {
    // Firebase ya terminó de cargar antes que nosotros → activar de una
    activateFirebase();
  } else {
    // Firebase todavía no terminó → dejamos el callback para que lo llame él
    window.onFirebaseReady = activateFirebase;
  }

  // Si en 6s Firebase sigue sin conectarse, mostrar "sin conexión"
  setTimeout(() => {
    if (!state.firebaseReady) setFirebaseStatus(false);
  }, 6000);
}

document.addEventListener('DOMContentLoaded', init);

const CATEGORY_STUDY_ORDER = {
  'Biologia': ['bio-09','bio-07','bio-05','bio-06','bio-08','bio-21','bio-22','bio-23','bio-24','bio-25','bio-10','bio-03','bio-11','bio-12','bio-13','bio-14','bio-16','bio-17','bio-19','bio-18','bio-20','bio-26','bio-01','bio-02','bio-04','bio-15'],
  'Química': ['qui-01','qui-02','qui-03','qui-04','qui-05','qui-06','qui-07','qui-08','qui-09','qui-10','qui-11','qui-12','qui-13','qui-14','qui-15','qui-16','qui-17','qui-18','qui-19','qui-20','qui-21','qui-22','qui-23','qui-24'],
  'Física': ['fis-15','fis-17','fis-16','fis-19','fis-20','fis-18','fis-11','fis-12','fis-14','fis-13','fis-09','fis-10','fis-06','fis-07','fis-08','fis-01','fis-02','fis-03','fis-04','fis-05'],
  'Geografia': ['geo-01','geo-02','geo-03','geo-04','geo-05','geo-06','geo-13','geo-14','geo-12','geo-08','geo-09','geo-10','geo-11','geo-07','geo-25','geo-26','geo-24','geo-17','geo-18','geo-19','geo-20','geo-21','geo-22','geo-23','geo-15','geo-16'],
  'Linguagens': ['lin-23','lin-01','lin-02','lin-06','lin-07','lin-08','lin-09','lin-04','lin-05','lin-03','lin-10','lin-14','lin-11','lin-12','lin-13','lin-15','lin-16','lin-17','lin-18','lin-20','lin-21','lin-19','lin-22'],
  'História': ['his-01','his-02','his-03','his-04','his-05','his-06','his-07','his-09','his-08','his-12','his-13','his-14','his-15','his-10','his-11','his-17','his-19','his-18','his-20','his-21','his-24','his-22','his-25','his-23','his-26','his-27','his-28','his-16'],
  'Matemática': ['mat-01','mat-02','mat-13','mat-03','mat-04','mat-05','mat-09','mat-06','mat-08','mat-14','mat-07','mat-11','mat-12','mat-15','mat-16','mat-17','mat-18','mat-19','mat-10','mat-20','mat-21','mat-22']
};

const XP_TABLE = [
  { level: 1, xpNeeded: 0, name: 'Iniciante', icon: '🌱', color: '#6b7199' },
  { level: 2, xpNeeded: 100, name: 'Estudante', icon: '📖', color: '#8B7355' },
  { level: 3, xpNeeded: 300, name: 'Dedicado', icon: '💪', color: '#CD7F32' },
  { level: 4, xpNeeded: 600, name: 'Avançado', icon: '🎯', color: '#A8A8A8' },
  { level: 5, xpNeeded: 1000, name: 'Expert', icon: '🧠', color: '#FFD700' },
  { level: 6, xpNeeded: 1500, name: 'Mestre', icon: '🏅', color: '#FF6B35' },
  { level: 7, xpNeeded: 2200, name: 'Sábio', icon: '📚', color: '#7c5cfc' },
  { level: 8, xpNeeded: 3000, name: 'Lenda', icon: '⚡', color: '#ff3cac' },
  { level: 9, xpNeeded: 4000, name: 'Transcendente', icon: '💎', color: '#00e5a0' },
  { level: 10, xpNeeded: 5500, name: 'Mítico', icon: '👑', color: '#ff3cac' },
];

const ACHIEVEMENTS = [
  { id: 'first-step', name: 'Primeiro Passo', icon: '👣', desc: 'Estude seu primeiro tópico', condition: s => Object.values(s.topics).some(t => t.timeSpent > 0) },
  { id: 'ten-questions', name: 'Dez Questões', icon: '🔟', desc: 'Responda 10 questões no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += t.questionsAnswered || 0); return total >= 10; } },
  { id: 'fifty-questions', name: 'Meio Cento', icon: '🎯', desc: 'Responda 50 questões no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += t.questionsAnswered || 0); return total >= 50; } },
  { id: 'hundred-questions', name: 'Centenário', icon: '💯', desc: 'Responda 100 questões no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += t.questionsAnswered || 0); return total >= 100; } },
  { id: 'perfect-accuracy', name: 'Atirador de Elite', icon: '🎯', desc: 'Tenha 100% de acerto com pelo menos 10 questões', condition: s => { let total = 0, correct = 0; Object.values(s.topics).forEach(t => { total += t.questionsAnswered || 0; correct += t.questionsCorrect || 0; }); return total >= 100 && correct === total; } },
  { id: 'streak-3', name: 'Fogo Aceso', icon: '🔥', desc: 'Tenha ofensiva de 3 dias', condition: s => s.streak.count >= 3 },
  { id: 'streak-7', name: 'Semana Perfeita', icon: '🔥', desc: 'Tenha ofensiva de 7 dias', condition: s => s.streak.count >= 7 },
  { id: 'streak-30', name: 'Imparável', icon: '🔥', desc: 'Tenha ofensiva de 30 dias', condition: s => s.streak.count >= 30 },
  { id: 'first-complete', name: 'Primeira Conquista', icon: '✅', desc: 'Complete seu primeiro tópico', condition: s => Object.values(s.topics).some(t => t.completed) },
  { id: 'five-complete', name: 'Coletor', icon: '📦', desc: 'Complete 5 tópicos', condition: s => Object.values(s.topics).filter(t => t.completed).length >= 5 },
  { id: 'ten-complete', name: 'Conquistador', icon: '🏆', desc: 'Complete 10 tópicos', condition: s => Object.values(s.topics).filter(t => t.completed).length >= 10 },
  { id: 'twenty-complete', name: 'Mestre dos Tópicos', icon: '🎓', desc: 'Complete 20 tópicos', condition: s => Object.values(s.topics).filter(t => t.completed).length >= 20 },
  { id: 'bio-master', name: 'Mestre Biologia', icon: '🧬', desc: 'Complete todos os tópicos de Biologia', condition: s => { const bio = (s.categories || []).find(c => c.name === 'Biologia'); return bio ? bio.topics.every(t => s.topics[t.id]?.completed) : false; } },
  { id: 'quimica-master', name: 'Mestre Química', icon: '⚗️', desc: 'Complete todos os tópicos de Química', condition: s => { const cat = (s.categories || []).find(c => c.name === 'Química'); return cat ? cat.topics.every(t => s.topics[t.id]?.completed) : false; } },
  { id: 'fisica-master', name: 'Mestre Física', icon: '⚡', desc: 'Complete todos os tópicos de Física', condition: s => { const cat = (s.categories || []).find(c => c.name === 'Física'); return cat ? cat.topics.every(t => s.topics[t.id]?.completed) : false; } },
  { id: 'fifty-hours', name: 'Maratonista', icon: '⏱', desc: 'Estude 50 horas no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += t.timeSpent || 0); return total >= 50; } },
  { id: 'hundred-hours', name: 'Centenário de Horas', icon: '⏰', desc: 'Estude 100 horas no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += t.timeSpent || 0); return total >= 100; } },
  { id: 'elo-gold', name: 'Rank Ouro', icon: '🥇', desc: 'Alcance o rank Ouro em qualquer tópico', condition: s => { return Object.values(s.topics).some(t => { if (t.questionsAnswered > 0) { const acc = (t.questionsCorrect / t.questionsAnswered) * 100; return acc >= 75; } return false; }); } },
  { id: 'all-categories', name: 'Poliglota', icon: '🌐', desc: 'Estude pelo menos 1 tópico de cada matéria', condition: s => { return (s.categories || []).every(cat => cat.topics.some(t => s.topics[t.id]?.timeSpent > 0)); } },
  { id: 'subtopic-collector', name: 'Detalhista', icon: '📋', desc: 'Complete 50 subtópicos no total', condition: s => { let total = 0; Object.values(s.topics).forEach(t => total += (t.studiedSubtopics || []).length); return total >= 50; } },
];

const App = {
  state: null,
  charts: {},
  currentWeek: 0,
  _pomodoroTimer: null,
  _pomodoroTimeLeft: 0,
  _pomodoroRunning: false,
  _pomodoroIsBreak: false,

  init() {
    this.loadState();
    this.initTheme();
    this.render();
    this.bindEvents();
    this.checkAchievements();
  },

  loadState() {
    const saved = localStorage.getItem('estudoAppENEM-v2');
    if (saved) {
      this.state = JSON.parse(saved);
      if (!this.state.xp) this.state.xp = 0;
      if (!this.state.achievements) this.state.achievements = [];
      if (!this.state.categories) {
        this.state.categories = JSON.parse(JSON.stringify(EXAM_DATA.categories));
      }
      if (!this.state.pomodoro) this.state.pomodoro = { workMin: 25, breakMin: 5, sessions: 0, totalMinutes: 0 };
      this.state.categories.forEach(cat => {
        if (!cat.topics) cat.topics = [];
        cat.topics.forEach(t => {
          if (!this.state.topics[t.id]) {
            this.state.topics[t.id] = { id: t.id, name: t.name, category: cat.name, estHours: t.estHours || 0, weight: t.weight || 5, importance: Math.min(5, Math.round((t.recurrenceScore || 50) / 20)), timeSpent: 0, questionsAnswered: 0, questionsCorrect: 0, selfDifficulty: null, lastStudied: null, completed: false, studiedSubtopics: [] };
          } else if (this.state.topics[t.id].importance === undefined) {
            const recScore = t.recurrenceScore || 50;
            this.state.topics[t.id].importance = Math.min(5, Math.round(recScore / 20));
          }
        });
      });
    } else {
      this.state = this.getDefaultState();
      this.saveState();
    }
  },

  getDefaultState() {
    const now = new Date().toISOString();
    const categories = JSON.parse(JSON.stringify(EXAM_DATA.categories));
    const topics = {};
    categories.forEach(cat => {
      cat.topics.forEach(t => {
        const recScore = t.recurrenceScore || 50;
        topics[t.id] = {
          ...t,
          category: cat.name,
          importance: Math.min(5, Math.round(recScore / 20)),
          timeSpent: 0,
          questionsAnswered: 0,
          questionsCorrect: 0,
          selfDifficulty: null,
          lastStudied: null,
          completed: false,
          studiedSubtopics: []
        };
      });
    });
    return {
      topics,
      categories,
      config: { examDate: null, dailyHours: 0, studyDays: [1, 2, 3, 4, 5], lastAccess: null, trimmed: false, trimmedTopics: [] },
      streak: { count: 0, lastDate: null },
      xp: 0,
      achievements: [],
      pomodoro: { workMin: 25, breakMin: 5, sessions: 0, totalMinutes: 0 },
      firstAccess: now
    };
  },

  saveState() {
    localStorage.setItem('estudoAppENEM-v2', JSON.stringify(this.state));
  },

  getConfig() { return this.state.config; },

  getTopics() {
    const result = [];
    this.state.categories.forEach(cat => {
      cat.topics.forEach(t => result.push(this.state.topics[t.id]));
    });
    return result;
  },

  getTopicState(topicId) { return this.state.topics[topicId]; },

  getElo(accuracy) {
    if (accuracy == null || isNaN(accuracy)) return ELO_THRESHOLDS[0];
    for (let i = ELO_THRESHOLDS.length - 1; i >= 0; i--) {
      if (accuracy >= ELO_THRESHOLDS[i].min) return ELO_THRESHOLDS[i];
    }
    return ELO_THRESHOLDS[0];
  },

  getEloForTopic(topicId) {
    const t = this.getTopicState(topicId);
    const acc = t.questionsAnswered > 0 ? (t.questionsCorrect / t.questionsAnswered) * 100 : null;
    return this.getElo(acc);
  },

  calcAccuracy(topicId) {
    const t = this.getTopicState(topicId);
    if (t.questionsAnswered === 0) return null;
    return (t.questionsCorrect / t.questionsAnswered) * 100;
  },

  calcCategoryStats() {
    const result = [];
    this.state.categories.forEach(cat => {
      let totalEst = 0, totalCompleted = 0, totalQ = 0, totalC = 0, count = 0, completedCount = 0;
      cat.topics.forEach(t => {
        const ts = this.state.topics[t.id];
        totalEst += ts.estHours || t.estHours;
        if (ts.completed) { totalCompleted += ts.estHours || t.estHours; completedCount++; }
        totalQ += ts.questionsAnswered || 0;
        totalC += ts.questionsCorrect || 0;
        count++;
      });
      const acc = totalQ > 0 ? (totalC / totalQ) * 100 : null;
      result.push({
        name: cat.name, icon: cat.icon, info: cat.info,
        totalTopics: count, completedTopics: completedCount,
        totalEstHours: totalEst, completedEstHours: totalCompleted,
        progress: totalEst > 0 ? (totalCompleted / totalEst) * 100 : 0,
        questionsAnswered: totalQ, questionsCorrect: totalC, accuracy: acc
      });
    });
    return result;
  },

  getOverallProgress() {
    const cats = this.calcCategoryStats();
    let totalEst = 0, totalDone = 0;
    cats.forEach(c => { totalEst += c.totalEstHours; totalDone += c.completedEstHours; });
    return totalEst > 0 ? (totalDone / totalEst) * 100 : 0;
  },

  getProgressLevel(progress) {
    if (progress >= 90) return { name: 'Diamante', icon: '💎', color: '#00d4ff', bg: 'rgba(0,212,255,0.15)', glow: true };
    if (progress >= 75) return { name: 'Platina', icon: '⭐', color: '#e5e4e2', bg: 'rgba(229,228,226,0.15)', glow: false };
    if (progress >= 50) return { name: 'Ouro', icon: '🥇', color: '#FFD700', bg: 'rgba(255,215,0,0.15)', glow: false };
    if (progress >= 25) return { name: 'Prata', icon: '🥈', color: '#A8A8A8', bg: 'rgba(168,168,168,0.15)', glow: false };
    if (progress >= 10) return { name: 'Bronze', icon: '🥉', color: '#CD7F32', bg: 'rgba(205,127,50,0.15)', glow: false };
    return { name: 'Ferro', icon: '🪨', color: '#8B7355', bg: 'rgba(139,115,85,0.15)', glow: false };
  },

  getZonaRisco() {
    const now = new Date();
    const result = [];
    this.state.categories.forEach(cat => {
      cat.topics.forEach(t => {
        const ts = this.state.topics[t.id];
        if (ts.lastStudied && ts.questionsAnswered > 0) {
          const acc = (ts.questionsCorrect / ts.questionsAnswered) * 100;
          if (acc >= 60) {
            const daysDiff = Math.floor((now - new Date(ts.lastStudied)) / (1000 * 60 * 60 * 24));
            if (daysDiff >= 15) result.push({ ...ts, daysSinceStudy: daysDiff });
          }
        }
      });
    });
    return result.sort((a, b) => b.daysSinceStudy - a.daysSinceStudy);
  },

  getFluencyAlerts() {
    const alerts = [];
    this.state.categories.forEach(cat => {
      cat.topics.forEach(t => {
        const ts = this.state.topics[t.id];
        if (ts.selfDifficulty === 'easy' && ts.questionsAnswered >= 3) {
          const acc = (ts.questionsCorrect / ts.questionsAnswered) * 100;
          if (acc < 60) {
            alerts.push({ topicId: ts.id, name: ts.name, category: cat.name, accuracy: acc });
          }
        }
      });
    });
    return alerts;
  },

  // ═══ XP SYSTEM ═══
  addXP(amount, reason) {
    const oldLevel = this.getLevel();
    this.state.xp = (this.state.xp || 0) + amount;
    const newLevel = this.getLevel();
    this.saveState();
    this.showToast(`+${amount} XP`, reason);
    if (newLevel.level > oldLevel.level) {
      setTimeout(() => this.showLevelUp(newLevel), 800);
    }
    this.renderHeader();
  },

  getLevel() {
    const xp = this.state.xp || 0;
    let current = XP_TABLE[0];
    for (let i = XP_TABLE.length - 1; i >= 0; i--) {
      if (xp >= XP_TABLE[i].xpNeeded) { current = XP_TABLE[i]; break; }
    }
    const nextIdx = XP_TABLE.indexOf(current) + 1;
    const next = nextIdx < XP_TABLE.length ? XP_TABLE[nextIdx] : null;
    const xpInLevel = xp - current.xpNeeded;
    const xpForNext = next ? next.xpNeeded - current.xpNeeded : 0;
    const progress = xpForNext > 0 ? (xpInLevel / xpForNext) * 100 : 100;
    return { ...current, progress, nextLevel: next, xpInLevel, xpForNext };
  },

  // ═══ SOUND ═══
  playSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0.1;
      if (type === 'xp') { osc.frequency.value = 880; osc.type = 'sine'; gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15); osc.start(); osc.stop(ctx.currentTime + 0.15); }
      else if (type === 'levelup') { osc.frequency.value = 523; osc.type = 'sine'; gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4); osc.start(); setTimeout(() => { const o2 = ctx.createOscillator(); const g2 = ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination); g2.gain.value = 0.1; o2.frequency.value = 659; o2.type = 'sine'; g2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5); o2.start(); o2.stop(ctx.currentTime + 0.5); }, 150); osc.stop(ctx.currentTime + 0.15); }
      else if (type === 'achievement') { osc.frequency.value = 784; osc.type = 'triangle'; gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); osc.start(); osc.stop(ctx.currentTime + 0.3); }
    } catch (e) {}
  },

  // ═══ TOAST ═══
  showToast(title, desc) {
    const toast = document.getElementById('xp-toast');
    const titleEl = document.getElementById('toast-title');
    const descEl = document.getElementById('toast-desc');
    if (!toast || !titleEl || !descEl) return;
    titleEl.textContent = title;
    descEl.textContent = desc;
    toast.style.display = 'flex';
    toast.style.animation = 'none';
    toast.offsetHeight;
    toast.style.animation = 'toastSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 2500);
  },

  showLevelUp(level) {
    this.playSound('levelup');
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.innerHTML = `<div class="xp-popup-icon">${level.icon}</div><div class="xp-popup-title">Nível ${level.level}!</div><div class="xp-popup-xp">${level.name}</div><div style="margin-top:16px"><button class="btn btn-primary" onclick="this.closest('.xp-popup').remove()">Continuar</button></div>`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
  },

  // ═══ POMODORO ═══
  pomodoroStart() {
    if (this._pomodoroRunning) return;
    this._pomodoroRunning = true;
    if (this._pomodoroTimeLeft <= 0) {
      this._pomodoroIsBreak = false;
      this._pomodoroTimeLeft = (this.state.pomodoro.workMin || 25) * 60;
    }
    this._pomodoroTick();
    this._updatePomodoroButtons();
  },

  _pomodoroTick() {
    if (!this._pomodoroRunning) return;
    this._pomodoroTimer = setTimeout(() => {
      this._pomodoroTimeLeft--;
      const display = document.getElementById('pomodoro-display');
      if (display) display.textContent = this.pomodoroFormat(this._pomodoroTimeLeft);
      if (this._pomodoroTimeLeft <= 0) {
        this._pomodoroRunning = false;
        clearTimeout(this._pomodoroTimer);
        if (!this._pomodoroIsBreak) {
          this.state.pomodoro.sessions++;
          const workMin = this.state.pomodoro.workMin || 25;
          this.state.pomodoro.totalMinutes += workMin;
          this.saveState();
          this.addXP(20, 'Pomodoro concluído!');
          this.playSound('achievement');
          this.showToast('🍅 Sessão concluída!', `${workMin} minutos estudados`);
          this._pomodoroIsBreak = true;
          this._pomodoroTimeLeft = (this.state.pomodoro.breakMin || 5) * 60;
          this._pomodoroRunning = true;
          this._pomodoroTick();
        } else {
          this.showToast('☕ Pausa concluída!', 'Hora de estudar de novo');
          this._pomodoroIsBreak = false;
          this._pomodoroTimeLeft = 0;
        }
        this.renderDashboard();
        return;
      }
      this._pomodoroTick();
    }, 1000);
  },

  pomodoroPause() {
    this._pomodoroRunning = false;
    clearTimeout(this._pomodoroTimer);
    this.renderDashboard();
  },

  pomodoroReset() {
    this._pomodoroRunning = false;
    clearTimeout(this._pomodoroTimer);
    this._pomodoroTimeLeft = 0;
    this._pomodoroIsBreak = false;
    this.renderDashboard();
  },

  _updatePomodoroButtons() {
    const container = document.querySelector('.chart-container');
    if (!container) return;
    const btnWrap = container.querySelectorAll('.chart-container div[style*="flex-direction:column"] > div')[0];
    if (!btnWrap) return;
    btnWrap.innerHTML = this._pomodoroRunning
      ? `<button class="btn btn-warning" data-action="pomodoro-pause">⏸ Pausar</button>`
      : `<button class="btn btn-primary" data-action="pomodoro-start">▶ Iniciar</button>`;
    btnWrap.innerHTML += `<button class="btn btn-outline" data-action="pomodoro-reset">↺ Resetar</button>`;
  },

  pomodoroFormat(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  // ═══ ACHIEVEMENTS ═══
  checkAchievements() {
    const newAchievements = [];
    ACHIEVEMENTS.forEach(a => {
      if (!this.state.achievements.includes(a.id) && a.condition(this.state)) {
        this.state.achievements.push(a.id);
        newAchievements.push(a);
      }
    });
    if (newAchievements.length > 0) {
      this.saveState();
      newAchievements.forEach((a, i) => {
        setTimeout(() => {
          this.playSound('achievement');
          this.showToast(`${a.icon} ${a.name}`, a.desc);
        }, i * 1000);
      });
    }
  },

  // ═══ LOG STUDY ═══
  logStudy(topicId, hours, difficulty) {
    const ts = this.state.topics[topicId];
    const wasCompleted = ts.completed;
    ts.timeSpent = (ts.timeSpent || 0) + hours;
    ts.lastStudied = new Date().toISOString();
    if (difficulty) ts.selfDifficulty = difficulty;
    if (!ts.completed) {
      const estTotal = ts.estHours;
      if (ts.timeSpent >= estTotal) ts.completed = true;
    }
    this.checkDailyStreak();
    this.addXP(Math.round(hours * 15), `Estudou ${ts.name}`);
    this.checkAchievements();
    this.saveState();
    this.render();
  },

  logQuestions(topicId, correct, total) {
    const ts = this.state.topics[topicId];
    ts.questionsAnswered = (ts.questionsAnswered || 0) + total;
    ts.questionsCorrect = (ts.questionsCorrect || 0) + correct;
    ts.lastStudied = new Date().toISOString();
    const xp = correct * 5 + (total - correct) * 2;
    this.checkDailyStreak();
    this.addXP(xp, `Questões em ${ts.name}`);
    this.checkAchievements();
    this.saveState();
    this.render();
  },

  checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (this.state.streak.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (this.state.streak.lastDate === yesterday) this.state.streak.count++;
      else if (this.state.streak.lastDate !== today) this.state.streak.count = 1;
      this.state.streak.lastDate = today;
    }
  },

  getStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (this.state.streak.lastDate === today) return this.state.streak.count;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (this.state.streak.lastDate === yesterday) return this.state.streak.count;
    return 0;
  },

  calcViability() {
    const cfg = this.getConfig();
    if (!cfg.examDate || !cfg.dailyHours) return null;
    const examDate = new Date(cfg.examDate);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    if (daysUntilExam <= 0) return { feasible: false, daysRemaining: 0, msg: 'A data da prova já passou!', cuts: [] };
    const topics = this.getTopics();
    let remainingHours = 0;
    const pendingTopics = [];
    topics.forEach(t => {
      if (!t.completed) {
        const remaining = Math.max(0, (t.estHours || 0) - (t.timeSpent || 0));
        remainingHours += remaining;
        pendingTopics.push({ ...t, remaining });
      }
    });
    const studyDaysArr = cfg.studyDays || [1, 2, 3, 4, 5];
    let studyDays = 0;
    const cursor = new Date(today);
    for (let i = 0; i < daysUntilExam; i++) {
      if (studyDaysArr.includes(cursor.getDay())) studyDays++;
      cursor.setDate(cursor.getDate() + 1);
    }
    const availableHours = cfg.dailyHours * studyDays;
    const feasible = remainingHours <= availableHours;
    const cuts = [];
    if (!feasible && remainingHours > 0) {
      const sorted = pendingTopics.sort((a, b) => (b.weight || 0) - (a.weight || 0));
      let cumHours = 0;
      const targetHours = availableHours * 0.9;
      sorted.forEach(t => {
        if (cumHours + t.remaining <= targetHours) { cumHours += t.remaining; cuts.push({ ...t, keep: true }); }
        else cuts.push({ ...t, keep: false, cut: true });
      });
    }
    return {
      feasible, daysRemaining: daysUntilExam,
      remainingHours: Math.round(remainingHours), availableHours: Math.round(availableHours),
      dailyHours: cfg.dailyHours, deficit: Math.round(remainingHours - availableHours),
      cuts: cuts.filter(c => c.cut)
    };
  },

  getRecurrenceData(category) {
    const data = [];
    this.state.categories.forEach(cat => {
      if (category && cat.name !== category) return;
      cat.topics.forEach(t => {
        const ts = this.state.topics[t.id];
        const importance = ts && ts.importance !== undefined ? ts.importance : 3;
        data.push({ name: t.name, category: cat.name, icon: cat.icon, importance, score: importance * 20 });
      });
    });
    return data.sort((a, b) => b.score - a.score);
  },

  getTopicData(topicId) {
    for (const cat of this.state.categories) {
      const t = cat.topics.find(t => t.id === topicId);
      if (t) return t;
    }
    return null;
  },

  getSubtopicNames(topicId) {
    for (const cat of this.state.categories) {
      const t = cat.topics.find(t => t.id === topicId);
      if (t && t.subtopics) return t.subtopics;
    }
    return [];
  },

  getExamStats() {
    const topics = this.getTopics();
    let totalQ = 0, totalC = 0, studied = 0, completed = 0, totalHours = 0, spentHours = 0;
    topics.forEach(t => {
      if (t.questionsAnswered > 0) studied++;
      if (t.completed) completed++;
      totalQ += t.questionsAnswered || 0;
      totalC += t.questionsCorrect || 0;
      totalHours += t.estHours || 0;
      spentHours += t.timeSpent || 0;
    });
    return {
      totalTopics: topics.length, studied, completed, totalQ, totalC,
      accuracy: totalQ > 0 ? (totalC / totalQ) * 100 : null,
      totalHours, spentHours, progress: totalHours > 0 ? (completed / topics.length) * 100 : 0
    };
  },

  // ═══ CRUD OPERATIONS ═══
  addCategory(name, icon) {
    if (!name || !name.trim()) return;
    const id = 'cat-' + Date.now();
    this.state.categories.push({ name: name.trim(), icon: icon || '📚', topics: [] });
    this.saveState();
    this.render();
  },

  editCategory(oldName, newName, newIcon) {
    const cat = this.state.categories.find(c => c.name === oldName);
    if (!cat) return;
    if (newName && newName.trim()) cat.name = newName.trim();
    if (newIcon) cat.icon = newIcon;
    Object.values(this.state.topics).forEach(t => {
      if (t.category === oldName) t.category = cat.name;
    });
    this.saveState();
    this.render();
  },

  deleteCategory(name) {
    const cat = this.state.categories.find(c => c.name === name);
    if (!cat) return;
    cat.topics.forEach(t => { delete this.state.topics[t.id]; });
    this.state.categories = this.state.categories.filter(c => c.name !== name);
    this.saveState();
    this.render();
  },

  addTopic(categoryName, topicData) {
    const cat = this.state.categories.find(c => c.name === categoryName);
    if (!cat) return;
    const id = 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    const topic = {
      id,
      name: topicData.name || 'Novo Tópico',
      estHours: parseFloat(topicData.estHours) || 2,
      weight: parseInt(topicData.weight) || 5,
      recurrenceScore: parseInt(topicData.recurrenceScore) || 50,
      subtopics: topicData.subtopics || []
    };
    cat.topics.push(topic);
    this.state.topics[id] = {
      ...topic,
      category: categoryName,
      timeSpent: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      selfDifficulty: null,
      lastStudied: null,
      completed: false,
      studiedSubtopics: []
    };
    this.saveState();
    this.render();
  },

  editTopic(topicId, topicData) {
    const ts = this.state.topics[topicId];
    if (!ts) return;
    const cat = this.state.categories.find(c => c.name === ts.category);
    if (cat) {
      const t = cat.topics.find(t => t.id === topicId);
      if (t) {
        if (topicData.name) t.name = topicData.name;
        if (topicData.estHours !== undefined) t.estHours = parseFloat(topicData.estHours) || t.estHours;
        if (topicData.weight !== undefined) t.weight = parseInt(topicData.weight) || t.weight;
        if (topicData.recurrenceScore !== undefined) t.recurrenceScore = parseInt(topicData.recurrenceScore) || t.recurrenceScore;
        if (topicData.subtopics !== undefined) t.subtopics = topicData.subtopics;
      }
    }
    if (topicData.name) ts.name = topicData.name;
    if (topicData.estHours !== undefined) ts.estHours = parseFloat(topicData.estHours) || ts.estHours;
    if (topicData.weight !== undefined) ts.weight = parseInt(topicData.weight) || ts.weight;
    if (topicData.recurrenceScore !== undefined) ts.recurrenceScore = parseInt(topicData.recurrenceScore) || ts.recurrenceScore;
    if (topicData.subtopics !== undefined) ts.subtopics = topicData.subtopics;
    this.saveState();
    this.render();
  },

  deleteTopic(topicId) {
    const ts = this.state.topics[topicId];
    if (!ts) return;
    const cat = this.state.categories.find(c => c.name === ts.category);
    if (cat) cat.topics = cat.topics.filter(t => t.id !== topicId);
    delete this.state.topics[topicId];
    this.saveState();
    this.render();
  },

  addSubtopic(topicId, subtopicName) {
    if (!subtopicName || !subtopicName.trim()) return;
    const ts = this.state.topics[topicId];
    if (!ts) return;
    const cat = this.state.categories.find(c => c.name === ts.category);
    if (cat) {
      const t = cat.topics.find(t => t.id === topicId);
      if (t && !t.subtopics.includes(subtopicName.trim())) t.subtopics.push(subtopicName.trim());
    }
    if (!ts.subtopics) ts.subtopics = [];
    if (!ts.subtopics.includes(subtopicName.trim())) ts.subtopics.push(subtopicName.trim());
    this.saveState();
  },

  deleteSubtopic(topicId, subtopicName) {
    const ts = this.state.topics[topicId];
    if (!ts) return;
    const cat = this.state.categories.find(c => c.name === ts.category);
    if (cat) {
      const t = cat.topics.find(t => t.id === topicId);
      if (t) t.subtopics = t.subtopics.filter(s => s !== subtopicName);
    }
    ts.subtopics = (ts.subtopics || []).filter(s => s !== subtopicName);
    ts.studiedSubtopics = (ts.studiedSubtopics || []).filter(s => s !== subtopicName);
    this.saveState();
  },

  // ═══ EVENT BINDING ═══
  bindEvents() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      switch (action) {
        case 'tab': this.switchTab(btn.dataset.tab); break;
        case 'open-modal': this.openModal(btn.dataset.modal, btn.dataset.topic); break;
        case 'close-modal': this.closeModal(); break;
        case 'overlay-click': if (e.target.classList.contains('modal-overlay')) this.closeModal(); break;
        case 'log-questions': this.handleLogQuestions(btn); break;
        case 'crono-log-questions': this.handleCronoLogQuestions(btn); break;
        case 'set-difficulty': this.handleSetDifficulty(btn); break;
        case 'toggle-theme': this.toggleTheme(); break;
        case 'pomodoro-start': this.pomodoroStart(); break;
        case 'pomodoro-pause': this.pomodoroPause(); break;
        case 'pomodoro-reset': this.pomodoroReset(); break;
        case 'save-config': this.handleSaveConfig(btn); break;
        case 'reset':
          if (confirm('Tem certeza? Todo progresso será perdido.')) {
            this.state = this.getDefaultState(); this.saveState(); this.render();
          }
          break;
        case 'start-study': e.preventDefault(); document.querySelector('[data-tab="assuntos"]')?.click(); break;
        case 'toggle-category':
          { const header = btn.closest('.category-header');
            if (header) header.nextElementSibling.classList.toggle('collapsed'); }
          break;
        case 'toggle-subtopics':
          { const subEl = document.getElementById('sub-' + btn.dataset.topic);
            if (subEl) { const isOpen = subEl.style.display !== 'none'; subEl.style.display = isOpen ? 'none' : 'block'; } }
          break;
        case 'add-subtopic':
          { const input = document.getElementById('add-sub-' + btn.dataset.topic);
            if (input && input.value.trim()) { this.addSubtopic(btn.dataset.topic, input.value.trim()); input.value = ''; this.renderTopics(); } }
          break;
        case 'edit-subtopic':
          { const oldName = btn.dataset.subtopic;
            const newName = prompt('Editar subtópico:', oldName);
            if (newName && newName.trim() && newName.trim() !== oldName) {
              const ts3 = this.state.topics[btn.dataset.topic];
              if (ts3) {
                const cat3 = this.state.categories.find(c => c.name === ts3.category);
                if (cat3) { const t3 = cat3.topics.find(t => t.id === btn.dataset.topic); if (t3) { const idx = t3.subtopics.indexOf(oldName); if (idx !== -1) t3.subtopics[idx] = newName.trim(); } }
                const idx3 = (ts3.subtopics || []).indexOf(oldName); if (idx3 !== -1) ts3.subtopics[idx3] = newName.trim();
                const idx4 = (ts3.studiedSubtopics || []).indexOf(oldName); if (idx4 !== -1) ts3.studiedSubtopics[idx4] = newName.trim();
                this.saveState(); this.renderTopics();
              }
            } }
          break;
        case 'delete-subtopic':
          if (confirm(`Excluir subtópico "${btn.dataset.subtopic}"?`)) {
            this.deleteSubtopic(btn.dataset.topic, btn.dataset.subtopic);
            this.renderTopics();
          }
          break;
        case 'reset-topic':
          if (confirm('Tem certeza? Todo progresso neste tópico será perdido.')) {
            const resetId = btn.closest('.modal-overlay').dataset.topic;
            const resetTs = this.state.topics[resetId];
            if (resetTs) {
              resetTs.timeSpent = 0; resetTs.questionsAnswered = 0; resetTs.questionsCorrect = 0;
              resetTs.selfDifficulty = null; resetTs.lastStudied = null; resetTs.completed = false;
              resetTs.studiedSubtopics = []; this.saveState(); this.closeModal(); this.render();
            }
          }
          break;
        case 'trim-cronograma':
          { const removed = this.trimCronograma();
            if (removed.length > 0) {
              const names = removed.map(t => t.name).join(', ');
              alert(`✂️ ${removed.length} tópico(s) removido(s) do cronograma por baixa prioridade:\n\n${names}\n\nVocê pode restaurá-los depois.`);
            } else alert('✅ Todos os tópicos cabem no tempo disponível.');
            this.render(); }
          break;
        case 'restore-trimmed':
          this.state.config.trimmed = false; this.state.config.trimmedTopics = [];
          this.saveState(); this.render();
          break;
        case 'crono-nav':
          if (btn.disabled) break;
          this.currentWeek = (this.currentWeek || 0) + parseInt(btn.dataset.dir);
          this.renderCronograma();
          break;
        case 'crono-toggle-subs':
          { const subDiv = btn.closest('.crono-cell-topic').querySelector('.crono-sub-checks');
            if (subDiv) { const isOpen = subDiv.style.display !== 'none'; subDiv.style.display = isOpen ? 'none' : 'block';
              if (!this._openCronoSubs) this._openCronoSubs = new Set();
              const topicId = btn.dataset.topic;
              if (isOpen) this._openCronoSubs.delete(topicId); else this._openCronoSubs.add(topicId);
              const toggleSpan = btn.closest('.crono-cell-row').querySelector('.crono-cell-subs-toggle');
              if (toggleSpan) toggleSpan.textContent = isOpen ? `▾ ${(btn.closest('.crono-cell-topic').querySelectorAll('.crono-sub-check-item')).length}` : `▴ ${(btn.closest('.crono-cell-topic').querySelectorAll('.crono-sub-check-item')).length}`;
            } }
          break;
        case 'crono-topic-check':
          setTimeout(() => {
            const topicId = btn.dataset.topic;
            const ts = this.state.topics[topicId];
            if (!ts) return;
            const checked = btn.checked;
            const subs = ts.subtopics || [];
            if (!ts.studiedSubtopics) ts.studiedSubtopics = [];
            if (checked) {
              subs.forEach(s => { if (!ts.studiedSubtopics.includes(s)) ts.studiedSubtopics.push(s); });
              if (!ts.completed) { ts.completed = true; this.addXP(10, `Tópico concluído: ${ts.name}`); }
            } else {
              ts.studiedSubtopics = [];
              ts.completed = false;
            }
            this.checkAchievements();
            this.saveState();
            const topicEl = btn.closest('.crono-cell-topic');
            if (topicEl) {
              const subChecks = topicEl.querySelectorAll('.crono-sub-check-item input[type="checkbox"]');
              subChecks.forEach(cb => { cb.checked = checked; });
            }
            if (!this._openCronoSubs) this._openCronoSubs = new Set();
            this._openCronoSubs.add(topicId);
            this.renderCronograma();
          }, 0);
          break;
        case 'crono-sub-check':
          setTimeout(() => {
            const topicId = btn.dataset.topic;
            const subName = btn.dataset.subtopic;
            const ts = this.state.topics[topicId];
            if (!ts) return;
            if (!ts.studiedSubtopics) ts.studiedSubtopics = [];
            const idx = ts.studiedSubtopics.indexOf(subName);
            if (btn.checked) { if (idx === -1) ts.studiedSubtopics.push(subName); this.addXP(3, 'Subtópico concluído'); }
            else { if (idx !== -1) ts.studiedSubtopics.splice(idx, 1); }
            const subs = ts.subtopics || [];
            const allDone = subs.length > 0 && subs.every(s => ts.studiedSubtopics.includes(s));
            const wasCompleted = ts.completed;
            ts.completed = allDone;
            if (allDone && !wasCompleted) this.addXP(10, `Tópico concluído: ${ts.name}`);
            const topicEl = btn.closest('.crono-cell-topic');
            if (topicEl) {
              const topicCheck = topicEl.querySelector('[data-action="crono-topic-check"]');
              if (topicCheck) topicCheck.checked = allDone;
            }
            if (!this._openCronoSubs) this._openCronoSubs = new Set();
            this._openCronoSubs.add(topicId);
            this.checkAchievements();
            this.saveState();
            this.renderCronograma();
          }, 0);
          break;
        case 'add-category':
          this.openModal('category-modal');
          break;
        case 'edit-category':
          this.openModal('category-modal', btn.dataset.category);
          break;
        case 'delete-category':
          if (confirm(`Tem certeza que deseja excluir a matéria "${btn.dataset.category}" e todos os seus tópicos?`)) {
            this.deleteCategory(btn.dataset.category);
          }
          break;
        case 'set-topic-importance':
          { const ts = this.state.topics[btn.dataset.topic];
            if (ts) { ts.importance = parseInt(btn.value); this.saveState(); } }
          break;
        case 'save-category':
          { const catName = document.getElementById('category-name').value.trim();
            const catIcon = document.getElementById('category-icon').value.trim() || '📚';
            const editName = btn.dataset.edit;
            if (editName) this.editCategory(editName, catName, catIcon);
            else if (catName) this.addCategory(catName, catIcon);
            this.closeModal(); }
          break;
        case 'add-topic':
          this.openModal('topic-modal', btn.dataset.category);
          break;
        case 'edit-topic':
          this.openModal('topic-modal-edit', btn.dataset.topic);
          break;
        case 'delete-topic':
          if (confirm('Tem certeza que deseja excluir este tópico?')) {
            this.deleteTopic(btn.dataset.topic);
          }
          break;
        case 'save-topic':
          { const editTopicId = btn.dataset.edit;
            let data, catForTopic;
            if (editTopicId) {
              data = {
                name: document.getElementById('topic-edit-name').value.trim(),
                estHours: document.getElementById('topic-edit-est-hours').value,
                weight: document.getElementById('topic-edit-weight').value,
                recurrenceScore: document.getElementById('topic-edit-recurrence').value,
                subtopics: document.getElementById('topic-edit-subtopics').value.split('\n').map(s => s.trim()).filter(Boolean)
              };
              this.editTopic(editTopicId, data);
            } else {
              catForTopic = btn.dataset.category || document.getElementById('topic-category').value;
              data = {
                name: document.getElementById('topic-name').value.trim(),
                estHours: document.getElementById('topic-est-hours').value,
                weight: document.getElementById('topic-weight').value,
                recurrenceScore: document.getElementById('topic-recurrence').value,
                subtopics: document.getElementById('topic-subtopics').value.split('\n').map(s => s.trim()).filter(Boolean)
              };
              if (catForTopic && data.name) this.addTopic(catForTopic, data);
            }
            this.closeModal(); }
          break;
      }
    });

    document.addEventListener('input', e => {
      const el = e.target;
      if (el.dataset.action === 'pomodoro-set-work') {
        this.state.pomodoro.workMin = parseInt(el.value) || 25;
        this.saveState();
        if (!this._pomodoroRunning && this._pomodoroTimeLeft <= 0) this.renderDashboard();
      } else if (el.dataset.action === 'pomodoro-set-break') {
        this.state.pomodoro.breakMin = parseInt(el.value) || 5;
        this.saveState();
      }
    });

    document.addEventListener('submit', e => {
      if (e.target.id === 'viability-form') { e.preventDefault(); this.handleViability(); }
    });
  },

  switchTab(tabId) {
    document.querySelectorAll('.tabs-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));
    const content = document.getElementById(`tab-${tabId}`);
    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    if (content) content.classList.add('active');
    if (btn) btn.classList.add('active');
    this.renderTabContent(tabId);
  },

  renderTabContent(tabId) {
    if (tabId === 'dashboard') this.renderDashboard();
    else if (tabId === 'assuntos') this.renderTopics();
    else if (tabId === 'cronograma') this.renderCronograma();
    else if (tabId === 'conquistas') this.renderAchievements();
  },

  openModal(modalId, topicId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    if (modalId === 'config-modal') {
      const cfg = this.getConfig();
      const dateInput = document.getElementById('exam-date');
      const hoursInput = document.getElementById('exam-hours');
      const dayCbs = document.querySelectorAll('.exam-day');
      if (dateInput) dateInput.value = cfg.examDate || '';
      if (hoursInput) hoursInput.value = cfg.dailyHours || '';
      const studyDays = cfg.studyDays || [1, 2, 3, 4, 5];
      dayCbs.forEach(cb => { cb.checked = studyDays.includes(parseInt(cb.value)); });
      return;
    }
    if (modalId === 'crono-subtopic-modal' && topicId) {
      modal.dataset.topic = topicId;
      const ts = this.state.topics[topicId];
      document.getElementById('crono-subtopic-name').textContent = ts.name;
      const catObj = this.state.categories.find(c => c.name === ts.category);
      document.getElementById('crono-subtopic-category').textContent = `${catObj ? catObj.icon : '📚'} ${ts.category}`;
      const subs = this.getSubtopicNames(topicId);
      const list = document.getElementById('crono-subtopic-list');
      if (subs.length === 0) {
        list.innerHTML = '<p style="color:var(--text3)">Este tópico não possui subtópicos detalhados.</p>';
      } else {
        list.innerHTML = `<ul class="subtopic-list">${subs.map(s => `<li><span>${s}</span></li>`).join('')}</ul>`;
      }
      const acc = this.calcAccuracy(topicId);
      document.getElementById('crono-subtopic-elo').innerHTML = '';
      const qPrev = document.getElementById('crono-subtopic-questions-preview');
      if (ts.questionsAnswered > 0) qPrev.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Questões: ${ts.questionsAnswered} | Acertos: ${ts.questionsCorrect} (${(acc || 0).toFixed(1)}%)</span>`;
      else qPrev.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Nenhuma questão registrada.</span>`;
      document.getElementById('crono-subtopic-fluency-alert').innerHTML = '';
      const diffBtns = modal.querySelectorAll('.difficulty-btn');
      diffBtns.forEach(b => b.classList.remove('selected'));
      if (ts.selfDifficulty) { const sel = modal.querySelector(`.difficulty-btn.${ts.selfDifficulty}`); if (sel) sel.classList.add('selected'); }
      const qCorrect = document.getElementById('crono-q-correct');
      const qTotal = document.getElementById('crono-q-total');
      if (qCorrect) qCorrect.value = '';
      if (qTotal) qTotal.value = '';
      return;
    }
    if (topicId) {
      modal.dataset.topic = topicId;
      const ts = this.state.topics[topicId];
      document.getElementById('modal-topic-name').textContent = ts.name;
      document.getElementById('modal-topic-category').textContent = `${(this.state.categories.find(c => c.name === ts.category) || {}).icon || '📚'} ${ts.category}`;
      const diffBtns = modal.querySelectorAll('.difficulty-btn');
      diffBtns.forEach(b => b.classList.remove('selected'));
      if (ts.selfDifficulty) { const sel = modal.querySelector(`.difficulty-btn.${ts.selfDifficulty}`); if (sel) sel.classList.add('selected'); }
      document.getElementById('q-correct').value = '';
      document.getElementById('q-total').value = '';
      document.getElementById('modal-current-elo').innerHTML = '';
      this.renderFluencyAlert(topicId);
      this.updateQuestionsPreview(topicId);
      return;
    }
    if (modalId === 'category-modal') {
      const editName = topicId;
      const nameInput = document.getElementById('category-name');
      const iconInput = document.getElementById('category-icon');
      const saveBtn = modal.querySelector('[data-action="save-category"]');
      if (editName) {
        const cat = this.state.categories.find(c => c.name === editName);
        if (nameInput) nameInput.value = cat ? cat.name : '';
        if (iconInput) iconInput.value = cat ? cat.icon : '';
        if (saveBtn) saveBtn.dataset.edit = editName;
        modal.querySelector('h2').textContent = 'Editar Matéria';
      } else {
        if (nameInput) nameInput.value = '';
        if (iconInput) iconInput.value = '';
        if (saveBtn) { delete saveBtn.dataset.edit; }
        modal.querySelector('h2').textContent = 'Nova Matéria';
      }
      return;
    }
    if (modalId === 'topic-modal') {
      const categoryName = topicId;
      const catSelect = document.getElementById('topic-category');
      if (catSelect) {
        catSelect.innerHTML = this.state.categories.map(c => `<option value="${c.name}" ${c.name === categoryName ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('');
      }
      document.getElementById('topic-name').value = '';
      document.getElementById('topic-est-hours').value = '2';
      document.getElementById('topic-weight').value = '5';
      document.getElementById('topic-recurrence').value = '50';
      document.getElementById('topic-subtopics').value = '';
      const saveBtn = modal.querySelector('[data-action="save-topic"]');
      if (saveBtn) { delete saveBtn.dataset.edit; delete saveBtn.dataset.category; }
      modal.querySelector('h2').textContent = 'Novo Tópico';
      return;
    }
    if (modalId === 'topic-modal-edit') {
      const topicIdEdit = topicId;
      const ts = this.state.topics[topicIdEdit];
      if (!ts) return;
      document.getElementById('topic-edit-name').value = ts.name || '';
      document.getElementById('topic-edit-est-hours').value = ts.estHours || 2;
      document.getElementById('topic-edit-weight').value = ts.weight || 5;
      document.getElementById('topic-edit-recurrence').value = ts.recurrenceScore || 50;
      document.getElementById('topic-edit-subtopics').value = (ts.subtopics || []).join('\n');
      const saveBtn = modal.querySelector('[data-action="save-topic"]');
      if (saveBtn) saveBtn.dataset.edit = topicIdEdit;
      modal.dataset.topic = topicIdEdit;
      return;
    }
  },

  closeModal() { document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('open')); },

  renderFluencyAlertFor(containerId, topicId) {
    const container = document.getElementById(containerId);
    const ts = this.state.topics[topicId];
    if (!container || !ts) return;
    if (ts.selfDifficulty === 'easy' && ts.questionsAnswered >= 3) {
      const acc = (ts.questionsCorrect / ts.questionsAnswered) * 100;
      if (acc < 60) { container.innerHTML = `<div class="fluency-alert danger">⚠️ Ilusão de Fluência! Você marcou como <strong>Fácil</strong> mas sua taxa de acerto é <strong>${acc.toFixed(1)}%</strong>. Reveja!</div>`; return; }
    }
    if (ts.selfDifficulty) container.innerHTML = `<div class="fluency-alert success">✅ Autoavaliação: <strong>${ts.selfDifficulty === 'easy' ? 'Fácil' : ts.selfDifficulty === 'medium' ? 'Médio' : 'Difícil'}</strong></div>`;
    else container.innerHTML = '';
  },

  renderFluencyAlert(topicId) {
    const container = document.getElementById('fluency-alert');
    const ts = this.state.topics[topicId];
    if (!container || !ts) return;
    if (ts.selfDifficulty === 'easy' && ts.questionsAnswered >= 3) {
      const acc = (ts.questionsCorrect / ts.questionsAnswered) * 100;
      if (acc < 60) { container.innerHTML = `<div class="fluency-alert danger">⚠️ Ilusão de Fluência! Você marcou como <strong>Fácil</strong> mas sua taxa de acerto é <strong>${acc.toFixed(1)}%</strong>. Reveja!</div>`; return; }
    }
    if (ts.selfDifficulty) container.innerHTML = `<div class="fluency-alert success">✅ Autoavaliação: <strong>${ts.selfDifficulty === 'easy' ? 'Fácil' : ts.selfDifficulty === 'medium' ? 'Médio' : 'Difícil'}</strong></div>`;
    else container.innerHTML = '';
  },

  initTheme() {
    localStorage.removeItem('estudoAppENEM-theme');
    const saved = localStorage.getItem('estudoAppENEM-v2-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const btn = document.querySelector('.theme-toggle');
      if (btn) btn.textContent = '☀️';
    }
  },

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) { html.removeAttribute('data-theme'); localStorage.setItem('estudoAppENEM-v2-theme', 'light'); }
    else { html.setAttribute('data-theme', 'dark'); localStorage.setItem('estudoAppENEM-v2-theme', 'dark'); }
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = isDark ? '🌙' : '☀️';
  },

  updateQuestionsPreview(topicId) {
    const ts = this.state.topics[topicId];
    const el = document.getElementById('questions-preview');
    if (!el) return;
    if (ts.questionsAnswered > 0) {
      const acc = (ts.questionsCorrect / ts.questionsAnswered) * 100;
      el.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Questões: ${ts.questionsAnswered} | Acertos: ${ts.questionsCorrect} (${acc.toFixed(1)}%)</span>`;
    } else el.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Nenhuma questão registrada.</span>`;
  },

  handleLogQuestions(btn) {
    const modal = btn.closest('.modal-overlay');
    const topicId = modal.dataset.topic;
    const correct = parseInt(document.getElementById('q-correct').value) || 0;
    const total = parseInt(document.getElementById('q-total').value) || 0;
    if (total <= 0 || correct < 0 || correct > total) return;
    this.logQuestions(topicId, correct, total);
    this.updateStudyUI(topicId);
  },

  handleCronoLogQuestions(btn) {
    const modal = btn.closest('.modal-overlay');
    const topicId = modal.dataset.topic;
    const correct = parseInt(document.getElementById('crono-q-correct').value) || 0;
    const total = parseInt(document.getElementById('crono-q-total').value) || 0;
    if (total <= 0 || correct < 0 || correct > total) return;
    this.logQuestions(topicId, correct, total);
    this.updateCronoStudyUI(topicId);
  },

  updateCronoStudyUI(topicId) {
    const ts = this.state.topics[topicId];
    const modal = document.getElementById('crono-subtopic-modal');
    if (modal && modal.classList.contains('open')) {
      const acc = this.calcAccuracy(topicId);
      document.getElementById('crono-subtopic-elo').innerHTML = '';
      const qPrev = document.getElementById('crono-subtopic-questions-preview');
      if (ts.questionsAnswered > 0) qPrev.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Questões: ${ts.questionsAnswered} | Acertos: ${ts.questionsCorrect} (${(acc || 0).toFixed(1)}%)</span>`;
      else qPrev.innerHTML = `<span style="font-size:0.85rem;color:var(--text3)">Nenhuma questão registrada.</span>`;
      document.getElementById('crono-subtopic-fluency-alert').innerHTML = '';
    }
    this.render();
  },

  handleSetDifficulty(btn) {
    const modal = btn.closest('.modal-overlay');
    const topicId = modal.dataset.topic;
    const difficulty = btn.dataset.value;
    modal.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const ts = this.state.topics[topicId];
    ts.selfDifficulty = difficulty;
    this.saveState();
    if (modal.id === 'study-modal') this.renderFluencyAlert(topicId);
    else this.renderFluencyAlertFor('crono-subtopic-fluency-alert', topicId);
  },

  updateStudyUI(topicId) {
    const modal = document.querySelector('.modal-overlay.open');
    if (modal) {
      document.getElementById('modal-current-elo').innerHTML = '';
      this.renderFluencyAlert(topicId);
      this.updateQuestionsPreview(topicId);
    }
    this.render();
  },

  handleSaveConfig(btn) {
    const date = document.getElementById('exam-date').value;
    const hours = parseFloat(document.getElementById('exam-hours').value) || 0;
    const dayCbs = document.querySelectorAll('.exam-day:checked');
    this.state.config.examDate = date || null;
    this.state.config.dailyHours = hours;
    this.state.config.studyDays = Array.from(dayCbs).map(cb => parseInt(cb.value)).sort();
    this.addXP(20, 'Configuração salva');
    this.saveState();
    this.closeModal();
    this.render();
  },

  handleViability() {
    const result = this.calcViability();
    const container = document.getElementById('viability-result');
    if (!result) { container.innerHTML = `<div class="viability-result" style="background:var(--surface);color:var(--text3)">Configure a data da prova e horas diárias.</div>`; return; }
    const cfg = this.getConfig();
    if (result.feasible) {
      container.innerHTML = `<div class="viability-result ok">✅ <span class="highlight">Viável!</span> Faltam ${result.daysRemaining} dias.<br>⏱ Precisa de <strong>${result.remainingHours}h</strong> e tem <strong>${result.availableHours}h</strong> (${cfg.dailyHours}h/dia, ${(cfg.studyDays || [1,2,3,4,5]).length} dias/semana).<br>📊 Estude ${Math.round(result.remainingHours / result.daysRemaining)}h/dia.</div>`;
    } else {
      let cutsHtml = '';
      if (result.cuts.length > 0) {
        cutsHtml = `<div class="cut-suggestion"><strong>✂️ Sugestão de corte:</strong> Foque nos assuntos de maior peso (${result.cuts.length} tópicos para deixar de lado):<br>`;
        result.cuts.slice(0, 10).forEach(c => { cutsHtml += `<span class="topic-rec">${c.name}</span> (peso ${c.weight}), `; });
        cutsHtml = cutsHtml.slice(0, -2) + '</div>';
      }
      container.innerHTML = `<div class="viability-result not-ok">❌ <span class="highlight">Inviável no prazo!</span> Faltam ${result.daysRemaining} dias.<br>⏱ Necessário: <strong>${result.remainingHours}h</strong> | Disponível: <strong>${result.availableHours}h</strong> (${cfg.dailyHours}h/dia)<br>📈 Déficit de <strong>${result.deficit}h</strong>. Aumente para ${Math.ceil(result.remainingHours / result.daysRemaining)}h/dia.</div>${cutsHtml}<div style="margin-top:12px;text-align:center"><button class="btn btn-primary" data-action="trim-cronograma">🔧 Ajustar cronograma automaticamente</button></div>`;
    }
  },

  calculateTopicImportance(topicId) {
    const ts = this.state.topics[topicId];
    if (!ts) return 0;
    return (ts.weight || 0) * (ts.recurrenceScore || 0);
  },

  trimCronograma() {
    const cfg = this.getConfig();
    if (!cfg.examDate || !cfg.dailyHours) return [];
    const examDate = new Date(cfg.examDate);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    const studyDaysArr = cfg.studyDays || [1, 2, 3, 4, 5];
    let studyDays = 0;
    const cursor = new Date(today);
    for (let i = 0; i < daysUntilExam; i++) { if (studyDaysArr.includes(cursor.getDay())) studyDays++; cursor.setDate(cursor.getDate() + 1); }
    const totalAvailableHours = cfg.dailyHours * studyDays;
    const allTopics = [];
    for (const cat of this.state.categories) {
      for (const t of cat.topics) {
        const ts = this.state.topics[t.id];
        const remaining = Math.max(0, (t.estHours || 0) - (ts.timeSpent || 0));
        allTopics.push({ id: t.id, name: t.name, category: cat.name, estHours: t.estHours, remainingHours: remaining, weight: t.weight || 0, recurrenceScore: t.recurrenceScore || 0, importance: this.calculateTopicImportance(t.id) });
      }
    }
    const totalNeededHours = allTopics.reduce((s, t) => s + t.remainingHours, 0);
    if (totalNeededHours <= totalAvailableHours) { this.state.config.trimmed = false; this.state.config.trimmedTopics = []; this.saveState(); return []; }
    const sorted = [...allTopics].sort((a, b) => a.importance - b.importance);
    let currentTotal = totalNeededHours;
    const removed = [];
    for (const topic of sorted) {
      if (currentTotal <= totalAvailableHours) break;
      if (topic.remainingHours <= 0) continue;
      currentTotal -= topic.remainingHours;
      removed.push(topic);
    }
    this.state.config.trimmed = true;
    this.state.config.trimmedTopics = removed.map(t => t.id);
    this.saveState();
    return removed;
  },

  generateCronograma() {
    const cfg = this.getConfig();
    if (!cfg.examDate || !cfg.dailyHours) return [];
    const dailyHours = cfg.dailyHours;
    const dpw = (cfg.studyDays || [1,2,3,4,5]).length;
    const numSubjects = this.state.categories.length;
    const trimmedSet = new Set(cfg.trimmedTopics || []);
    const queues = this.state.categories.map(cat => {
      const order = CATEGORY_STUDY_ORDER[cat.name] || [];
      const sorted = [...cat.topics].sort((a, b) => { const ai = order.indexOf(a.id); const bi = order.indexOf(b.id); return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi); });
      const items = sorted.map(t => {
        const ts = this.state.topics[t.id];
        const remaining = Math.max(0, (t.estHours || 0) - (ts.timeSpent || 0));
        return { id: t.id, name: t.name, category: cat.name, categoryIcon: cat.icon, estHours: t.estHours, recurrenceScore: t.recurrenceScore, remainingHours: remaining, subtopics: t.subtopics || [], timeSpent: ts.timeSpent || 0, questionsAnswered: ts.questionsAnswered || 0, questionsCorrect: ts.questionsCorrect || 0, selfDifficulty: ts.selfDifficulty || null, lastStudied: ts.lastStudied || null, completed: ts.completed || false, studiedSubtopics: ts.studiedSubtopics || [] };
      }).filter(t => !trimmedSet.has(t.id));
      return { name: cat.name, icon: cat.icon, items, pointer: 0 };
    });
    if (queues.every(q => q.pointer >= q.items.length)) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const weeks = [];
    for (let weekIdx = 0; weekIdx < 104; weekIdx++) {
      if (queues.every(q => q.pointer >= q.items.length)) break;
      const weekStart = new Date(today); weekStart.setDate(today.getDate() + weekIdx * 7 + 1);
      const weeklyCap = dailyHours * dpw;
      const pool = []; let poolHours = 0;
      let changed = true;
      while (changed && poolHours < weeklyCap - 0.25) {
        changed = false;
        for (let si = 0; si < numSubjects; si++) {
          const q = queues[si];
          if (q.pointer < q.items.length) {
            const t = q.items[q.pointer];
            if (poolHours + t.remainingHours <= weeklyCap + 0.1) { pool.push(t); poolHours += t.remainingHours; q.pointer++; changed = true; }
          }
        }
      }
      if (pool.length === 0) {
        for (let si = 0; si < numSubjects; si++) {
          const q = queues[si];
          if (q.pointer < q.items.length) { pool.push(q.items[q.pointer]); poolHours += q.items[q.pointer].remainingHours; q.pointer++; break; }
        }
      }
      const studyDaysArr = cfg.studyDays || [1, 2, 3, 4, 5];
      const days = [];
      const weekDate = new Date(weekStart);
      for (let d = 0; d < 7; d++) {
        const dayDate = new Date(weekDate); dayDate.setDate(weekDate.getDate() + d);
        if (studyDaysArr.includes(dayDate.getDay())) days.push({ dayOfWeek: dayDate.getDay(), date: dayDate, topics: [], hoursUsed: 0 });
      }
      const unassigned = [...pool];
      for (let dayIdx = 0; dayIdx < days.length && unassigned.length > 0; dayIdx++) {
        const day = days[dayIdx]; let dayRemaining = dailyHours; let i = 0;
        while (i < unassigned.length && dayRemaining > 0.25) {
          if (unassigned[i].remainingHours <= dayRemaining + 0.1) { day.topics.push(unassigned[i]); dayRemaining -= unassigned[i].remainingHours; day.hoursUsed = Math.round((dailyHours - dayRemaining) * 10) / 10; unassigned.splice(i, 1); }
          else i++;
        }
      }
      unassigned.forEach(t => {
        let bestDay = 0, minLoad = Infinity;
        for (let i = 0; i < days.length; i++) { if (days[i].hoursUsed < minLoad) { minLoad = days[i].hoursUsed; bestDay = i; } }
        days[bestDay].topics.push(t);
        days[bestDay].hoursUsed = Math.round((days[bestDay].hoursUsed + t.remainingHours) * 10) / 10;
      });
      weeks.push({ week: weekIdx + 1, startDate: weekStart, days });
    }
    return weeks;
  },

  renderHeader() {
    const streak = this.getStreak();
    const stats = this.getExamStats();
    const level = this.getLevel();
    document.getElementById('streak-count').textContent = streak;
    document.getElementById('streak-display').style.display = streak > 0 ? 'inline-flex' : 'none';
    document.getElementById('header-accuracy').textContent = stats.accuracy !== null ? stats.accuracy.toFixed(1) + '%' : '—';
    document.getElementById('header-topics').textContent = `${stats.completed}/${stats.totalTopics}`;
    document.getElementById('header-xp').textContent = `${this.state.xp || 0} XP`;
  },

  renderZonaRisco() {
    const container = document.getElementById('zona-risco-bar');
    const items = this.getZonaRisco();
    if (items.length === 0) { container.style.display = 'none'; return; }
    container.style.display = 'flex';
    container.innerHTML = `<span class="label" style="font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.5px;color:var(--text3)">🚨 Zona de Risco (${items.length})</span>${items.slice(0, 8).map(t => `<span class="zona-risco-item" onclick="App.openModal('study-modal','${t.id}')">${t.name} (${t.daysSinceStudy}d)</span>`).join('')}${items.length > 8 ? `<span class="zona-risco-item">+${items.length - 8} mais</span>` : ''}`;
  },

  renderDashboard() {
    const container = document.getElementById('tab-dashboard');
    if (!container.classList.contains('active')) return;
    if (this.charts['cats']) { this.charts['cats'].destroy(); this.charts['cats'] = null; }
    if (this.charts['rec']) { this.charts['rec'].destroy(); this.charts['rec'] = null; }
    const stats = this.getExamStats();
    const progress = this.getOverallProgress();
    const cats = this.calcCategoryStats();
    const cfg = this.getConfig();
    const xpLevel = this.getLevel();

    let html = `
      <div class="xp-bar-container">
        <div class="xp-info">
          <div class="xp-level">
            <div class="level-badge" style="background:linear-gradient(135deg, ${xpLevel.color}, ${xpLevel.color}88)">${xpLevel.icon}</div>
            <div class="level-text">
              <span class="level-name" style="color:${xpLevel.color}">Nível ${xpLevel.level} — ${xpLevel.name}</span>
              <span class="level-subtitle">${xpLevel.xpInLevel} / ${xpLevel.xpForNext} XP</span>
            </div>
          </div>
          <div class="xp-numbers">
            <span class="xp-current">${this.state.xp || 0} XP</span>
            <span class="xp-needed">${xpLevel.nextLevel ? `Próximo: ${xpLevel.nextLevel.name}` : 'Nível máximo!'}</span>
          </div>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${xpLevel.progress}%"></div></div>
      </div>

      <div class="dashboard-welcome">
        <div>
          <h1 style="margin:0;font-family:var(--font-display);font-size:2rem;font-weight:800;color:var(--accent)">📊 Painel de Metacognição</h1>
          <p style="margin:4px 0 0;color:var(--text3)">Acompanhe seu progresso, viabilidade e recorrência de estudos.</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card"><div class="stat-value">${progress.toFixed(0)}%</div><div class="stat-label">📚 Progresso</div></div>
        <div class="stat-card"><div class="stat-value">${stats.accuracy !== null ? stats.accuracy.toFixed(1) + '%' : '—'}</div><div class="stat-label">🎯 Precisão</div></div>
        <div class="stat-card"><div class="stat-value">${stats.totalQ}</div><div class="stat-label">📝 Questões</div></div>
        <div class="stat-card"><div class="stat-value">${this.state.pomodoro ? this.state.pomodoro.totalMinutes : 0}min</div><div class="stat-label">🍅 Pomodoro</div></div>
      </div>

      <div class="chart-container" style="margin-bottom:20px">
        <h3>🍅 Pomodoro</h3>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="font-size:3rem;font-family:var(--font-display);font-weight:700;color:var(--text);min-width:140px;text-align:center;letter-spacing:2px" id="pomodoro-display">${this._pomodoroTimeLeft > 0 ? this.pomodoroFormat(this._pomodoroTimeLeft) : this.pomodoroFormat((this.state.pomodoro.workMin || 25) * 60)}</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;gap:8px">
              ${this._pomodoroRunning ? `<button class="btn btn-warning" data-action="pomodoro-pause">⏸ Pausar</button>` : `<button class="btn btn-primary" data-action="pomodoro-start">▶ Iniciar</button>`}
              <button class="btn btn-outline" data-action="pomodoro-reset">↺ Resetar</button>
            </div>
            <div style="font-size:0.82rem;color:var(--text3)">${this._pomodoroIsBreak ? '☕ Pausa' : '📚 Estudando'} • Sessões: ${this.state.pomodoro.sessions || 0} • Total: ${this.state.pomodoro.totalMinutes || 0}min</div>
            <div style="display:flex;gap:8px;align-items:center;font-size:0.8rem;color:var(--text3)">
              <label>Trabalho:</label>
              <input type="number" id="pomodoro-work" value="${this.state.pomodoro.workMin || 25}" min="1" max="120" style="width:50px;padding:4px 6px;border:1px solid var(--border);border-radius:6px;font-size:0.8rem;background:var(--surface);color:var(--text)" data-action="pomodoro-set-work">min
              <label style="margin-left:8px">Pausa:</label>
              <input type="number" id="pomodoro-break" value="${this.state.pomodoro.breakMin || 5}" min="1" max="30" style="width:50px;padding:4px 6px;border:1px solid var(--border);border-radius:6px;font-size:0.8rem;background:var(--surface);color:var(--text)" data-action="pomodoro-set-break">min
            </div>
          </div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-container"><h3>📈 Progresso por Matéria</h3><div class="chart-wrapper"><canvas id="chart-cats"></canvas></div></div>
        <div class="chart-container"><h3>📊 Recorrência</h3><div class="rec-cat-btns" id="rec-btns"></div><div class="chart-wrapper"><canvas id="chart-rec"></canvas></div></div>
      </div>

      <div class="chart-row">
        <div class="chart-container">
          <h3>⚠️ Ilusão de Fluência</h3>
          <div id="fluency-alerts">${this.renderFluencyTable()}</div>
          <p style="font-size:0.78rem;color:var(--text3);margin-top:8px;padding:8px;background:var(--surface);border-radius:var(--radius-sm)">
            💡 <strong>Ilusão de Fluência</strong>: marca como "Fácil" mas acerto &lt; 60% com 3+ questões.
          </p>
        </div>
      </div>
    `;
    container.innerHTML = html;
    setTimeout(() => { this.buildCategoryChart(); this.buildRecurrenceChart(); }, 50);
  },

  renderFluencyTable() {
    const alerts = this.getFluencyAlerts();
    if (alerts.length === 0) return '<p style="color:var(--text3);font-size:0.85rem">✅ Nenhum alerta.</p>';
    return alerts.map(a => `<div class="fluency-alert danger" style="cursor:pointer" onclick="App.openModal('study-modal','${a.topicId}')">⚠️ <strong>${a.name}</strong> (${a.category}) — Acerto: ${a.accuracy.toFixed(1)}%</div>`).join('');
  },

  buildCategoryChart() {
    const canvas = document.getElementById('chart-cats');
    if (!canvas) return;
    const cats = this.calcCategoryStats();
    if (this.charts['cats']) {
      this.charts['cats'].data.labels = cats.map(c => c.name);
      this.charts['cats'].data.datasets[0].data = cats.map(c => c.progress.toFixed(1));
      this.charts['cats'].data.datasets[0].backgroundColor = cats.map(c => c.progress > 75 ? '#00e5a0' : c.progress > 50 ? '#7c5cfc' : c.progress > 25 ? '#ffc857' : '#ff4d6a');
      this.charts['cats'].update('none');
      return;
    }
    this.charts['cats'] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: cats.map(c => c.name),
        datasets: [{ label: '% Concluído', data: cats.map(c => c.progress.toFixed(1)), backgroundColor: cats.map(c => c.progress > 75 ? '#00e5a0' : c.progress > 50 ? '#7c5cfc' : c.progress > 25 ? '#ffc857' : '#ff4d6a'), borderRadius: 8, borderSkipped: false }]
      },
      options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9ea4c1' } }, x: { grid: { display: false }, ticks: { color: '#9ea4c1' } } } }
    });
  },

  buildRecurrenceChart() {
    const container = document.getElementById('rec-btns');
    const canvas = document.getElementById('chart-rec');
    if (!container || !canvas) return;
    const cats = this.state.categories;
    const selectedCat = cats[0].name;
    container.innerHTML = cats.map(c => `<span class="rec-cat-btn ${c.name === selectedCat ? 'active' : ''}" data-category="${c.name}">${c.icon} ${c.name}</span>`).join('');
    this._renderRecChart(selectedCat);
    container.querySelectorAll('.rec-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => { container.querySelectorAll('.rec-cat-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); this._renderRecChart(btn.dataset.category); });
    });
  },

  _renderRecChart(category) {
    const canvas = document.getElementById('chart-rec');
    if (!canvas) return;
    const data = this.getRecurrenceData(category);
    const colors = data.map(d => { if (d.score >= 80) return '#ff3cac'; if (d.score >= 60) return '#ffc857'; if (d.score >= 40) return '#7c5cfc'; if (d.score >= 20) return '#A8A8A8'; return '#8B7355'; });
    if (this.charts['rec']) {
      this.charts['rec'].data.labels = data.map(d => d.icon + ' ' + d.name);
      this.charts['rec'].data.datasets[0].data = data.map(d => d.score);
      this.charts['rec'].data.datasets[0].backgroundColor = colors;
      this.charts['rec'].update('none');
      return;
    }
    this.charts['rec'] = new Chart(canvas, {
      type: 'bar',
      data: { labels: data.map(d => d.icon + ' ' + d.name), datasets: [{ label: 'Importância', data: data.map(d => d.score), backgroundColor: colors, borderRadius: 4 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.raw}/100` } } }, scales: { x: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9ea4c1' } }, y: { grid: { display: false }, ticks: { color: '#9ea4c1', font: { size: 9 } } } } }
    });
  },

  renderTopics() {
    const container = document.getElementById('tab-assuntos');
    if (!container.classList.contains('active')) return;
    const cats = this.calcCategoryStats();
    const overallPct = this.getOverallProgress();
    const stats = this.getExamStats();
    let html = `
      <div class="dashboard-welcome"><h1>${EXAM_DATA.icon} ${EXAM_DATA.name}</h1><p>${stats.totalTopics} tópicos • ${stats.completed} concluídos • ${stats.studied} estudados</p></div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-value">${overallPct.toFixed(0)}%</div><div class="stat-label">📊 Cobertura</div></div>
        <div class="stat-card"><div class="stat-value">${stats.accuracy !== null ? stats.accuracy.toFixed(1) + '%' : '—'}</div><div class="stat-label">🎯 Precisão</div></div>
        <div class="stat-card"><div class="stat-value">${stats.totalQ}</div><div class="stat-label">📝 Questões</div></div>
        <div class="stat-card"><div class="stat-value">${Math.round(stats.spentHours)}h</div><div class="stat-label">⏱ Horas</div></div>
      </div>
      <div class="top-bar" style="display:flex;align-items:center;gap:16px;margin:16px 0;flex-wrap:wrap">
        <button class="btn btn-primary" data-action="add-category">➕ Nova Matéria</button>
      </div>
      <div style="margin:16px 0"><div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:0.85rem;font-weight:600"><span>Progresso Geral</span><span>${overallPct.toFixed(0)}%</span></div><div class="progress-bar" style="height:10px"><div class="progress-fill ${overallPct >= 80 ? 'success' : overallPct >= 40 ? '' : 'warning'}" style="width:${overallPct}%"></div></div></div>
    `;
    cats.forEach(cat => {
      const catTopics = this.state.categories.find(c => c.name === cat.name).topics;
      const catProgress = cat.totalEstHours > 0 ? (cat.completedEstHours / cat.totalEstHours) * 100 : 0;
      html += `<div class="category-section"><div class="category-header" data-action="toggle-category"><h3>${cat.icon} ${cat.name}</h3><div class="cat-stats"><span>${cat.completedTopics}/${cat.totalTopics}</span><div style="width:80px"><div class="progress-bar"><div class="progress-fill" style="width:${catProgress}%"></div></div></div><button class="btn btn-outline btn-sm" data-action="add-topic" data-category="${cat.name}" title="Adicionar tópico">➕</button><button class="btn btn-outline btn-sm" data-action="edit-category" data-category="${cat.name}" title="Editar matéria">✏️</button><button class="btn btn-outline btn-sm" data-action="delete-category" data-category="${cat.name}" title="Excluir matéria" style="color:var(--danger)">🗑</button><span class="cat-toggle">▼</span></div></div><div class="category-body collapsed">`;
      catTopics.forEach(t => {
        const ts = this.state.topics[t.id];
        const topicProgress = ts.estHours > 0 ? Math.min(100, ((ts.timeSpent || 0) / ts.estHours) * 100) : 0;
        const subs = t.subtopics || [];
        const imp = t.importance !== undefined ? t.importance : 3;
        const subHtml = subs.length > 0 ? `<div class="topic-subtopics" id="sub-${t.id}" style="display:none"><ul class="subtopic-list">${subs.map(s => `<li><span>${s}</span><div class="subtopic-actions"><button class="btn btn-outline btn-sm" data-action="edit-subtopic" data-topic="${t.id}" data-subtopic="${s}" title="Editar">✏️</button><button class="btn btn-outline btn-sm" data-action="delete-subtopic" data-topic="${t.id}" data-subtopic="${s}" title="Excluir" style="color:var(--danger)">🗑</button></div></li>`).join('')}</ul><div style="display:flex;gap:6px;margin-top:8px"><input type="text" id="add-sub-${t.id}" placeholder="Novo subtópico" style="flex:1;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.8rem;background:var(--surface);color:var(--text)"><button class="btn btn-outline btn-sm" data-action="add-subtopic" data-topic="${t.id}">➕</button></div></div>` : '';
        html += `<div class="topic-item"><div class="topic-info"><div class="topic-name" data-action="toggle-subtopics" data-topic="${t.id}">${ts.completed ? '✅ ' : ''}${t.name}</div><div class="topic-meta"><span>⏱ ${ts.timeSpent || 0}/${ts.estHours}h</span>${ts.lastStudied ? `<span>📅 ${new Date(ts.lastStudied).toLocaleDateString('pt-BR')}</span>` : ''}${subs.length > 0 ? `<span style="font-size:0.65rem;color:var(--text3)">${subs.length} subtópicos</span>` : ''}</div><div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="font-size:0.7rem;color:var(--text3)">Importância:</span><select class="topic-importance" data-action="set-topic-importance" data-topic="${t.id}" onclick="event.stopPropagation()" style="padding:2px 4px;border:1px solid var(--border);border-radius:4px;font-size:0.7rem;background:var(--surface);color:var(--text);cursor:pointer"><option value="0" ${imp === 0 ? 'selected' : ''}>0</option><option value="1" ${imp === 1 ? 'selected' : ''}>1</option><option value="2" ${imp === 2 ? 'selected' : ''}>2</option><option value="3" ${imp === 3 ? 'selected' : ''}>3</option><option value="4" ${imp === 4 ? 'selected' : ''}>4</option><option value="5" ${imp === 5 ? 'selected' : ''}>5</option></select><div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${topicProgress}%"></div></div></div></div>${subHtml}<div class="topic-actions"><button class="btn btn-outline btn-sm" data-action="edit-topic" data-topic="${t.id}" title="Editar tópico">✏️</button><button class="btn btn-outline btn-sm" data-action="delete-topic" data-topic="${t.id}" title="Excluir" style="color:var(--danger)">🗑</button></div></div>`;
      });
      html += `</div></div>`;
    });
    container.innerHTML = html;
    document.querySelectorAll('.category-body').forEach(el => { if (el.querySelectorAll('.topic-item').length <= 5) el.classList.remove('collapsed'); });
  },

  renderCronograma() {
    const container = document.getElementById('tab-cronograma');
    if (!container || !container.classList.contains('active')) return;
    const cfg = this.getConfig();
    if (!cfg.examDate || !cfg.dailyHours) { container.innerHTML = `<div class="empty-state"><div class="icon">📋</div><h3>Configure o cronograma primeiro</h3><p>Clique no botão abaixo para configurar.</p><button class="btn btn-primary" data-action="open-modal" data-modal="config-modal">⚙️ Configurar Cronograma</button></div>`; return; }
    const examDate = new Date(cfg.examDate);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    const weeks = this.generateCronograma();
    const totalDays = weeks.reduce((s, w) => s + w.days.filter(d => d.topics.length > 0).length, 0);
    if (this.currentWeek === undefined) this.currentWeek = 0;
    if (this.currentWeek >= weeks.length) this.currentWeek = Math.max(0, weeks.length - 1);
    if (this.currentWeek < 0) this.currentWeek = 0;
    const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dpw = (cfg.studyDays || [1,2,3,4,5]).length;
    let html = `
      <div class="dashboard-welcome"><h1>📋 Cronograma Semanal</h1></div>
      <div class="crono-header-info">
        <div class="crono-header-date">📅 Hoje: <strong>${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
        <div class="crono-header-stats">
          <span class="crono-header-stat">⏰ ${cfg.dailyHours}h/dia</span>
          <span class="crono-header-stat">📆 ${dpw} dias/semana</span>
          <span class="crono-header-stat">🎯 ${daysUntilExam} dias até prova</span>
          <span class="crono-header-stat">📄 ${weeks.length} semanas</span>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-bottom:8px"><button class="btn btn-config" data-action="open-modal" data-modal="config-modal">⚙️ Configurar Cronograma</button></div>
    `;
    if (totalDays > daysUntilExam) html += `<div class="alert-bar danger">⚠️ Cronograma precisa de ${totalDays} dias, mas só tem ${Math.min(daysUntilExam, dpw * weeks.length)} disponíveis.</div>`;
    if (cfg.trimmed && cfg.trimmedTopics && cfg.trimmedTopics.length > 0) {
      const trimmedNames = cfg.trimmedTopics.map(id => { const ts = this.state.topics[id]; return ts ? ts.name : id; }).join(', ');
      html += `<div class="alert-bar" style="background:var(--surface);border-left:4px solid var(--accent)">✂️ Tópicos removidos: <strong>${trimmedNames}</strong>. <button class="btn btn-outline btn-sm" data-action="restore-trimmed" style="margin-left:8px">↩ Restaurar</button></div>`;
    }
    if (weeks.length > 0) {
      const w = weeks[this.currentWeek];
      const weekEnd = new Date(w.startDate); weekEnd.setDate(weekEnd.getDate() + 6);
      html += `<div class="crono-slide-container"><div class="crono-slide-nav"><button class="crono-nav-btn" data-action="crono-nav" data-dir="-1" ${this.currentWeek === 0 ? 'disabled' : ''}>◀ Anterior</button><div class="crono-slide-info"><span class="crono-slide-week">Semana ${w.week}</span><span class="crono-slide-date">${w.startDate.toLocaleDateString('pt-BR')} — ${weekEnd.toLocaleDateString('pt-BR')}</span><span class="crono-slide-counter">${this.currentWeek + 1} de ${weeks.length}</span></div><button class="crono-nav-btn" data-action="crono-nav" data-dir="1" ${this.currentWeek >= weeks.length - 1 ? 'disabled' : ''}>Próximo ▶</button></div><div class="crono-slide-body"><table class="crono-table"><thead><tr><th class="crono-th-day">Dia</th><th>Matérias</th><th class="crono-th-check">✓</th></tr></thead><tbody>`;
      w.days.forEach(d => {
        const dayName = DAY_NAMES[d.date.getDay()];
        const dateStr = d.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' });
        const isToday = d.date.toDateString() === today.toDateString();
        let topicsHtml = '';
        d.topics.forEach(t => {
          const ts = this.state.topics[t.id] || {};
          const subsList = t.subtopics || [];
          const studiedSet = new Set(ts.studiedSubtopics || []);
          const topicChecked = ts.completed || (subsList.length > 0 && subsList.every(s => studiedSet.has(s)));
          const subs = subsList.length > 0 ? subsList.slice(0, 3).join(' • ') : '';
          let subCheckboxes = '';
          if (subsList.length > 0) {
            subCheckboxes = `<div class="crono-sub-checks" style="display:none;margin-top:4px;padding-left:20px">${subsList.map(s => `<label class="crono-sub-check-item"><input type="checkbox" data-action="crono-sub-check" data-topic="${t.id}" data-subtopic="${s}" ${studiedSet.has(s) ? 'checked' : ''}><span>${s}</span></label>`).join('')}</div>`;
          }
          topicsHtml += `<div class="crono-cell-topic" data-topic-id="${t.id}"><div class="crono-cell-row"><label class="crono-topic-check"><input type="checkbox" data-action="crono-topic-check" data-topic="${t.id}" ${topicChecked ? 'checked' : ''}></label><span class="crono-cell-icon">${t.categoryIcon}</span><span class="crono-cell-name" data-action="crono-toggle-subs" data-topic="${t.id}" style="cursor:pointer">${t.name}</span>${subsList.length > 0 ? `<span class="crono-cell-subs-toggle" data-action="crono-toggle-subs" data-topic="${t.id}" title="Ver subtópicos">▾ ${subsList.length}</span>` : ''}</div>${subCheckboxes}</div>`;
        });
        if (!topicsHtml) topicsHtml = '<span class="crono-empty">—</span>';
        html += `<tr class="${isToday ? 'crono-today-row' : ''}"><td class="crono-td-day"><div class="crono-day-label">${dayName}</div><div class="crono-day-date-label">${dateStr}</div></td><td class="crono-td-topics">${topicsHtml}</td><td class="crono-td-check"></td></tr>`;
      });
      html += `</tbody></table></div></div>`;
    } else html += `<div class="empty-state"><div class="icon">✅</div><h3>Tudo concluído!</h3></div>`;
    container.innerHTML = html;
    if (this._openCronoSubs && this._openCronoSubs.size > 0) {
      this._openCronoSubs.forEach(topicId => {
        const cell = container.querySelector(`.crono-cell-topic[data-topic-id="${topicId}"]`);
        if (cell) {
          const subDiv = cell.querySelector('.crono-sub-checks');
          const toggleSpan = cell.querySelector('.crono-cell-subs-toggle');
          if (subDiv) subDiv.style.display = 'block';
          if (toggleSpan) { const count = cell.querySelectorAll('.crono-sub-check-item').length; toggleSpan.textContent = `▴ ${count}`; }
        }
      });
    }
  },

  renderAchievements() {
    const container = document.getElementById('tab-conquistas');
    if (!container || !container.classList.contains('active')) return;
    const unlocked = this.state.achievements || [];
    let html = `
      <div class="dashboard-welcome"><h1>🏆 Conquistas</h1><p>${unlocked.length} de ${ACHIEVEMENTS.length} desbloqueadas</p></div>
      <div class="progress-bar" style="height:8px;margin:16px 0"><div class="progress-fill" style="width:${(unlocked.length / ACHIEVEMENTS.length) * 100}%"></div></div>
      <div class="achievements-grid">
    `;
    ACHIEVEMENTS.forEach(a => {
      const isUnlocked = unlocked.includes(a.id);
      html += `<div class="achievement-card ${isUnlocked ? '' : 'locked'}"><span class="achievement-icon">${a.icon}</span><div class="achievement-name">${a.name}</div><div class="achievement-desc">${a.desc}</div></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  render() {
    try {
      this.renderHeader();
      this.renderZonaRisco();
      const activeTab = document.querySelector('.tabs-content.active');
      const tabId = activeTab ? activeTab.id.replace('tab-', '') : 'dashboard';
      if (tabId === 'dashboard') this.renderDashboard();
      else if (tabId === 'assuntos') this.renderTopics();
      else if (tabId === 'cronograma') this.renderCronograma();
      else if (tabId === 'conquistas') this.renderAchievements();
    } catch (e) { console.error('Render error:', e); }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

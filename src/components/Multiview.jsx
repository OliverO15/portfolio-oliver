/* Multiview one-pager. Ported from the "Portfolio — Broadcast" design prototype.
   renderVals() derives everything the markup needs from state + props. */
import { Component, Fragment } from 'react';
import { projects } from '../data/projects.js';

export default class Multiview extends Component {
  static defaultProps = {"accent": "#F2A93B", "transition": "wipe", "glow": 40, "texture": 40, "brightness": 25, "depth": 100, "size": 300, "light": 45, "warmth": 70, "lampX": 52, "lampY": 24, "spread": 70, "stretch": 170, "angle": -21, "softness": 75, "rake": 50, "vignette": 40, "l2on": true, "l2light": 40, "l2warmth": 55, "l2x": 97, "l2y": 74, "l2spread": 65, "l2stretch": 170, "l2angle": -29, "l2soft": 85, "l2rake": 40, "l3on": true, "l3light": 45, "l3warmth": 75, "l3x": 10, "l3y": 95, "l3spread": 70, "l3stretch": 170, "l3angle": -39, "l3soft": 80, "l3rake": 65};

  constructor(props) {
    super(props);
    this.state = { pgm: 'slate', pvw: 0, shot: 0, tc: '00:00:00:00', split: 50, bSplit: 50, vornNew: true, bogNew: true, gEnd: 0, gSc: false, gMode: 'condensed', gPres: false, gQual: false, flash: false, intro: true, auto: false, l: 9, r: 8, pl: 11, pr: 10 };
    this.lv = 0.55; this.rv = 0.5; this.tick = 0;
    this.projects = projects;
    this.shotLabels = ['OPEN', 'PROBLEM', 'TRY IT', 'RESULT'];
    this.labelsFor = { vorn: ['OPEN', 'BEFORE', 'PROCESS', 'FINAL'], qf: ['OPEN', 'WORKFLOW', 'PRODUCT', 'MARKETING'], gfx: ['OPEN', 'TRY IT', 'INTERFACE', 'RESULTS'], bog: ['OPEN', 'BEFORE', 'MODULES', 'ADS'] };
  }
  componentDidMount() {
    this.introT = setTimeout(() => this.setState({ intro: false }), 3400);
    this.autoT = [];
    this.onUser = (e) => {
      if (e.target && e.target.closest && e.target.closest('[data-auto]')) return;
      if (this.state.auto || this.autoPending) this.stopAuto();
    };
    this.onVis = () => {
      if (document.hidden) { if (this.state.auto) { this.clearAutoTimers(); this.autoPaused = true; } }
      else if (this.autoPaused) { this.autoPaused = false; this.playShot(this.state.shot); }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('pointerdown', this.onUser, true);
      document.addEventListener('keydown', this.onUser, true);
      document.addEventListener('visibilitychange', this.onVis);
    }
    const reduceAuto = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceAuto) { this.autoPending = true; this.autoT.push(setTimeout(() => { this.autoPending = false; this.startAuto(); }, 7400)); }
    const start = Date.now();
    this.timer = setInterval(() => {
      const ms = Date.now() - start;
      const f = Math.floor((ms % 1000) / 40);
      const s = Math.floor(ms / 1000);
      const p = (n) => String(n).padStart(2, '0');
      this.setState({ tc: p(Math.floor(s / 3600)) + ':' + p(Math.floor(s / 60) % 60) + ':' + p(s % 60) + ':' + p(f) });
    }, 40);
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      this.meterT = setInterval(() => {
        this.tick += 1;
        const beat = (this.tick % 8 === 0) ? 0.22 : 0;
        const tgtL = 0.42 + Math.random() * 0.3 + beat;
        const tgtR = 0.40 + Math.random() * 0.3 + beat;
        this.lv += (tgtL - this.lv) * (tgtL > this.lv ? 0.7 : 0.25);
        this.rv += (tgtR - this.rv) * (tgtR > this.rv ? 0.7 : 0.25);
        const l = Math.min(16, Math.round(this.lv * 16));
        const r = Math.min(16, Math.round(this.rv * 16));
        const s = this.state;
        const decay = this.tick % 3 === 0 ? 1 : 0;
        this.setState({ l, r, pl: l >= s.pl ? l : Math.max(l, s.pl - decay), pr: r >= s.pr ? r : Math.max(r, s.pr - decay) });
      }, 70);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer); clearInterval(this.meterT); clearTimeout(this.flashT); clearTimeout(this.introT);
    this.clearAutoTimers();
    if (typeof document !== 'undefined') {
      document.removeEventListener('pointerdown', this.onUser, true);
      document.removeEventListener('keydown', this.onUser, true);
      document.removeEventListener('visibilitychange', this.onVis);
    }
  }
  /* ---------- auto-play ---------- */
  clearAutoTimers() {
    (this.autoT || []).forEach((t) => { clearTimeout(t); clearInterval(t); });
    this.autoT = [];
  }
  later(ms, fn) { this.autoT.push(setTimeout(fn, ms)); }
  tween(key, from, to, ms, delay) {
    this.later(delay, () => {
      const t0 = Date.now();
      const iv = setInterval(() => {
        const k = Math.min(1, (Date.now() - t0) / ms);
        const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        this.setState({ [key]: Math.round(from + (to - from) * e) });
        if (k >= 1) clearInterval(iv);
      }, 30);
      this.autoT.push(iv);
    });
  }
  autoOrder() { return [1, 0, 2, 3]; }
  nextInOrder(i) {
    const o = this.autoOrder();
    const at = o.indexOf(i);
    return o[(at + 1) % o.length];
  }
  shotDuration(key, i) {
    if (key === 'gfx' && i === 1) return 14000;
    if ((key === 'qf' || key === 'bog') && i === 1) return 9000;
    if ((key === 'vorn' || key === 'qf' || key === 'bog') && i === 2) return 9000;
    if (key === 'gfx' && i === 3) return 9000;
    return 6000;
  }
  startAuto() {
    this.clearAutoTimers();
    this.autoPending = false;
    this.setState({ auto: true });
    const st = this.state;
    if (st.pgm === 'slate') {
      const first = this.autoOrder()[0];
      this.setState({ pvw: first });
      this.later(1600, () => this.autoCut(first));
    } else {
      this.playShot(st.shot);
    }
  }
  stopAuto() {
    this.clearAutoTimers();
    this.autoPending = false;
    this.autoPaused = false;
    if (this.state.auto) this.setState({ auto: false });
  }
  autoCut(next) {
    const s = this.state;
    this.setState({ pgm: next, pvw: s.pgm === 'slate' ? this.nextInOrder(next) : s.pgm, shot: 0, flash: true });
    clearTimeout(this.flashT);
    this.flashT = setTimeout(() => this.setState({ flash: false }), 160);
    this.later(20, () => this.playShot(0));
  }
  playShot(i) {
    this.clearAutoTimers();
    const st = this.state;
    if (st.pgm === 'slate') return;
    const key = this.projects[st.pgm].key;
    const dur = this.shotDuration(key, i);
    this.setState({ shot: i });
    this.shotStart = Date.now();
    this.shotDur = dur;
    if (key === 'qf' && i === 1) { this.setState({ split: 50 }); this.tween('split', 50, 12, 2600, 1200); this.tween('split', 12, 50, 1800, 5600); }
    if (key === 'bog' && i === 1) { this.setState({ bSplit: 50 }); this.tween('bSplit', 50, 10, 2600, 1200); this.tween('bSplit', 10, 50, 1800, 5600); }
    if (key === 'gfx' && i === 1) {
      this.setState({ gEnd: 0, gSc: false, gPres: false, gQual: false, gMode: 'condensed' });
      const steps = [
        [800, { gPres: true }],
        [3200, { gPres: false, gSc: true, gMode: 'condensed' }],
        [5000, { gMode: 'expanded' }],
        [6600, () => ({ gEnd: 1 })],
        [8200, () => ({ gEnd: 2 })],
        [9600, { gMode: 'ends-overview' }],
        [11400, { gSc: false, gQual: true }]
      ];
      steps.forEach(([t, v]) => this.later(t, () => this.setState(typeof v === 'function' ? v() : v)));
      this.later(dur - 200, () => this.setState({ gQual: false, gSc: false, gPres: false }));
    }
    const pgm = st.pgm;
    if (i === 3) {
      const next = this.nextInOrder(pgm);
      this.later(Math.max(0, dur - 2600), () => this.setState({ pvw: next }));
      this.later(dur, () => this.autoCut(next));
    } else {
      this.later(dur, () => this.playShot(i + 1));
    }
  }
  doCut() {
    const s = this.state;
    if (s.pgm === s.pvw) return;
    this.setState({ pgm: s.pvw, pvw: s.pgm, shot: 0, flash: true });
    clearTimeout(this.flashT);
    this.flashT = setTimeout(() => this.setState({ flash: false }), 160);
  }
  gfxVals(st) {
    const L = { team: 'BFB', given: 'Anna', family: 'Kristjánsdóttir', ends: [[9, 10, 9], [10, 9, 8], [9, 9, 10], [10, 10, 9], [9, 10, 10]] };
    const R = { team: 'HRÓ', given: 'Sara', family: 'Magnúsdóttir', ends: [[10, 9, 9], [10, 10, 8], [8, 9, 9], [10, 9, 9], [9, 9, 9]] };
    const e = st.gEnd;
    const sum = (a) => a.reduce((x, y) => x + y, 0);
    let sl = 0, sr = 0;
    const lw = [], rw = [];
    for (let i = 0; i <= e; i++) {
      const a = sum(L.ends[i]), b = sum(R.ends[i]);
      if (a > b) sl += 2; else if (b > a) sr += 2; else { sl += 1; sr += 1; }
      lw.push(a > b); rw.push(b > a);
    }
    const lWin = sl >= 6, rWin = sr >= 6, done = lWin || rWin;
    const side = (o, score, wins, isWin, isLose) => ({
      team: o.team, given: o.given, family: o.family, score: String(score),
      endScore: String(sum(o.ends[e])),
      arrows: o.ends[e].map((v) => ({ v: String(v) })),
      ends: o.ends.slice(0, e + 1).map((a, i) => ({ v: String(sum(a)), cls: wins[i] ? 'win' : '' })),
      cls: (isWin ? 'winner' : '') + (isLose ? ' looser' : ''),
      winCls: isWin ? 'on' : ''
    });
    const quali = [
      ['BFB', 'Anna Kristjánsdóttir', 571], ['HRÓ', 'Sara Magnúsdóttir', 566], ['BFB', 'Helga Jónsdóttir', 558], ['ÚLF', 'Katrín Einarsdóttir', 552],
      ['HRÓ', 'Eva Pálsdóttir', 547], ['ÚLF', 'Lilja Gunnarsdóttir', 541], ['BFB', 'Rakel Ólafsdóttir', 533], ['HRÓ', 'Birna Sigurðardóttir', 526]
    ].map((r, i) => ({ rank: String(i + 1), team: r[0], name: r[1], score: String(r[2]), cls: i < 2 ? 'inMatch' : '' }));
    const set = (o) => this.setState(o);
    const mode = st.gMode;
    const onOff = (v) => (v ? 'live' : '');
    return {
      gL: side(L, sl, lw, lWin, rWin), gR: side(R, sr, rw, rWin, lWin),
      gRound: String(e + 1),
      gQual: quali,
      gScCls: st.gSc ? 'on' : '', gScHidden: st.gSc ? 'false' : 'true',
      gPresCls: st.gPres ? 'on' : '', gPresHidden: st.gPres ? 'false' : 'true',
      gQualCls: st.gQual ? 'on' : '', gQualHidden: st.gQual ? 'false' : 'true',
      gScMode: mode,
      gCond: mode === 'condensed' ? 'condensed' : '',
      gEndsHide: mode === 'ends-overview' ? '' : 'hide',
      gHdrCls: done ? 'off' : '',
      gRndCls: mode === 'expanded' ? 'on' : '',
      gPresBtn: onOff(st.gPres), gQualBtn: onOff(st.gQual), gScBtn: onOff(st.gSc),
      gPresP: String(st.gPres), gQualP: String(st.gQual), gScP: String(st.gSc),
      gModeCBtn: mode === 'condensed' ? 'sel' : '', gModeEBtn: mode === 'expanded' ? 'sel' : '', gModeRBtn: mode === 'ends-overview' ? 'sel' : '',
      gModeCP: String(mode === 'condensed'), gModeEP: String(mode === 'expanded'), gModeRP: String(mode === 'ends-overview'),
      gTogPres: () => set(st.gPres ? { gPres: false } : { gPres: true, gQual: false, gSc: false }),
      gTogQual: () => set(st.gQual ? { gQual: false } : { gQual: true, gPres: false, gSc: false }),
      gTogSc: () => set(st.gSc ? { gSc: false } : { gSc: true, gPres: false, gQual: false }),
      gModeC: () => set({ gMode: 'condensed', gSc: true, gPres: false, gQual: false }),
      gModeE: () => set({ gMode: 'expanded', gSc: true, gPres: false, gQual: false }),
      gModeR: () => set({ gMode: 'ends-overview', gSc: true, gPres: false, gQual: false }),
      gNext: () => set({ gEnd: (st.gEnd + 1) % 5 }),
      gClear: () => set({ gSc: false, gPres: false, gQual: false })
    };
  }
  renderVals() {
    const st = this.state;
    const { pgm, pvw, shot } = st;
    const P = this.projects;
    const pr = this.props;
    const isProject = pgm !== 'slate';
    const cur = isProject ? P[pgm] : P[0];
    const short = (x) => x === 'slate' ? 'SLATE' : P[x].short;

    const warmRGB = (wv) => {
      const w = Math.max(0, Math.min(100, wv)) / 100;
      const cool = [205, 222, 248], mid = [246, 238, 226], warm = [255, 172, 98];
      const a = w < .5 ? cool : mid, b = w < .5 ? mid : warm, t = w < .5 ? w * 2 : (w - .5) * 2;
      return a.map((c, i) => Math.round(c + (b[i] - c) * t)).join(',');
    };
    const extra = (k, d) => {
      const g = (n) => pr[k + n] ?? d[n];
      return {
        on: g('on') !== false,
        light: String(g('light') / 100),
        lamp: warmRGB(g('warmth')),
        lx: g('x') + '%', ly: g('y') + '%', lw: g('spread') + '%',
        lr: String(g('stretch') / 100), la: g('angle') + 'deg',
        lhard: Math.round((1 - g('soft') / 100) * 85) + '%',
        rake: String((g('rake') / 100) * 1.2)
      };
    };
    const meter = (lvl, peak) => Array.from({ length: 16 }, (_, i) => {
      const zone = i >= 14 ? 'r' : (i >= 11 ? 'a' : '');
      const on = i < lvl || i === peak - 1;
      return { cls: zone + (on ? ' on' : '') };
    });

    const sources = P.map((p, i) => {
      const isPgm = pgm === i, isPvw = pvw === i;
      return {
        ...p, num: String(i + 1),
        cls: isPgm ? 'is-pgm' : (isPvw ? 'is-pvw' : ''),
        tally: isPgm ? 'PGM' : (isPvw ? 'PVW' : ''),
        tallyColor: isPgm ? '#FF9A9D' : '#6FD3A0',
        pick: () => {
          if (pgm === i) return;
          this.setState({ pgm: i, pvw: pvw === i ? pgm : pvw, shot: 0 });
        }
      };
    });
    const labels = this.labelsFor[cur.key] || this.shotLabels;
    const vis = isProject && (cur.key === 'vorn' || cur.key === 'qf');
    const isV = isProject && cur.key === 'vorn', isQ = isProject && cur.key === 'qf', isG = isProject && cur.key === 'gfx', isB = isProject && cur.key === 'bog';
    const gRes = isG && shot === 3;
    if (gRes && !this.gResStart) this.gResStart = Date.now();
    if (!gRes) this.gResStart = 0;
    const gT = gRes ? Math.min(1, Math.max(0, (Date.now() - this.gResStart - 300) / 1600)) : 1;
    const gViews = Math.round(1070263 * (1 - Math.pow(1 - gT, 3))).toLocaleString('en-US');
    const shots = labels.map((l, i) => ({
      num: String(i + 1), label: l,
      cls: shot === i ? 'on' : 'dim',
      current: shot === i ? 'step' : 'false',
      prog: st.auto && shot === i && this.shotDur ? Math.min(100, (Date.now() - this.shotStart) / this.shotDur * 100).toFixed(1) + '%' : '0%',
      pick: () => this.setState({ shot: i })
    }));

    return {
      tc: st.tc,
      autoCls: st.auto ? 'amber' : '',
      autoPressed: st.auto ? 'true' : 'false',
      toggleAuto: () => (this.state.auto ? this.stopAuto() : this.startAuto()),
      setVid: this.setVid || (this.setVid = (el) => {
        if (!el) return;
        el.muted = true;
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduce && el.play) { const pl = el.play(); if (pl && pl.catch) pl.catch(() => {}); }
      }),
      accent: pr.accent ?? '#F2A93B',
      trClass: 'tr-' + (pr.transition ?? 'wipe'),

      glow: String((pr.glow ?? 40) / 100),
      tex: String((pr.texture ?? 40) / 100),
      tbri: String((pr.brightness ?? 25) / 100),
      tcon: String((pr.depth ?? 100) / 100),
      tsize: (pr.size ?? 300) + 'px',
      light: String((pr.light ?? 45) / 100),
      lamp: warmRGB(pr.warmth ?? 70),
      lx: (pr.lampX ?? 52) + '%',
      ly: (pr.lampY ?? 24) + '%',
      lw: (pr.spread ?? 70) + '%',
      lr: String((pr.stretch ?? 170) / 100),
      la: (pr.angle ?? -21) + 'deg',
      lhard: Math.round((1 - (pr.softness ?? 75) / 100) * 85) + '%',
      rake: String(((pr.rake ?? 50) / 100) * 1.2),
      vig: String((pr.vignette ?? 40) / 100),
      l2: extra('l2', { on: true, light: 40, warmth: 55, x: 97, y: 74, spread: 65, stretch: 170, angle: -29, soft: 85, rake: 40 }),
      l3: extra('l3', { on: true, light: 35, warmth: 75, x: 7, y: 71, spread: 65, stretch: 240, angle: -39, soft: 80, rake: 65 }),

      sources, shots,
      isSlate: !isProject,
      isProject,
      isShot0: isProject && shot === 0,
      isShot1: isProject && shot === 1,
      isShot2: isProject && shot === 2,
      isShot3: isProject && shot === 3,
      credits: (isProject ? cur.credits : ['MSc Human-Computer Interaction & Design', 'KTH, Stockholm', 'Figma, React, TypeScript', 'Open to work']).map((v, i) => ({ k: (isProject ? ['ROLE', 'TEAM', 'TOOLS', 'YEAR'] : ['STUDYING', 'WHERE', 'TOOLS', 'STATUS'])[i], v })),
      gShot0: isProject && !vis && !isG && !isB && shot === 0,
      bShot0: isB && shot === 0,
      bShot1: isB && shot === 1,
      bShot2: isB && shot === 2,
      bShot3: isB && shot === 3,
      bSplit: st.bSplit,
      bLeft: st.bSplit + '%',
      bOnSplit: (e) => this.setState({ bSplit: Number(e.target.value) }),
      gfShot0: isG && shot === 0,
      gfShot1: isG && shot === 1,
      gfShot2: isG && shot === 2,
      gfShot3: gRes,
      gfViews: gViews,
      qShot0: isQ && shot === 0,
      qShot1: isQ && shot === 1,
      qShot2: isQ && shot === 2,
      qShot3: isQ && shot === 3,
      vShot0: isV && shot === 0,
      gShot1: isProject && !vis && !isG && !isB && shot === 1,
      gShot2: isProject && !vis && !isG && !isB && shot === 2,
      gShot3: isProject && !vis && !isG && !isB && shot === 3,
      vShot1: isV && shot === 1,
      vShot2: isV && shot === 2,
      vShot3: isV && shot === 3,
      isQf: cur.key === 'qf',
      isVorn: cur.key === 'vorn',
      isGfx: cur.key === 'gfx',
      isBog: cur.key === 'bog',
      shotNum: String(shot + 1),
      prevShot: () => this.setState({ shot: (shot + 3) % 4 }),
      nextShot: () => this.setState({ shot: (shot + 1) % 4 }),
      pgm: cur,
      pgmLabel: isProject ? P[pgm].short + ' · ' + labels[shot] : 'SLATE',
      pvwLabel: short(pvw),
      pvwIsSlate: pvw === 'slate',
      pvwIsProject: pvw !== 'slate',
      pvwImg: pvw === 'slate' ? '' : P[pvw].img,

      split: st.split,
      qfLeft: st.split + '%',
      qfRight: (100 - st.split) + '%',
      onSplit: (e) => this.setState({ split: Number(e.target.value) }),
      bBeforeCls: st.bogNew ? '' : 'on',
      bAfterCls: st.bogNew ? 'on' : '',
      bBeforePressed: st.bogNew ? 'false' : 'true',
      bAfterPressed: st.bogNew ? 'true' : 'false',
      bSetBefore: () => this.setState({ bogNew: false }),
      bSetAfter: () => this.setState({ bogNew: true }),
      bogNew: st.bogNew,
      bogOld: !st.bogNew,
      bogText: st.bogNew
        ? 'After: pricing, opening hours and safety come first, then one clear step into the online booking system.'
        : 'Before: bookings were made over the phone.',
      ...this.gfxVals(st),

      dockCls: st.intro ? 'intro' : '',
      cut: () => this.doCut(),
      cutCls: st.flash ? 'flash' : '',
      nextLine: 'NEXT ' + short(pvw),
      sKeys: P.map((p, i) => {
        const onAir = pgm === i, next = pvw === i;
        return {
          n: String(i + 1), short: p.short,
          cls: onAir ? 'red' : (next ? 'green' : ''),
          pressed: next ? 'true' : 'false',
          label: p.title + (onAir ? ', on air' : (next ? ', in preview' : ', load to preview')),
          pick: () => { if (!onAir) this.setState({ pvw: i }); }
        };
      }),
      meterL: meter(st.l, st.pl),
      meterR: meter(st.r, st.pr)
    };
  }
  render() {
    const v = this.renderVals();
    return (
      <div className="pagepad" style={{"--glow": `${v.glow}`, "--tex": `${v.tex}`, "--tsize": `${v.tsize}`, "--tcon": `${v.tcon}`, "--tbri": `${v.tbri}`, "--light": `${v.light}`, "--lamp": `${v.lamp}`, "--lx": `${v.lx}`, "--ly": `${v.ly}`, "--lw": `${v.lw}`, "--lr": `${v.lr}`, "--la": `${v.la}`, "--lhard": `${v.lhard}`, "--vig": `${v.vig}`, "--rake": `${v.rake}`, position: "relative", overflow: "hidden", minHeight: "100vh", boxSizing: "border-box", padding: "0 24px", fontFamily: "'Barlow', sans-serif", color: "#E8E6E1", background: "#121314", display: "flex", flexDirection: "column", gap: "24px"}}>
        <div className="surface" aria-hidden="true">
          <div className="wall" />
        </div>
        <div className="vig" aria-hidden="true" />
        <div className="pool rake" aria-hidden="true" />
        <div className="pool add" aria-hidden="true" />
        {v.l2.on && (
          <>
          <div aria-hidden="true" style={{display: "contents", "--light": `${v.l2.light}`, "--lamp": `${v.l2.lamp}`, "--lx": `${v.l2.lx}`, "--ly": `${v.l2.ly}`, "--lw": `${v.l2.lw}`, "--lr": `${v.l2.lr}`, "--la": `${v.l2.la}`, "--lhard": `${v.l2.lhard}`, "--rake": `${v.l2.rake}`}}>
            <div className="pool rake" />
            <div className="pool add" />
          </div>
          </>
        )}
        {v.l3.on && (
          <>
          <div aria-hidden="true" style={{display: "contents", "--light": `${v.l3.light}`, "--lamp": `${v.l3.lamp}`, "--lx": `${v.l3.lx}`, "--ly": `${v.l3.ly}`, "--lw": `${v.l3.lw}`, "--lr": `${v.l3.lr}`, "--la": `${v.l3.la}`, "--lhard": `${v.l3.lhard}`, "--rake": `${v.l3.rake}`}}>
            <div className="pool rake" />
            <div className="pool add" />
          </div>
          </>
        )}
        <header className="layer" style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.07)"}}>
          <div style={{display: "flex", alignItems: "baseline", gap: "14px", flexWrap: "wrap"}}>
            <span className="cond" style={{fontWeight: "700", fontSize: "22px", letterSpacing: ".06em", textTransform: "uppercase"}}>
              Oliver Ormar Ingvarsson
            </span>
            <span style={{fontSize: "15px", color: "#A3A8AE"}}>
              Product designer & design engineer · Stockholm
            </span>
          </div>
          <div className="mono" style={{display: "flex", alignItems: "center", gap: "16px", fontSize: "14px"}}>
            <span style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 10px", border: "1px solid #E5484D", borderRadius: "4px", color: "#FFB4B6"}}>
              <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#E5484D"}} />
              ON AIR
            </span>
            <span style={{color: "#A3A8AE"}}>
              {v.tc}
            </span>
          </div>
        </header>
        <main className="layer mv">
          <div className="leftcol" style={{display: "flex", flexDirection: "column", gap: "22px"}}>
            <section className="sources" aria-label="Projects">
              {(v.sources || []).map((s, sIdx) => (
                <Fragment key={sIdx}>
                  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                    <button className={`tile ${s.cls}`} onClick={s.pick} aria-label={`Put ${s.title} on air`}>
                      <div className="hatch">
                        <img className="cover" src={s.img} alt="" />
                      </div>
                    </button>
                    <div className="mono" style={{display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                      <span style={{color: "#A3A8AE", opacity: ".7"}}>
                        CAM {s.num} · {s.short}
                      </span>
                      <span style={{color: `${s.tallyColor}`, opacity: ".85"}}>
                        {s.tally}
                      </span>
                    </div>
                  </div>
                </Fragment>
              ))}
            </section>
            <div className="pvwmon" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <span className="mono" style={{fontSize: "13px", color: "#6FD3A0", opacity: ".85"}}>
                PREVIEW
              </span>
              <div className="hatch glow-g" style={{border: "2px solid #2FA36B", borderRadius: "6px", overflow: "hidden", background: "#101113"}}>
                {v.pvwIsProject && (
                  <>
                  <img className="cover" src={v.pvwImg} alt="" />
                  </>
                )}
                {v.pvwIsSlate && (
                  <>
                  <div className="fill" style={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px", gap: "6px"}}>
                    <span className="mono" style={{fontSize: "12px", color: "#A3A8AE", opacity: ".7"}}>
                      SLATE · 00
                    </span>
                    <span className="cond" style={{fontWeight: "700", fontSize: "30px", lineHeight: "1"}}>
                      Oliver Ormar Ingvarsson
                    </span>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <section className="right" style={{display: "flex", flexDirection: "column", gap: "20px"}} aria-label="Program">
            <div className="pgmblock" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <div className="mono" style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
                <span style={{color: "#FF9A9D", opacity: ".85"}}>
                  PROGRAM
                </span>
                <span style={{color: "#A3A8AE", opacity: ".6"}}>
                  {v.tc}
                </span>
              </div>
              <div className="glow-r" style={{border: "2px solid #E5484D", borderRadius: "6px", overflow: "hidden", background: "#101113", display: "flex", flexDirection: "column"}}>
                <div style={{position: "relative", aspectRatio: "16/9", overflow: "hidden"}}>
                  {v.isSlate && (
                    <>
                    <div className="fill slatepad" style={{boxSizing: "border-box", padding: "56px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px"}}>
                      <span className="mono" style={{fontSize: "14px", color: "#A3A8AE"}}>
                        SLATE · 00
                      </span>
                      <h1 className="big" style={{margin: "0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: "700", fontSize: "64px", lineHeight: "1", letterSpacing: ".01em"}}>
                        Oliver Ormar Ingvarsson
                      </h1>
                      <p style={{margin: "0", maxWidth: "620px", fontSize: "21px", lineHeight: "1.45", color: "#D4D2CD"}}>
                        I design interfaces for complex professional tools, and then I build them. MSc in Human-Computer Interaction & Design at KTH.
                      </p>
                      <p style={{margin: "0", fontSize: "16px", color: "#A3A8AE"}}>
                        Click a project on the left to put it on air. Or use the switcher below: pick a source, then CUT.
                      </p>
                    </div>
                    </>
                  )}
                  {v.bShot0 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs" style={{background: "#DDD"}}>
                        <img className="cover vfade" src="/assets/b-bg.jpg" alt="" />
                        <img className="vabs qpop" src="/assets/b-logo.png" alt="Bogfimisetrið" style={{left: "13.021cqw", top: "13.426cqh", width: "73.906cqw", animationDelay: "0.3s"}} />
                      </div>
                    </div>
                    </>
                  )}
                  {v.bShot1 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <div className="vabs" style={{left: "4.948cqw", top: "10.926cqh", width: "32.292cqw"}}>
                          <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".2s"}}>
                            Goals:
                          </h2>
                          <ul style={{listStyle: "none", margin: "2.407cqh 0 0 1.875cqw", padding: "0", display: "flex", flexDirection: "column", gap: "2.037cqh", fontSize: "2.083cqw", lineHeight: "1.22"}}>
                            <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.45s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Modern UI
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.60s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                A clear message for first-time visitors
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.75s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Booking online instead of by phone
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.90s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Pages staff can build without code
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="vabs vright" style={{left: "39.271cqw", top: "5.093cqh", width: "57.135cqw", height: "89.815cqh", animationDelay: ".3s"}}>
                          <img src="/assets/b-old.png" alt="Before: the old Bogfimisetrið site, a standard shop theme with prices in plain tables" style={{position: "absolute", inset: "0", width: "100%", height: "100%"}} />
                          <span className="qchip" style={{left: "2cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF"}}>
                            Old site
                          </span>
                          <div style={{position: "absolute", inset: "0", clipPath: `inset(0 0 0 ${v.bLeft})`}}>
                            <img src="/assets/b-new.png" alt="After: the new site with a photo hero, opening hours, prices and a booking button" style={{position: "absolute", inset: "0", width: "100%", height: "100%"}} />
                            <span className="qchip" style={{right: "2cqw", background: "#0077C8", color: "#FFFFFF"}}>
                              New site
                            </span>
                          </div>
                          <input className="qcmp" type="range" min="0" max="100" value={v.bSplit} onChange={v.bOnSplit} aria-label="Drag to compare the old and new Bogfimisetrið site" />
                          <div className="qline" aria-hidden="true" style={{position: "absolute", top: "-2.315cqh", bottom: "-2.315cqh", left: `${v.bLeft}`, width: "0.469cqw", marginLeft: "-0.234cqw", borderRadius: "0.260cqw", background: "#0077C8", pointerEvents: "none", zIndex: "4"}}>
                            <span className="qknob" style={{position: "absolute", top: "50%", left: "50%", width: "3.333cqw", height: "3.333cqw", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#0077C8", boxShadow: "0 0.556cqh 1.667cqh rgba(17,18,20,.35)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{width: "55%", height: "55%"}} aria-hidden="true">
                                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  {v.bShot2 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <h2 className="vabs vh vup" style={{left: "3.281cqw", top: "6.481cqh", fontSize: "3.021cqw", lineHeight: "1.12", animationDelay: ".15s"}}>
                          Custom built modular
                          <br />
                          WordPress theme
                        </h2>
                        <img className="vabs vup" src="/assets/b-example.png" alt="An example page, Hópar, built from the section library" style={{left: "3.229cqw", top: "23.148cqh", width: "45.104cqw", animationDelay: "0.35s"}} />
                        <div className="vabs vfade" style={{left: "50.000cqw", top: "0", width: "48.333cqw", height: "100%", overflow: "hidden", WebkitMaskImage: "linear-gradient(transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(transparent,#000 8%,#000 92%,transparent)", animationDelay: ".5s"}} role="img" aria-label="Sections from the theme's library">
                          <div className="bmods">
                            <img src="/assets/b-mod84.png" alt="Hero section" />
                            <img src="/assets/b-mod87.png" alt="Opening hours and prices with booking" />
                            <img src="/assets/b-mod88.png" alt="How it works, in three steps" />
                            <img src="/assets/b-mod89.png" alt="Where we are, with map" />
                            <img src="/assets/b-mod90.png" alt="Group booking guidelines" />
                            <img src="/assets/b-mod91.png" alt="Questions and contact" />
                            <img src="/assets/b-mod92.png" alt="Partner club" />
                            <img src="/assets/b-mod84.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod87.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod88.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod89.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod90.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod91.png" alt="" aria-hidden="true" />
                            <img src="/assets/b-mod92.png" alt="" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  {v.bShot3 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <h2 className="vabs vh vup" style={{left: "3.646cqw", top: "6.111cqh", fontSize: "2.604cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: ".15s"}}>
                          Advertising & Conversion Tracking
                        </h2>
                        <img className="vabs vup" src="/assets/b-ad-45.png" alt="Ad, 4:5: Prófaðu Bogfimi!" style={{left: "3.542cqw", top: "15.463cqh", width: "21.458cqw", animationDelay: "0.35s"}} />
                        <img className="vabs vup" src="/assets/b-ad-11.png" alt="Ad, 1:1: Vinahópurinn í bogfimi" style={{left: "26.510cqw", top: "15.463cqh", width: "27.031cqw", animationDelay: "0.5s"}} />
                        <img className="vabs vup" src="/assets/b-ad-wide.png" alt="Wide ad: Prófaðu Bogfimi!" style={{left: "3.542cqw", top: "65.833cqh", width: "45.938cqw", animationDelay: "0.65s"}} />
                        <img className="vabs vfade" src="/assets/b-noona-logo.png" alt="Noona HQ" style={{left: "57.292cqw", top: "16.852cqh", width: "9.896cqw", animationDelay: "0.9s"}} />
                        <img className="vabs vright" src="/assets/b-noona-results.png" alt="Noona HQ, September 2026: 148 bookings, by origin HQ 73, Noona 53, booking link 22" style={{left: "57.135cqw", top: "22.593cqh", width: "40.208cqw", animationDelay: "0.9s"}} />
                        <p className="vabs vup" style={{margin: "0", left: "58.646cqw", top: "87.037cqh", fontSize: "2.604cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.3s"}}>
                          Already half of bookings online
                        </p>
                        <p className="vabs vup" style={{margin: "0", left: "58.750cqw", top: "94.259cqh", fontSize: "1.198cqw", color: "#6B6F75", whiteSpace: "nowrap", animationDelay: "1.45s"}}>
                          September 2026: 75 of 148 bookings made online
                        </p>
                      </div>
                    </div>
                    </>
                  )}
                  {v.gfShot0 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
                        <img className="cover vfade" src="/assets/g-main-blur.jpg" alt="" />
                        <div className="fill" style={{background: "rgba(0,0,0,.12)"}} />
                        <h2 className="vabs vh" style={{left: "0", right: "0", top: "34.722cqh", textAlign: "center", fontSize: "7.812cqw", lineHeight: "1.12", textShadow: "0 0.370cqh 2.778cqh rgba(0,0,0,.25)"}}>
                          <span className="vup" style={{display: "block", animationDelay: ".3s"}}>
                            Archery Broadcast
                          </span>
                          <span className="vup" style={{display: "block", animationDelay: ".5s"}}>
                            Graphics Engine
                          </span>
                        </h2>
                      </div>
                    </div>
                    </>
                  )}
                  {v.gfShot1 && (
                    <>
                    <div className={`fill ${v.trClass}`} style={{background: "#101113", display: "flex", flexDirection: "column"}}>
                      <div style={{position: "relative", flexGrow: "1"}}>
                        <div className="gx">
                          <img className="cover" src="/assets/g-main.jpg" alt="An archer at full draw during a competition" />
                          <div className={`gx-mp c g5 ${v.gPresCls}`} aria-hidden={v.gPresHidden}>
                            <div className="gx-cne c">
                              <div className="gx-ch">
                                Íslandsmeistaramót Innandyra 2026
                              </div>
                              <div className="gx-eh">
                                Recurve Women - Gold Medal Match
                              </div>
                            </div>
                            <div className="r g5">
                              <div className="gx-ac r g20 ac">
                                <div>
                                  1.
                                </div>
                                <div className="gx-tc">
                                  <span>
                                    {v.gL.team}
                                  </span>
                                </div>
                                <div className="c g0">
                                  <div>
                                    {v.gL.given}
                                  </div>
                                  <div>
                                    {v.gL.family}
                                  </div>
                                </div>
                              </div>
                              <div className="gx-ac r g20 ac">
                                <div className="c g0" style={{flex: "1", textAlign: "right"}}>
                                  <div>
                                    {v.gR.given}
                                  </div>
                                  <div>
                                    {v.gR.family}
                                  </div>
                                </div>
                                <div className="gx-tc">
                                  <span>
                                    {v.gR.team}
                                  </span>
                                </div>
                                <div>
                                  2.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="gx-qw" aria-hidden={v.gQualHidden}>
                            <div className={`gx-q c g5 ${v.gQualCls}`}>
                              <div className="gx-cne c">
                                <div className="gx-ch">
                                  Íslandsmeistaramót Innandyra 2026
                                </div>
                                <div className="gx-eh">
                                  Recurve Women - Qualification Results
                                </div>
                              </div>
                              <div className="c g0">
                                {(v.gQual || []).map((q, qIdx) => (
                                  <Fragment key={qIdx}>
                                    <div className={`gx-res r ${q.cls}`}>
                                      <div>
                                        {q.rank}.
                                      </div>
                                      <div className="gx-tc">
                                        <span>
                                          {q.team}
                                        </span>
                                      </div>
                                      <div className="gx-rname">
                                        {q.name}
                                      </div>
                                      <div>
                                        {q.score}
                                      </div>
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={`gx-sc c g5 ${v.gScMode} ${v.gScCls}`} aria-hidden={v.gScHidden}>
                            <div className={`gx-hdr ${v.gHdrCls}`}>
                              Recurve Women Gold Medal Match
                            </div>
                            <div className="r g5">
                              <div className={`gx-t r g0 ${v.gL.cls}`}>
                                <div className={`gx-win ${v.gL.winCls}`}>
                                  Winner
                                </div>
                                <div className="gx-info r g0">
                                  <div className="gx-tc">
                                    <span>
                                      {v.gL.team}
                                    </span>
                                  </div>
                                  <div className="gx-nm c ctr">
                                    <div>
                                      {v.gL.given}
                                    </div>
                                    <div>
                                      {v.gL.family}
                                    </div>
                                  </div>
                                  <div className={`gx-aet c g5 ctr ac ${v.gCond}`}>
                                    <div className="gx-et">
                                      {v.gL.endScore}
                                    </div>
                                    <div className="r g0 gx-arrows">
                                      {(v.gL.arrows || []).map((a, aIdx) => (
                                        <Fragment key={aIdx}>
                                          <div className="gx-ar">
                                            {a.v}
                                          </div>
                                        </Fragment>
                                      ))}
                                    </div>
                                  </div>
                                  <div className={`gx-ends r ctr ${v.gEndsHide}`}>
                                    {(v.gL.ends || []).map((e, eIdx) => (
                                      <Fragment key={eIdx}>
                                        <div className={`gx-es ${e.cls}`}>
                                          {e.v}
                                        </div>
                                      </Fragment>
                                    ))}
                                  </div>
                                </div>
                                <div className="gx-mt r ctr ac">
                                  {v.gL.score}
                                </div>
                              </div>
                              <div className={`gx-t r g0 ${v.gR.cls}`}>
                                <div className={`gx-win ${v.gR.winCls}`}>
                                  Winner
                                </div>
                                <div className="gx-mt r ctr ac">
                                  {v.gR.score}
                                </div>
                                <div className="gx-info r g0">
                                  <div className={`gx-aet c g5 ctr ac ${v.gCond}`}>
                                    <div className="gx-et">
                                      {v.gR.endScore}
                                    </div>
                                    <div className="r g0 gx-arrows">
                                      {(v.gR.arrows || []).map((a, aIdx) => (
                                        <Fragment key={aIdx}>
                                          <div className="gx-ar">
                                            {a.v}
                                          </div>
                                        </Fragment>
                                      ))}
                                    </div>
                                  </div>
                                  <div className={`gx-ends r ctr ${v.gEndsHide}`}>
                                    {(v.gR.ends || []).map((e, eIdx) => (
                                      <Fragment key={eIdx}>
                                        <div className={`gx-es ${e.cls}`}>
                                          {e.v}
                                        </div>
                                      </Fragment>
                                    ))}
                                  </div>
                                  <div className="gx-nm c ctr" style={{textAlign: "right"}}>
                                    <div>
                                      {v.gR.given}
                                    </div>
                                    <div>
                                      {v.gR.family}
                                    </div>
                                  </div>
                                  <div className="gx-tc">
                                    <span>
                                      {v.gR.team}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="gx-rw">
                              <div className={`gx-rn ${v.gRndCls}`}>
                                Round {v.gRound}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div role="group" aria-label="Operator panel" style={{display: "flex", flexWrap: "nowrap", overflowX: "auto", alignItems: "center", gap: "6px", padding: "8px 10px", background: "#17191C", borderTop: "1px solid #2A2D32"}}>
                        <button className={`gop ${v.gPresBtn}`} onClick={v.gTogPres} aria-pressed={v.gPresP}>
                          Presentation
                        </button>
                        <button className={`gop ${v.gQualBtn}`} onClick={v.gTogQual} aria-pressed={v.gQualP}>
                          Quali
                        </button>
                        <button className={`gop ${v.gScBtn}`} onClick={v.gTogSc} aria-pressed={v.gScP}>
                          Scorecard
                        </button>
                        <span style={{width: "1px", height: "24px", background: "#3A3E45", margin: "0 2px"}} />
                        <button className={`gop ${v.gModeCBtn}`} onClick={v.gModeC} aria-pressed={v.gModeCP}>
                          Condensed
                        </button>
                        <button className={`gop ${v.gModeEBtn}`} onClick={v.gModeE} aria-pressed={v.gModeEP}>
                          End score
                        </button>
                        <button className={`gop ${v.gModeRBtn}`} onClick={v.gModeR} aria-pressed={v.gModeRP}>
                          Recap
                        </button>
                        <button className="gop" onClick={v.gNext}>
                          Next round
                        </button>
                        <button className="gop" onClick={v.gClear}>
                          Clear
                        </button>
                      </div>
                    </div>
                    </>
                  )}
                  {v.gfShot2 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
                        <img className="vabs vleft" src="/assets/g-laptop.png" alt="The operator panel on a 13-inch laptop next to OBS" style={{left: "1.250cqw", top: "11.852cqh", width: "45.729cqw", animationDelay: "0.2s"}} />
                        <img className="vabs vright" src="/assets/g-interface.png" alt="The operator panel: competition, match info, round controller and match facts" style={{left: "37.917cqw", top: "6.574cqh", width: "59.115cqw", animationDelay: "0.5s"}} />
                        <p className="vabs vup" style={{margin: "0", left: "5.365cqw", top: "87.778cqh", fontSize: "2.812cqw", fontWeight: "300", whiteSpace: "nowrap", animationDelay: "1s"}}>
                          Interface adaptable for limited screen space
                        </p>
                      </div>
                    </div>
                    </>
                  )}
                  {v.gfShot3 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
                        <p className="vabs vup" style={{margin: "0", left: "5.208cqw", top: "6.481cqh", fontSize: "1.354cqw", color: "#A3A8AE", letterSpacing: ".02em", animationDelay: ".1s"}}>
                          YouTube channel · Oct 2025 – Oct 2026
                        </p>
                        <p className="vabs vup" style={{margin: "0", left: "65.104cqw", top: "11.852cqh", width: "29.688cqw", paddingLeft: "1.458cqw", borderLeft: "0.208cqw solid #3A3E45", fontSize: "1.458cqw", lineHeight: "1.45", color: "#D4D2CD", animationDelay: ".35s"}}>
                          Live streams and cut-down videos from Icelandic archery tournaments that I stream and produce.
                        </p>
                        <div className="vabs vup" style={{left: "5.208cqw", top: "10.926cqh", display: "flex", alignItems: "baseline", gap: "1.250cqw", animationDelay: ".2s"}}>
                          <span style={{fontSize: "7.812cqw", fontWeight: "700", lineHeight: "1", fontVariantNumeric: "tabular-nums"}}>
                            {v.gfViews}
                          </span>
                          <span style={{fontSize: "2.083cqw", color: "#A3A8AE"}}>
                            views
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "5.208cqw", top: "34.444cqh", animationDelay: "0.5s"}}>
                          <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                            42.8K
                          </div>
                          <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                            hours watched
                            <span style={{color: "#3DDC84"}}>
                              ▲ 84%
                            </span>
                          </div>
                        </div>
                        <div className="vabs vup" style={{left: "33.333cqw", top: "34.444cqh", animationDelay: "0.65s"}}>
                          <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                            +1.4K
                          </div>
                          <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                            new subscribers
                            <span style={{color: "#3DDC84"}}>
                              ▲ 52%
                            </span>
                          </div>
                        </div>
                        <div className="vabs vup" style={{left: "61.458cqw", top: "34.444cqh", animationDelay: "0.8s"}}>
                          <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                            3,757
                          </div>
                          <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                            subscribers in total
                          </div>
                        </div>
                        <div className="vabs vfade" style={{left: "0", right: "0", top: "55.556cqh", overflow: "hidden", animationDelay: "1s"}} aria-label="Thumbnails made for the channel" role="img">
                          <div className="gtick">
                            <img src="/assets/t-B_T_G_2.jpg" alt="Barebow team gold medal match" />
                            <img src="/assets/t-Compound_Finals.jpg" alt="Compound finals, live" />
                            <img src="/assets/t-D1_Finals.jpg" alt="Indoor youth championship finals, live" />
                            <img src="/assets/t-D2_Finals.jpg" alt="Outdoor youth championship finals, live" />
                            <img src="/assets/t-L_M_B.jpg" alt="Longbow men bronze medal match" />
                            <img src="/assets/t-L_T_G.jpg" alt="Longbow team gold medal match" />
                            <img src="/assets/t-R_T_G.jpg" alt="Recurve team gold medal match" />
                            <img src="/assets/t-U18_Quali.jpg" alt="Youth qualification, live" />
                            <img src="/assets/t-B_T_G_2.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-Compound_Finals.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-D1_Finals.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-D2_Finals.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-L_M_B.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-L_T_G.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-R_T_G.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-U18_Quali.jpg" alt="" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="vabs vfade" style={{left: "0", right: "0", top: "78.241cqh", overflow: "hidden", animationDelay: "1.15s"}} aria-hidden="true">
                          <div className="gtick rev">
                            <img src="/assets/t-L_M_B.jpg" alt="Longbow men bronze medal match" />
                            <img src="/assets/t-L_T_G.jpg" alt="Longbow team gold medal match" />
                            <img src="/assets/t-R_T_G.jpg" alt="Recurve team gold medal match" />
                            <img src="/assets/t-U18_Quali.jpg" alt="Youth qualification, live" />
                            <img src="/assets/t-B_T_G_2.jpg" alt="Barebow team gold medal match" />
                            <img src="/assets/t-Compound_Finals.jpg" alt="Compound finals, live" />
                            <img src="/assets/t-D1_Finals.jpg" alt="Indoor youth championship finals, live" />
                            <img src="/assets/t-D2_Finals.jpg" alt="Outdoor youth championship finals, live" />
                            <img src="/assets/t-L_M_B.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-L_T_G.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-R_T_G.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-U18_Quali.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-B_T_G_2.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-Compound_Finals.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-D1_Finals.jpg" alt="" aria-hidden="true" />
                            <img src="/assets/t-D2_Finals.jpg" alt="" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  {v.qShot0 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <img className="vabs qpop" src="/assets/qf-logo.png" alt="QuickFlick" style={{left: "18.125cqw", top: "37.778cqh", width: "63.802cqw", animationDelay: ".25s"}} />
                        <p className="vabs vup" style={{margin: "0", left: "0", right: "0", top: "66.667cqh", textAlign: "center", fontSize: "1.771cqw", color: "#6B6F75", animationDelay: ".9s"}}>
                          AI video creation for real estate agents
                        </p>
                      </div>
                    </div>
                    </>
                  )}
                  {v.qShot1 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <img className="cover" src="/assets/qf-davinci.jpg" alt="Before: a traditional video editor with many tracks and panels" />
                        <span className="qchip" style={{left: "2.5cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF"}}>
                          Traditional editor
                        </span>
                        <div className="fill" style={{background: "#FFFFFF", clipPath: `inset(0 0 0 ${v.qfLeft})`}}>
                          <h2 className="vabs vh" style={{left: "0", right: "0", top: "4.444cqh", textAlign: "center", fontSize: "2.917cqw", color: "#FA5FEE", whiteSpace: "nowrap"}}>
                            Simplify complex workflow
                          </h2>
                          <img className="vabs" src="/assets/qf-editor.png" alt="After: the QuickFlick editor, one scene with preview, on-screen text, voice script and media" style={{left: "27.448cqw", top: "14.815cqh", width: "45.104cqw"}} />
                          <span className="qchip" style={{right: "2.5cqw", background: "#FA5FEE", color: "#FFFFFF"}}>
                            QuickFlick
                          </span>
                        </div>
                        <input className="qcmp" type="range" min="0" max="100" value={v.split} onChange={v.onSplit} aria-label="Drag to compare a traditional video editor with QuickFlick" />
                        <div className="qline" aria-hidden="true" style={{position: "absolute", top: "0", bottom: "0", left: `${v.qfLeft}`, width: "0.260cqw", marginLeft: "-0.130cqw", background: "#FA5FEE", pointerEvents: "none", zIndex: "4"}}>
                          <span className="qknob" style={{position: "absolute", top: "50%", left: "50%", width: "3.333cqw", height: "3.333cqw", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#FA5FEE", boxShadow: "0 0.556cqh 1.667cqh rgba(17,18,20,.35)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{width: "55%", height: "55%"}} aria-hidden="true">
                              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  {v.qShot2 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <img className="vabs vrise" src="/assets/qf-voices.png" alt="AI voice picker with voice cards" style={{left: "26.302cqw", top: "5.648cqh", width: "45.052cqw", animationDelay: "0.45s"}} />
                        <img className="vabs vrise" src="/assets/qf-grid.png" alt="Scene layout grid" style={{left: "23.177cqw", top: "50.741cqh", width: "35.990cqw", animationDelay: "0.8s"}} />
                        <img className="vabs vrise" src="/assets/qf-pricing.png" alt="Pricing plans" style={{left: "1.979cqw", top: "22.500cqh", width: "45.312cqw", animationDelay: "1.15s"}} />
                        <img className="vabs vrise" src="/assets/qf-signup.png" alt="Sign-in form" style={{left: "71.719cqw", top: "4.630cqh", width: "24.792cqw", animationDelay: "1.5s"}} />
                        <img className="vabs vrise" src="/assets/qf-watermark.png" alt="Watermark settings over a video preview" style={{left: "61.562cqw", top: "56.296cqh", width: "35.990cqw", animationDelay: "1.85s"}} />
                        <h2 className="vabs vh vwipe" style={{left: "5.208cqw", top: "85.370cqh", fontSize: "2.708cqw", color: "#FA5FEE", whiteSpace: "nowrap", animationDelay: "0.2s"}}>
                          Solo UI designer and frontend engineer
                        </h2>
                      </div>
                    </div>
                    </>
                  )}
                  {v.qShot3 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <h2 className="vabs vh vwipe" style={{left: "5.208cqw", top: "5.370cqh", fontSize: "2.708cqw", color: "#FA5FEE", whiteSpace: "nowrap", animationDelay: "0.2s"}}>
                          Ads in every format
                        </h2>
                        <div className="vabs vup" style={{left: "5.208cqw", top: "15.741cqh", width: "45.833cqw", height: "45.833cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.4s"}}>
                          <video src="/assets/qf-ad-demo.mp4" poster="/assets/qf-ad-demo.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Product demo ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            16:9 · Product demo
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "5.208cqw", top: "64.352cqh", width: "17.188cqw", height: "30.556cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.6s"}}>
                          <video src="/assets/qf-ad-square.mp4" poster="/assets/qf-ad-square.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Square video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            1:1
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "23.958cqw", top: "64.352cqh", width: "27.083cqw", height: "27.130cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.75s"}}>
                          <video src="/assets/qf-ad-landscape.mp4" poster="/assets/qf-ad-landscape.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Landscape video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            16:9
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "53.125cqw", top: "15.741cqh", width: "25.104cqw", height: "79.352cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.9s"}}>
                          <video src="/assets/qf-ad-portrait.mp4" poster="/assets/qf-ad-portrait.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Vertical video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            9:16
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "80.312cqw", top: "15.741cqh", width: "15.625cqw", height: "34.722cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "1.05s"}}>
                          <img src="/assets/qf-insta2.jpg" alt="Instagram post: Instant Listing Videos" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            4:5
                          </span>
                        </div>
                        <div className="vabs vup" style={{left: "80.312cqw", top: "53.241cqh", width: "15.625cqw", height: "34.722cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "1.2s"}}>
                          <img src="/assets/qf-insta4.jpg" alt="Instagram post: Easy Editing" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
                          <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                            4:5
                          </span>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  {v.vShot0 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs" style={{background: "#101113"}}>
                        <img className="cover" src="/assets/vorn-bg.jpg" alt="" />
                        <img className="vabs vup" src="/assets/vorn-slid1_phone.png" alt="Vörn home screen: today's inspections with status and a start button" style={{left: "38.281cqw", top: "7.407cqh", width: "23.438cqw", animationDelay: "2.05s"}} />
                        <img className="cover vcutout" src="/assets/vorn-splash.jpg" alt="Vörn, Fire Safety Inspection App" style={{animationDelay: "2s"}} />
                      </div>
                    </div>
                    </>
                  )}
                  {v.vShot1 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <div className="vred vwipe" style={{left: "2.031cqw", top: "4.630cqh", width: "39.583cqw", height: "90.556cqh", padding: "4.815cqh 3.333cqw"}}>
                          <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".3s"}}>
                            Redesign of in-use app
                          </h2>
                          <p className="vup" style={{margin: "5.185cqh 0 0", fontSize: "1.667cqw", fontWeight: "500", animationDelay: ".45s"}}>
                            Challenges:
                          </p>
                          <ul style={{listStyle: "none", margin: "3.148cqh 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "2.407cqh", fontSize: "1.875cqw", lineHeight: "1.25"}}>
                            <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.55s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                A ten-year-old app used every day
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.70s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                An overview screen inspectors found confusing
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.85s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Used while walking, talking and handling equipment
                              </span>
                            </li>
                          </ul>
                        </div>
                        <img className="vabs vup" src="/assets/vorn-slid2_phone1.png" alt="Original app: a long list of inspection categories with counts" style={{left: "48.021cqw", top: "7.963cqh", width: "22.292cqw", animationDelay: "0.5s"}} />
                        <img className="vabs vup" src="/assets/vorn-slid2_phone2.png" alt="Original app: a list of inspections with raw field values" style={{left: "73.646cqw", top: "7.963cqh", width: "22.292cqw", animationDelay: "0.7s"}} />
                      </div>
                    </div>
                    </>
                  )}
                  {v.vShot2 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <div className="vred vwipe" style={{left: "2.344cqw", top: "4.815cqh", height: "11.111cqh", padding: "0 2.656cqw", display: "flex", alignItems: "center"}}>
                          <h2 className="vh" style={{fontSize: "2.396cqw", whiteSpace: "nowrap"}}>
                            Map the flow. Set the look. Test in lo-fi.
                          </h2>
                        </div>
                        <img className="vabs vrise" src="/assets/vorn-slid3_map.png" alt="Flow diagram of the new inspection flow" style={{left: "2.344cqw", top: "19.444cqh", width: "53.177cqw", animationDelay: "0.5s"}} />
                        <img className="vabs vrise" src="/assets/vorn-slid3_inspo.png" alt="Mood board of reference apps" style={{left: "57.500cqw", top: "19.444cqh", width: "20.885cqw", animationDelay: "0.85s"}} />
                        <img className="vabs vrise" src="/assets/vorn-slid3_colors.png" alt="Colour palette, type and icons" style={{left: "6.458cqw", top: "49.722cqh", width: "23.958cqw", animationDelay: "1.2s"}} />
                        <img className="vabs vrise" src="/assets/vorn-slid3_lofi.png" alt="Lo-fi screens: home, inspection, floor plan and an item detail" style={{left: "34.740cqw", top: "36.204cqh", width: "60.573cqw", animationDelay: "1.55s"}} />
                        <span className="vabs vwipe" style={{left: "3.385cqw", top: "21.111cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "0.85s"}}>
                          Workflow map
                        </span>
                        <span className="vabs vwipe" style={{left: "58.542cqw", top: "21.111cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.2s"}}>
                          Mood board
                        </span>
                        <span className="vabs vwipe" style={{left: "7.500cqw", top: "51.389cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.55s"}}>
                          Palette
                        </span>
                        <span className="vabs vwipe" style={{left: "35.781cqw", top: "37.870cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.9s"}}>
                          Lo-fi screens
                        </span>
                      </div>
                    </div>
                    </>
                  )}
                  {v.vShot3 && (
                    <>
                    <div className={`fill ${v.trClass}`}>
                      <div className="vs">
                        <div className="vred vwipe" style={{left: "58.333cqw", top: "4.630cqh", width: "39.635cqw", height: "90.556cqh", padding: "4.815cqh 3.333cqw"}}>
                          <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".35s"}}>
                            Final UI
                          </h2>
                          <ul style={{listStyle: "none", margin: "3.704cqh 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "1.852cqh", fontSize: "1.562cqw", lineHeight: "1.25"}}>
                            <li className="vleft" style={{display: "flex", gap: "1.146cqw", animationDelay: "0.60s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Status and next action in one place
                              </span>
                            </li>
                            <li className="vleft" style={{display: "flex", gap: "1.146cqw", animationDelay: "0.75s"}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                                <path d="M4 12h16M14 6l6 6-6 6" />
                              </svg>
                              <span>
                                Findings marked on the building's own drawings
                              </span>
                            </li>
                          </ul>
                        </div>
                        <img className="vabs vup" src="/assets/vorn-slid4_phone3.png" alt="Final design: photo capture screen" style={{left: "0.000cqw", top: "10.185cqh", width: "11.302cqw", animationDelay: "0.2s"}} />
                        <img className="vabs vup" src="/assets/vorn-slid4_phone2.png" alt="Final design: inspection summary with logged items and their status" style={{left: "12.292cqw", top: "10.185cqh", width: "18.698cqw", animationDelay: "0.35s"}} />
                        <img className="vabs vup" src="/assets/vorn-slid4_phone1.png" alt="Final design: active inspection with timer and logged items" style={{left: "31.615cqw", top: "8.333cqh", width: "21.823cqw", animationDelay: "0.5s"}} />
                        <img className="vabs vright" src="/assets/vorn-slid4_ipad.png" alt="Final design on iPad: the building floor plan" style={{left: "70.833cqw", top: "36.574cqh", width: "29.167cqw", animationDelay: "0.85s"}} />
                        <img className="vabs vup" src="/assets/vorn-slid4_phone4_blueprint.png" alt="Final design on phone: findings marked on the floor plan" style={{left: "61.458cqw", top: "50.000cqh", width: "12.969cqw", animationDelay: "1.1s"}} />
                        <span className="vabs vfade" style={{left: "2.500cqw", top: "91.667cqh", fontSize: "0.990cqw", color: "#6B6F75", whiteSpace: "nowrap", animationDelay: "1.3s"}}>
                          Interaction flow & layout · Team of three · .NET MAUI · Bachelor capstone, graded 9.0 · Then hired by the fire service
                        </span>
                      </div>
                    </div>
                    </>
                  )}
                </div>
                {v.isProject && (
                  <>
                  <nav aria-label="Shots" style={{display: "flex", alignItems: "center", gap: "4px", padding: "6px 8px", background: "#141619", borderTop: "1px solid #23262B"}}>
                    <button className="sbtn arrow" onClick={v.prevShot} aria-label="Previous shot">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    {(v.shots || []).map((sh, shIdx) => (
                      <Fragment key={shIdx}>
                        <button className={`sbtn ${sh.cls}`} onClick={sh.pick} aria-current={sh.current}>
                          <span className="dot" />
                          {sh.num}
                          <span className="lbl">
                            {sh.label}
                          </span>
                          <span className="sprog" style={{width: `${sh.prog}`}} />
                        </button>
                      </Fragment>
                    ))}
                    <button className="sbtn arrow" onClick={v.nextShot} aria-label="Next shot">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <span style={{marginLeft: "auto", paddingRight: "8px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#A3A8AE", opacity: ".6"}}>
                      SHOT {v.shotNum}/4
                    </span>
                  </nav>
                  </>
                )}
              </div>
            </div>
            <div className="crblock" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <span className="mono" style={{fontSize: "13px", color: "#A3A8AE", opacity: ".6"}}>
                CG · CREDITS
              </span>
              <div className="crgrid" style={{boxSizing: "border-box", border: "2px solid #2A2D32", borderRadius: "6px", background: "#141619", padding: "12px 20px", display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1.1fr) minmax(0,1.3fr) minmax(0,.8fr)", gap: "20px"}} aria-label="Credits for the project on air">
                {(v.credits || []).map((c, cIdx) => (
                  <Fragment key={cIdx}>
                    <div className="pop" style={{display: "flex", flexDirection: "column", gap: "3px", minWidth: "0"}}>
                      <span className="mono" style={{fontSize: "11px", letterSpacing: ".08em", color: "#A3A8AE", opacity: ".7"}}>
                        {c.k}
                      </span>
                      <span style={{fontSize: "14px", lineHeight: "1.35", color: "#E8E6E1"}}>
                        {c.v}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="auxblock" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <span className="mono" style={{fontSize: "13px", color: "#A3A8AE", opacity: ".6"}}>
                AUX · CONTACT
              </span>
              <div style={{boxSizing: "border-box", border: "2px solid #2A2D32", borderRadius: "6px", background: "#141619", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap"}}>
                <span style={{fontSize: "15px", lineHeight: "1.45", color: "#D4D2CD", maxWidth: "420px"}}>
                  Looking for product design and design-engineering work in Stockholm, the Nordics or remote in Europe.
                </span>
                <div className="mono" style={{display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: "13px", justifyContent: "flex-end"}}>
                  <a href="mailto:oliverormar5@gmail.com">
                    oliverormar5@gmail.com
                  </a>
                  <a href="https://linkedin.com/in/oliver-ormar-ingvarsson">
                    LinkedIn
                  </a>
                  <a href="/Oliver_Ormar_Ingvarsson_CV.pdf" target="_blank" rel="noopener">
                    CV (PDF)
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div className="rise-in" style={{position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "20", display: "flex", justifyContent: "center", pointerEvents: "none"}}>
          <div className={`dock ${v.dockCls}`} role="group" aria-label="Switcher" style={{position: "relative", width: "1120px", height: "264px", borderRadius: "30px 30px 0 0", overflow: "hidden", pointerEvents: "auto", background: "linear-gradient(180deg, #34383D 0%, #24272B 12%, #1C1E21 100%)", boxShadow: "0 -24px 70px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.22), inset 0 0 0 1px rgba(255,255,255,.04)"}}>
            <svg className="dockbrush" aria-hidden="true" width="1120" height="264" style={{position: "absolute", inset: "0", mixBlendMode: "overlay", opacity: ".55", pointerEvents: "none"}}>
              <filter id="brushMain">
                <feTurbulence type="fractalNoise" baseFrequency="0.003 0.85" numOctaves="2" seed="4" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="1120" height="264" filter="url(#brushMain)" />
            </svg>
            <span className="screw" style={{top: "16px", left: "22px"}} />
            <span className="screw" style={{top: "16px", right: "22px"}} />
            <div className="dockhead" aria-hidden="true" style={{position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", height: "44px", display: "flex", alignItems: "center", gap: "10px"}}>
              <span className="eng">
                M/E 1
              </span>
              <span className="grip" />
              <span className="eng">
                SWITCHER
              </span>
            </div>
            <div className="dockrow" style={{position: "absolute", top: "58px", left: "40px", right: "40px", display: "flex", gap: "24px", alignItems: "stretch"}}>
              <div className="well w-audio" aria-hidden="true" style={{padding: "18px 20px 24px", display: "flex", flexDirection: "column", gap: "12px"}}>
                <span className="eng">
                  AUDIO
                </span>
                <div style={{display: "flex", gap: "10px", alignItems: "flex-end"}}>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "120px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#6E747A", textAlign: "right"}}>
                    <span>
                      0
                    </span>
                    <span>
                      -6
                    </span>
                    <span>
                      -12
                    </span>
                    <span>
                      -24
                    </span>
                    <span>
                      -48
                    </span>
                  </div>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
                    <div style={{display: "flex", flexDirection: "column-reverse", gap: "2px", padding: "3px", borderRadius: "3px", background: "#040506", boxShadow: "inset 0 1px 3px #000"}}>
                      {(v.meterL || []).map((m, mIdx) => (
                        <Fragment key={mIdx}>
                          <span className={`vu ${m.cls}`} />
                        </Fragment>
                      ))}
                    </div>
                    <span className="eng" style={{fontSize: "10px"}}>
                      L
                    </span>
                  </div>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
                    <div style={{display: "flex", flexDirection: "column-reverse", gap: "2px", padding: "3px", borderRadius: "3px", background: "#040506", boxShadow: "inset 0 1px 3px #000"}}>
                      {(v.meterR || []).map((m, mIdx) => (
                        <Fragment key={mIdx}>
                          <span className={`vu ${m.cls}`} />
                        </Fragment>
                      ))}
                    </div>
                    <span className="eng" style={{fontSize: "10px"}}>
                      R
                    </span>
                  </div>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: "8px"}}>
                    <span className="knob" />
                    <span className="eng" style={{fontSize: "10px"}}>
                      MIC
                    </span>
                    <span className="knob" style={{transform: "rotate(40deg)"}} />
                    <span className="eng" style={{fontSize: "10px"}}>
                      PGM
                    </span>
                  </div>
                </div>
              </div>
              <div className="well w-in" style={{padding: "18px 22px 24px", display: "flex", flexDirection: "column", gap: "12px"}}>
                <span className="eng">
                  INPUT
                </span>
                <div style={{display: "flex", gap: "16px"}}>
                  {(v.sKeys || []).map((k, kIdx) => (
                    <Fragment key={kIdx}>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span className="oled">
                          {k.short}
                        </span>
                        <button className={`k ${k.cls}`} onClick={k.pick} aria-pressed={k.pressed} aria-label={k.label}>
                          {k.n}
                        </button>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="well w-tr" style={{padding: "18px 22px 24px", display: "flex", flexDirection: "column", gap: "12px", marginLeft: "auto"}}>
                <span className="eng">
                  TRANSITION
                </span>
                <span className="oled" style={{width: "244px"}}>
                  {v.nextLine}
                </span>
                <div style={{display: "flex", gap: "16px"}}>
                  <button className={`k autok ${v.autoCls}`} data-auto="1" onClick={v.toggleAuto} aria-pressed={v.autoPressed} aria-label="Auto-play">
                    AUTO
                  </button>
                  <button className={`k cutk ${v.cutCls}`} onClick={v.cut} aria-label={`Cut to ${v.pvwLabel}`}>
                    CUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

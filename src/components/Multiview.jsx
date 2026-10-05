/* Multiview one-pager: state, switcher logic and the page layout.
   renderVals() turns state + props into a flat view model `v` that the
   presentational components (./*.jsx, ./shots/*.jsx) read from. */
import { Component, Fragment } from 'react';
import { projects } from '../data/projects.js';
import { graphicsDemoVals } from '../lib/graphicsDemo.js';
import { autoplayMethods } from '../lib/autoplay.js';
import Surface from './Surface.jsx';
import Header from './Header.jsx';
import Sources from './Sources.jsx';
import PreviewMonitor from './PreviewMonitor.jsx';
import Slate from './Slate.jsx';
import BogfimiShots from './shots/BogfimiShots.jsx';
import GraphicsShots from './shots/GraphicsShots.jsx';
import QuickFlickShots from './shots/QuickFlickShots.jsx';
import VornShots from './shots/VornShots.jsx';
import ShotBar from './ShotBar.jsx';
import CreditsStrip from './CreditsStrip.jsx';
import ContactStrip from './ContactStrip.jsx';
import Switcher from './Switcher.jsx';

export default class Multiview extends Component {
  static defaultProps = {"accent": "#F2A93B", "transition": "wipe", "glow": 40, "texture": 40, "brightness": 25, "depth": 100, "size": 300, "light": 28, "warmth": 70, "lampX": 52, "lampY": 24, "spread": 70, "stretch": 170, "angle": -21, "softness": 75, "rake": 40, "vignette": 40, "l2on": true, "l2light": 25, "l2warmth": 55, "l2x": 97, "l2y": 74, "l2spread": 65, "l2stretch": 170, "l2angle": -29, "l2soft": 85, "l2rake": 40, "l3on": true, "l3light": 27, "l3warmth": 75, "l3x": 10, "l3y": 95, "l3spread": 70, "l3stretch": 170, "l3angle": -39, "l3soft": 80, "l3rake": 50};

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
  doCut() {
    const s = this.state;
    if (s.pgm === s.pvw) return;
    this.setState({ pgm: s.pvw, pvw: s.pgm, shot: 0, flash: true });
    clearTimeout(this.flashT);
    this.flashT = setTimeout(() => this.setState({ flash: false }), 160);
  }
  renderVals(st = this.state, isUnder = false) {
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
    if (!isUnder && gRes && !this.gResStart) this.gResStart = Date.now();
    if (!isUnder && !gRes) this.gResStart = 0;
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
      ...graphicsDemoVals(st, (o) => this.setState(o)),

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
    // Keep the outgoing shot visible underneath while the next one wipes in.
    // Decided during render so the very first frame of a new shot already has it.
    const st = this.state;
    if (this.shown && (this.shown.pgm !== st.pgm || this.shown.shot !== st.shot)) {
      this.under = { pgm: this.shown.pgm, shot: this.shown.shot, until: Date.now() + 800 };
    }
    this.shown = { pgm: st.pgm, shot: st.shot };
    const v = this.renderVals();
    const u = this.under;
    const under = u && Date.now() < u.until ? this.renderVals({ ...this.state, pgm: u.pgm, shot: u.shot }, true) : null;
    return (
      <div className="pagepad" style={{"--glow": `${v.glow}`, "--tex": `${v.tex}`, "--tsize": `${v.tsize}`, "--tcon": `${v.tcon}`, "--tbri": `${v.tbri}`, "--light": `${v.light}`, "--lamp": `${v.lamp}`, "--lx": `${v.lx}`, "--ly": `${v.ly}`, "--lw": `${v.lw}`, "--lr": `${v.lr}`, "--la": `${v.la}`, "--lhard": `${v.lhard}`, "--vig": `${v.vig}`, "--rake": `${v.rake}`, position: "relative", overflow: "hidden", minHeight: "100vh", boxSizing: "border-box", padding: "0 24px", fontFamily: "'Barlow', sans-serif", color: "#E8E6E1", background: "#121314", display: "flex", flexDirection: "column", gap: "24px"}}>
        <Surface v={v} />
        <Header v={v} />
        <main className="layer mv">
          <div className="leftcol" style={{display: "flex", flexDirection: "column", gap: "22px"}}>
            <Sources v={v} />
            <PreviewMonitor v={v} />
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
                  {under && (
                    <div className="under" aria-hidden="true" inert="">
                      <ProgramShots v={under} />
                    </div>
                  )}
                  <ProgramShots v={v} />
                </div>
                <div className="cgline mono" aria-label="Credits">
                  <span className="cgtag">CG</span>
                  {v.credits.map((c) => (
                    <span className="cgitem" key={c.k}>{c.v}</span>
                  ))}
                </div>
                <ShotBar v={v} />
              </div>
            </div>
            <CreditsStrip v={v} />
            <ContactStrip v={v} />
          </section>
        </main>
        <Switcher v={v} />
      </div>
    );
  }
}

/** Everything that can be on air in the program window. */
function ProgramShots({ v }) {
  return (
    <>
      <Slate v={v} />
      <BogfimiShots v={v} />
      <GraphicsShots v={v} />
      <QuickFlickShots v={v} />
      <VornShots v={v} />
    </>
  );
}

Object.assign(Multiview.prototype, autoplayMethods);

/* Auto-play: runs the switcher on its own. Mixed into Multiview.prototype.
   Order: Vörn → QuickFlick → Graphics Engine → Bogfimisetrið; the next project
   always goes to preview before the cut. Any click or key press stops it. */
export const autoplayMethods = {
  clearAutoTimers() {
    (this.autoT || []).forEach((t) => { clearTimeout(t); clearInterval(t); });
    this.autoT = [];
  },

  later(ms, fn) { this.autoT.push(setTimeout(fn, ms)); },

  tween(key, from, to, ms, delay) {
    this.later(delay, () => {
      const t0 = Date.now();
      const iv = setInterval(() => {
        const k = Math.min(1, (Date.now() - t0) / ms);
        const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        this.setState({ [key]: from + (to - from) * e });
        if (k >= 1) clearInterval(iv);
      }, 16);
      this.autoT.push(iv);
    });
  },

  autoOrder() { return [1, 0, 2, 3]; },

  nextInOrder(i) {
    const o = this.autoOrder();
    const at = o.indexOf(i);
    return o[(at + 1) % o.length];
  },

  shotDuration(key, i) {
    if (key === 'gfx' && i === 1) return 14000;
    if ((key === 'qf' || key === 'bog') && i === 1) return 9000;
    if ((key === 'vorn' || key === 'qf' || key === 'bog') && i === 2) return 9000;
    if (key === 'gfx' && i === 3) return 9000;
    return 6000;
  },

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
  },

  stopAuto() {
    this.clearAutoTimers();
    this.autoPending = false;
    this.autoPaused = false;
    if (this.state.auto) this.setState({ auto: false });
  },

  autoCut(next) {
    const s = this.state;
    this.setState({ pgm: next, pvw: s.pgm === 'slate' ? this.nextInOrder(next) : s.pgm, shot: 0, flash: true });
    clearTimeout(this.flashT);
    this.flashT = setTimeout(() => this.setState({ flash: false }), 160);
    this.later(20, () => this.playShot(0));
  },

  playShot(i) {
    this.clearAutoTimers();
    const st = this.state;
    if (st.pgm === 'slate') return;
    const key = this.projects[st.pgm].key;
    const dur = this.shotDuration(key, i);
    this.setState({ shot: i });
    this.shotStart = Date.now();
    this.shotDur = dur;
    if (key === 'qf' && i === 1) { this.setState({ split: 80 }); this.tween('split', 80, 8, 3000, 1400); this.tween('split', 8, 50, 1800, 6200); }
    if (key === 'bog' && i === 1) { this.setState({ bSplit: 80 }); this.tween('bSplit', 80, 8, 3000, 1400); this.tween('bSplit', 8, 50, 1800, 6200); }
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
};

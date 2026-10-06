/* State for the Graphics Engine "Try it" shot: a five-end recurve final, set points, and the operator buttons. */
  export function graphicsDemoVals(st, setState) {
    const L = { team: 'BFB', given: 'Oliver Ormar', family: 'Ingvarsson', ends: [[9, 10, 9], [10, 9, 8], [9, 9, 10], [10, 10, 9], [9, 10, 10]] };
    const R = { team: 'HRÓ', given: 'Gunnar', family: 'Sigurðsson', ends: [[10, 9, 9], [10, 10, 8], [8, 9, 9], [10, 9, 9], [9, 9, 9]] };
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
      ['BFB', 'Oliver Ormar Ingvarsson', 571], ['HRÓ', 'Gunnar Sigurðsson', 566], ['BFB', 'Jón Helgason', 558], ['ÚLF', 'Einar Kristjánsson', 552],
      ['HRÓ', 'Páll Ólafsson', 547], ['ÚLF', 'Davíð Magnússon', 541], ['BFB', 'Arnar Pétursson', 533], ['HRÓ', 'Bjarki Þórsson', 526]
    ].map((r, i) => ({ rank: String(i + 1), team: r[0], name: r[1], score: String(r[2]), cls: i < 2 ? 'inMatch' : '' }));
    const set = setState;
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

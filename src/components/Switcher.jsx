import { Fragment } from 'react';

/** Studio switcher: audio meter, input keys, AUTO and CUT. `v` is the view model from Multiview.renderVals(). */
export default function Switcher({ v }) {
  return (
    <>
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
    </>
  );
}

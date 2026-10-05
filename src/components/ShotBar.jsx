import { Fragment } from 'react';

/** Shot navigation under the program window, with the auto-play progress line. `v` is the view model from Multiview.renderVals(). */
export default function ShotBar({ v }) {
  return (
    <>
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
    </>
  );
}

import { Fragment } from 'react';

/** CG credits strip: role, team, tools, year. `v` is the view model from Multiview.renderVals(). */
export default function CreditsStrip({ v }) {
  return (
    <>
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
    </>
  );
}

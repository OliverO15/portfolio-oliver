/** Large preview monitor (hidden on mobile). `v` is the view model from Multiview.renderVals(). */
export default function PreviewMonitor({ v }) {
  return (
    <>
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
    </>
  );
}

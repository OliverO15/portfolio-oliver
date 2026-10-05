/** Name, title, ON AIR chip and timecode. `v` is the view model from Multiview.renderVals(). */
export default function Header({ v }) {
  return (
    <>
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
    </>
  );
}

/** Opening slate before any project is on air. `v` is the view model from Multiview.renderVals(). */
export default function Slate({ v }) {
  return (
    <>
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
    </>
  );
}

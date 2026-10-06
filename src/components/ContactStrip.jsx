/** AUX contact strip. `v` is the view model from Multiview.renderVals(). */
export default function ContactStrip({ v }) {
  return (
    <>
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
            <a href="https://www.linkedin.com/in/oliver-ormar-ingvarsson-625961174" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href="/Oliver_Ormar_Ingvarsson_CV.pdf" target="_blank" rel="noopener">
              CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import { Fragment } from "react";

/** The four projects as camera sources. Clicking one puts it on air. `v` is the view model from Multiview.renderVals(). */
export default function Sources({ v }) {
  return (
    <>
      <div
        className="srcblock"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <div
          className="srclabel mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "#A3A8AE", opacity: ".75" }}>SOURCES</span>
        </div>
        <section className="sources" aria-label="Projects">
          {(v.sources || []).map((s, sIdx) => (
            <Fragment key={sIdx}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <button
                  className={`tile ${s.cls}`}
                  onClick={s.pick}
                  aria-label={`Put ${s.title} on air`}
                >
                  <div className="hatch">
                    <img className="cover" src={s.img} alt="" />
                  </div>
                </button>
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#A3A8AE", opacity: ".7" }}>
                    CAM {s.num} · {s.short}
                  </span>
                  <span style={{ color: `${s.tallyColor}`, opacity: ".85" }}>
                    {s.tally}
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </section>
      </div>
    </>
  );
}

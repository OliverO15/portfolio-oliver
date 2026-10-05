/** Bogfimisetrið: title card, before/after slider, modular theme, ads and bookings. `v` is the view model from Multiview.renderVals(). */
export default function BogfimiShots({ v }) {
  return (
    <>
      {v.bShot0 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs" style={{background: "#DDD"}}>
            <img className="cover vfade" src="/assets/b-bg.jpg" alt="" />
            <img className="vabs qpop" src="/assets/b-logo.png" alt="Bogfimisetrið" style={{left: "13.021cqw", top: "13.426cqh", width: "73.906cqw", animationDelay: "0.3s"}} />
          </div>
        </div>
        </>
      )}
      {v.bShot1 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <div className="vabs" style={{left: "4.948cqw", top: "10.926cqh", width: "32.292cqw"}}>
              <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".2s"}}>
                Goals:
              </h2>
              <ul style={{listStyle: "none", margin: "2.407cqh 0 0 1.875cqw", padding: "0", display: "flex", flexDirection: "column", gap: "2.037cqh", fontSize: "2.083cqw", lineHeight: "1.22"}}>
                <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.45s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Modern UI
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.60s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    A clear message for first-time visitors
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.75s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Booking online instead of by phone
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.042cqw", animationDelay: "0.90s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".14em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Pages staff can build without code
                  </span>
                </li>
              </ul>
            </div>
            <div className="vabs vright" style={{left: "39.271cqw", top: "5.093cqh", width: "57.135cqw", height: "89.815cqh", animationDelay: ".3s"}}>
              <img src="/assets/b-old.png" alt="Before: the old Bogfimisetrið site, a standard shop theme with prices in plain tables" style={{position: "absolute", inset: "0", width: "100%", height: "100%"}} />
              <span className="qchip" style={{left: "2cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF"}}>
                Old site
              </span>
              <div style={{position: "absolute", inset: "0", clipPath: `inset(0 0 0 ${v.bLeft})`}}>
                <img src="/assets/b-new.png" alt="After: the new site with a photo hero, opening hours, prices and a booking button" style={{position: "absolute", inset: "0", width: "100%", height: "100%"}} />
                <span className="qchip" style={{right: "2cqw", background: "#0077C8", color: "#FFFFFF"}}>
                  New site
                </span>
              </div>
              <input className="qcmp" type="range" min="0" max="100" value={v.bSplit} onChange={v.bOnSplit} aria-label="Drag to compare the old and new Bogfimisetrið site" />
              <div className="qline" aria-hidden="true" style={{position: "absolute", top: "-2.315cqh", bottom: "-2.315cqh", left: `${v.bLeft}`, width: "0.469cqw", marginLeft: "-0.234cqw", borderRadius: "0.260cqw", background: "#0077C8", pointerEvents: "none", zIndex: "4"}}>
                <span className="qknob" style={{position: "absolute", top: "50%", left: "50%", width: "3.333cqw", height: "3.333cqw", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#0077C8", boxShadow: "0 0.556cqh 1.667cqh rgba(17,18,20,.35)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{width: "55%", height: "55%"}} aria-hidden="true">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      {v.bShot2 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <h2 className="vabs vh vup" style={{left: "3.281cqw", top: "6.481cqh", fontSize: "3.021cqw", lineHeight: "1.12", animationDelay: ".15s"}}>
              Custom built modular
              <br />
              WordPress theme
            </h2>
            <img className="vabs vup" src="/assets/b-example.png" alt="An example page, Hópar, built from the section library" style={{left: "3.229cqw", top: "23.148cqh", width: "45.104cqw", animationDelay: "0.35s"}} />
            <div className="vabs vfade" style={{left: "50.000cqw", top: "0", width: "48.333cqw", height: "100%", overflow: "hidden", WebkitMaskImage: "linear-gradient(transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(transparent,#000 8%,#000 92%,transparent)", animationDelay: ".5s"}} role="img" aria-label="Sections from the theme's library">
              <div className="bmods">
                <img src="/assets/b-mod84.png" alt="Hero section" />
                <img src="/assets/b-mod87.png" alt="Opening hours and prices with booking" />
                <img src="/assets/b-mod88.png" alt="How it works, in three steps" />
                <img src="/assets/b-mod89.png" alt="Where we are, with map" />
                <img src="/assets/b-mod90.png" alt="Group booking guidelines" />
                <img src="/assets/b-mod91.png" alt="Questions and contact" />
                <img src="/assets/b-mod92.png" alt="Partner club" />
                <img src="/assets/b-mod84.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod87.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod88.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod89.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod90.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod91.png" alt="" aria-hidden="true" />
                <img src="/assets/b-mod92.png" alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      {v.bShot3 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <h2 className="vabs vh vup" style={{left: "3.646cqw", top: "6.111cqh", fontSize: "2.604cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: ".15s"}}>
              Advertising & Conversion Tracking
            </h2>
            <img className="vabs vup" src="/assets/b-ad-45.png" alt="Ad, 4:5: Prófaðu Bogfimi!" style={{left: "3.542cqw", top: "15.463cqh", width: "21.458cqw", animationDelay: "0.35s"}} />
            <img className="vabs vup" src="/assets/b-ad-11.png" alt="Ad, 1:1: Vinahópurinn í bogfimi" style={{left: "26.510cqw", top: "15.463cqh", width: "27.031cqw", animationDelay: "0.5s"}} />
            <img className="vabs vup" src="/assets/b-ad-wide.png" alt="Wide ad: Prófaðu Bogfimi!" style={{left: "3.542cqw", top: "65.833cqh", width: "45.938cqw", animationDelay: "0.65s"}} />
            <img className="vabs vfade" src="/assets/b-noona-logo.png" alt="Noona HQ" style={{left: "57.292cqw", top: "16.852cqh", width: "9.896cqw", animationDelay: "0.9s"}} />
            <img className="vabs vright" src="/assets/b-noona-results.png" alt="Noona HQ, September 2026: 148 bookings, by origin HQ 73, Noona 53, booking link 22" style={{left: "57.135cqw", top: "22.593cqh", width: "40.208cqw", animationDelay: "0.9s"}} />
            <p className="vabs vup" style={{margin: "0", left: "58.646cqw", top: "87.037cqh", fontSize: "2.604cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.3s"}}>
              Already half of bookings online
            </p>
            <p className="vabs vup" style={{margin: "0", left: "58.750cqw", top: "94.259cqh", fontSize: "1.198cqw", color: "#6B6F75", whiteSpace: "nowrap", animationDelay: "1.45s"}}>
              September 2026: 75 of 148 bookings made online
            </p>
          </div>
        </div>
        </>
      )}
    </>
  );
}

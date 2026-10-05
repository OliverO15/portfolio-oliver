/** Vörn: title card, before, process collage, final UI. `v` is the view model from Multiview.renderVals(). */
export default function VornShots({ v }) {
  return (
    <>
      {v.vShot0 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs" style={{background: "#101113"}}>
            <img className="cover" src="/assets/vorn-bg.jpg" alt="" />
            <img className="vabs vup" src="/assets/vorn-slid1_phone.png" alt="Vörn home screen: today's inspections with status and a start button" style={{left: "38.281cqw", top: "7.407cqh", width: "23.438cqw", animationDelay: "2.05s"}} />
            <img className="cover vcutout" src="/assets/vorn-splash.jpg" alt="Vörn, Fire Safety Inspection App" style={{animationDelay: "2s"}} />
          </div>
        </div>
        </>
      )}
      {v.vShot1 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <div className="vred vwipe" style={{left: "2.031cqw", top: "4.630cqh", width: "39.583cqw", height: "90.556cqh", padding: "4.815cqh 3.333cqw"}}>
              <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".3s"}}>
                Redesign of in-use app
              </h2>
              <p className="vup" style={{margin: "5.185cqh 0 0", fontSize: "1.667cqw", fontWeight: "500", animationDelay: ".45s"}}>
                Challenges:
              </p>
              <ul style={{listStyle: "none", margin: "3.148cqh 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "2.407cqh", fontSize: "1.875cqw", lineHeight: "1.25"}}>
                <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.55s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    A ten-year-old app used every day
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.70s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    An overview screen inspectors found confusing
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.354cqw", animationDelay: "0.85s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Used while walking, talking and handling equipment
                  </span>
                </li>
              </ul>
            </div>
            <img className="vabs vup" src="/assets/vorn-slid2_phone1.png" alt="Original app: a long list of inspection categories with counts" style={{left: "48.021cqw", top: "7.963cqh", width: "22.292cqw", animationDelay: "0.5s"}} />
            <img className="vabs vup" src="/assets/vorn-slid2_phone2.png" alt="Original app: a list of inspections with raw field values" style={{left: "73.646cqw", top: "7.963cqh", width: "22.292cqw", animationDelay: "0.7s"}} />
          </div>
        </div>
        </>
      )}
      {v.vShot2 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <div className="vred vwipe" style={{left: "2.344cqw", top: "4.815cqh", height: "11.111cqh", padding: "0 2.656cqw", display: "flex", alignItems: "center"}}>
              <h2 className="vh" style={{fontSize: "2.396cqw", whiteSpace: "nowrap"}}>
                Map the flow. Set the look. Test in lo-fi.
              </h2>
            </div>
            <img className="vabs vrise" src="/assets/vorn-slid3_map.png" alt="Flow diagram of the new inspection flow" style={{left: "2.344cqw", top: "19.444cqh", width: "53.177cqw", animationDelay: "0.5s"}} />
            <img className="vabs vrise" src="/assets/vorn-slid3_inspo.png" alt="Mood board of reference apps" style={{left: "57.500cqw", top: "19.444cqh", width: "20.885cqw", animationDelay: "0.85s"}} />
            <img className="vabs vrise" src="/assets/vorn-slid3_colors.png" alt="Colour palette, type and icons" style={{left: "6.458cqw", top: "49.722cqh", width: "23.958cqw", animationDelay: "1.2s"}} />
            <img className="vabs vrise" src="/assets/vorn-slid3_lofi.png" alt="Lo-fi screens: home, inspection, floor plan and an item detail" style={{left: "34.740cqw", top: "36.204cqh", width: "60.573cqw", animationDelay: "1.55s"}} />
            <span className="vabs vwipe" style={{left: "3.385cqw", top: "21.111cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "0.85s"}}>
              Workflow map
            </span>
            <span className="vabs vwipe" style={{left: "58.542cqw", top: "21.111cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.2s"}}>
              Mood board
            </span>
            <span className="vabs vwipe" style={{left: "7.500cqw", top: "51.389cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.55s"}}>
              Palette
            </span>
            <span className="vabs vwipe" style={{left: "35.781cqw", top: "37.870cqh", padding: "0.741cqh 0.833cqw", background: "#101720", color: "#FFFFFF", fontSize: "1.146cqw", fontWeight: "500", whiteSpace: "nowrap", animationDelay: "1.9s"}}>
              Lo-fi screens
            </span>
          </div>
        </div>
        </>
      )}
      {v.vShot3 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <div className="vred vwipe" style={{left: "58.333cqw", top: "4.630cqh", width: "39.635cqw", height: "90.556cqh", padding: "4.815cqh 3.333cqw"}}>
              <h2 className="vh vup" style={{fontSize: "3.021cqw", animationDelay: ".35s"}}>
                Final UI
              </h2>
              <ul style={{listStyle: "none", margin: "3.704cqh 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "1.852cqh", fontSize: "1.562cqw", lineHeight: "1.25"}}>
                <li className="vleft" style={{display: "flex", gap: "1.146cqw", animationDelay: "0.60s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Status and next action in one place
                  </span>
                </li>
                <li className="vleft" style={{display: "flex", gap: "1.146cqw", animationDelay: "0.75s"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: "1em", height: "1em", flex: "none", marginTop: ".12em"}} aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                  <span>
                    Findings marked on the building's own drawings
                  </span>
                </li>
              </ul>
            </div>
            <img className="vabs vup" src="/assets/vorn-slid4_phone3.png" alt="Final design: photo capture screen" style={{left: "0.000cqw", top: "10.185cqh", width: "11.302cqw", animationDelay: "0.2s"}} />
            <img className="vabs vup" src="/assets/vorn-slid4_phone2.png" alt="Final design: inspection summary with logged items and their status" style={{left: "12.292cqw", top: "10.185cqh", width: "18.698cqw", animationDelay: "0.35s"}} />
            <img className="vabs vup" src="/assets/vorn-slid4_phone1.png" alt="Final design: active inspection with timer and logged items" style={{left: "31.615cqw", top: "8.333cqh", width: "21.823cqw", animationDelay: "0.5s"}} />
            <img className="vabs vright" src="/assets/vorn-slid4_ipad.png" alt="Final design on iPad: the building floor plan" style={{left: "70.833cqw", top: "36.574cqh", width: "29.167cqw", animationDelay: "0.85s"}} />
            <img className="vabs vup" src="/assets/vorn-slid4_phone4_blueprint.png" alt="Final design on phone: findings marked on the floor plan" style={{left: "61.458cqw", top: "50.000cqh", width: "12.969cqw", animationDelay: "1.1s"}} />
            <span className="vabs vfade" style={{left: "2.500cqw", top: "91.667cqh", fontSize: "0.990cqw", color: "#6B6F75", whiteSpace: "nowrap", animationDelay: "1.3s"}}>
              Interaction flow & layout · Team of three · .NET MAUI · Bachelor capstone, graded 9.0 · Then hired by the fire service
            </span>
          </div>
        </div>
        </>
      )}
    </>
  );
}

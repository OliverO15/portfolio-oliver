import { Fragment } from 'react';

/** Graphics Engine: title card, live graphics demo, operator interface, YouTube results. `v` is the view model from Multiview.renderVals(). */
export default function GraphicsShots({ v }) {
  return (
    <>
      {v.gfShot0 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
            <img className="cover vfade" src="/assets/g-main-blur.jpg" alt="" />
            <div className="fill" style={{background: "rgba(0,0,0,.12)"}} />
            <h2 className="vabs vh" style={{left: "0", right: "0", top: "34.722cqh", textAlign: "center", fontSize: "7.812cqw", lineHeight: "1.12", textShadow: "0 0.370cqh 2.778cqh rgba(0,0,0,.25)"}}>
              <span className="vup" style={{display: "block", animationDelay: ".3s"}}>
                Archery Broadcast
              </span>
              <span className="vup" style={{display: "block", animationDelay: ".5s"}}>
                Graphics Engine
              </span>
            </h2>
          </div>
        </div>
        </>
      )}
      {v.gfShot1 && (
        <>
        <div className={`fill ${v.trClass}`} style={{background: "#101113", display: "flex", flexDirection: "column"}}>
          <div style={{position: "relative", flexGrow: "1"}}>
            <div className="gx">
              <img className="cover" src="/assets/g-main.jpg" alt="An archer at full draw during a competition" />
              <div className={`gx-mp c g5 ${v.gPresCls}`} aria-hidden={v.gPresHidden}>
                <div className="gx-cne c">
                  <div className="gx-ch">
                    Íslandsmeistaramót Innandyra 2026
                  </div>
                  <div className="gx-eh">
                    Recurve Women - Gold Medal Match
                  </div>
                </div>
                <div className="r g5">
                  <div className="gx-ac r g20 ac">
                    <div>
                      1.
                    </div>
                    <div className="gx-tc">
                      <span>
                        {v.gL.team}
                      </span>
                    </div>
                    <div className="c g0">
                      <div>
                        {v.gL.given}
                      </div>
                      <div>
                        {v.gL.family}
                      </div>
                    </div>
                  </div>
                  <div className="gx-ac r g20 ac">
                    <div className="c g0" style={{flex: "1", textAlign: "right"}}>
                      <div>
                        {v.gR.given}
                      </div>
                      <div>
                        {v.gR.family}
                      </div>
                    </div>
                    <div className="gx-tc">
                      <span>
                        {v.gR.team}
                      </span>
                    </div>
                    <div>
                      2.
                    </div>
                  </div>
                </div>
              </div>
              <div className="gx-qw" aria-hidden={v.gQualHidden}>
                <div className={`gx-q c g5 ${v.gQualCls}`}>
                  <div className="gx-cne c">
                    <div className="gx-ch">
                      Íslandsmeistaramót Innandyra 2026
                    </div>
                    <div className="gx-eh">
                      Recurve Women - Qualification Results
                    </div>
                  </div>
                  <div className="c g0">
                    {(v.gQual || []).map((q, qIdx) => (
                      <Fragment key={qIdx}>
                        <div className={`gx-res r ${q.cls}`}>
                          <div>
                            {q.rank}.
                          </div>
                          <div className="gx-tc">
                            <span>
                              {q.team}
                            </span>
                          </div>
                          <div className="gx-rname">
                            {q.name}
                          </div>
                          <div>
                            {q.score}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`gx-sc c g5 ${v.gScMode} ${v.gScCls}`} aria-hidden={v.gScHidden}>
                <div className={`gx-hdr ${v.gHdrCls}`}>
                  Recurve Women Gold Medal Match
                </div>
                <div className="r g5">
                  <div className={`gx-t r g0 ${v.gL.cls}`}>
                    <div className={`gx-win ${v.gL.winCls}`}>
                      Winner
                    </div>
                    <div className="gx-info r g0">
                      <div className="gx-tc">
                        <span>
                          {v.gL.team}
                        </span>
                      </div>
                      <div className="gx-nm c ctr">
                        <div>
                          {v.gL.given}
                        </div>
                        <div>
                          {v.gL.family}
                        </div>
                      </div>
                      <div className={`gx-aet c g5 ctr ac ${v.gCond}`}>
                        <div className="gx-et">
                          {v.gL.endScore}
                        </div>
                        <div className="r g0 gx-arrows">
                          {(v.gL.arrows || []).map((a, aIdx) => (
                            <Fragment key={aIdx}>
                              <div className="gx-ar">
                                {a.v}
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                      <div className={`gx-ends r ctr ${v.gEndsHide}`}>
                        {(v.gL.ends || []).map((e, eIdx) => (
                          <Fragment key={eIdx}>
                            <div className={`gx-es ${e.cls}`}>
                              {e.v}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="gx-mt r ctr ac">
                      {v.gL.score}
                    </div>
                  </div>
                  <div className={`gx-t r g0 ${v.gR.cls}`}>
                    <div className={`gx-win ${v.gR.winCls}`}>
                      Winner
                    </div>
                    <div className="gx-mt r ctr ac">
                      {v.gR.score}
                    </div>
                    <div className="gx-info r g0">
                      <div className={`gx-aet c g5 ctr ac ${v.gCond}`}>
                        <div className="gx-et">
                          {v.gR.endScore}
                        </div>
                        <div className="r g0 gx-arrows">
                          {(v.gR.arrows || []).map((a, aIdx) => (
                            <Fragment key={aIdx}>
                              <div className="gx-ar">
                                {a.v}
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                      <div className={`gx-ends r ctr ${v.gEndsHide}`}>
                        {(v.gR.ends || []).map((e, eIdx) => (
                          <Fragment key={eIdx}>
                            <div className={`gx-es ${e.cls}`}>
                              {e.v}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <div className="gx-nm c ctr" style={{textAlign: "right"}}>
                        <div>
                          {v.gR.given}
                        </div>
                        <div>
                          {v.gR.family}
                        </div>
                      </div>
                      <div className="gx-tc">
                        <span>
                          {v.gR.team}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gx-rw">
                  <div className={`gx-rn ${v.gRndCls}`}>
                    Round {v.gRound}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="group" aria-label="Operator panel" style={{display: "flex", flexWrap: "nowrap", overflowX: "auto", alignItems: "center", gap: "6px", padding: "8px 10px", background: "#17191C", borderTop: "1px solid #2A2D32"}}>
            <button className={`gop ${v.gPresBtn}`} onClick={v.gTogPres} aria-pressed={v.gPresP}>
              Presentation
            </button>
            <button className={`gop ${v.gQualBtn}`} onClick={v.gTogQual} aria-pressed={v.gQualP}>
              Quali
            </button>
            <button className={`gop ${v.gScBtn}`} onClick={v.gTogSc} aria-pressed={v.gScP}>
              Scorecard
            </button>
            <span style={{width: "1px", height: "24px", background: "#3A3E45", margin: "0 2px"}} />
            <button className={`gop ${v.gModeCBtn}`} onClick={v.gModeC} aria-pressed={v.gModeCP}>
              Condensed
            </button>
            <button className={`gop ${v.gModeEBtn}`} onClick={v.gModeE} aria-pressed={v.gModeEP}>
              End score
            </button>
            <button className={`gop ${v.gModeRBtn}`} onClick={v.gModeR} aria-pressed={v.gModeRP}>
              Recap
            </button>
            <button className="gop" onClick={v.gNext}>
              Next round
            </button>
            <button className="gop" onClick={v.gClear}>
              Clear
            </button>
          </div>
        </div>
        </>
      )}
      {v.gfShot2 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
            <img className="vabs vleft" src="/assets/g-laptop.png" alt="The operator panel on a 13-inch laptop next to OBS" style={{left: "1.250cqw", top: "11.852cqh", width: "45.729cqw", animationDelay: "0.2s"}} />
            <img className="vabs vright" src="/assets/g-interface.png" alt="The operator panel: competition, match info, round controller and match facts" style={{left: "37.917cqw", top: "6.574cqh", width: "59.115cqw", animationDelay: "0.5s"}} />
            <p className="vabs vup" style={{margin: "0", left: "5.365cqw", top: "87.778cqh", fontSize: "2.812cqw", fontWeight: "300", whiteSpace: "nowrap", animationDelay: "1s"}}>
              Interface adaptable for limited screen space
            </p>
          </div>
        </div>
        </>
      )}
      {v.gfShot3 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs" style={{background: "#1F1F1F", color: "#FFFFFF"}}>
            <p className="vabs vup" style={{margin: "0", left: "5.208cqw", top: "6.481cqh", fontSize: "1.354cqw", color: "#A3A8AE", letterSpacing: ".02em", animationDelay: ".1s"}}>
              YouTube channel · Oct 2025 – Oct 2026
            </p>
            <p className="vabs vup" style={{margin: "0", left: "65.104cqw", top: "11.852cqh", width: "29.688cqw", paddingLeft: "1.458cqw", borderLeft: "0.208cqw solid #3A3E45", fontSize: "1.458cqw", lineHeight: "1.45", color: "#D4D2CD", animationDelay: ".35s"}}>
              Live streams and cut-down videos from Icelandic archery tournaments that I stream and produce.
            </p>
            <div className="vabs vup" style={{left: "5.208cqw", top: "10.926cqh", display: "flex", alignItems: "baseline", gap: "1.250cqw", animationDelay: ".2s"}}>
              <span style={{fontSize: "7.812cqw", fontWeight: "700", lineHeight: "1", fontVariantNumeric: "tabular-nums"}}>
                {v.gfViews}
              </span>
              <span style={{fontSize: "2.083cqw", color: "#A3A8AE"}}>
                views
              </span>
            </div>
            <div className="vabs vup" style={{left: "5.208cqw", top: "34.444cqh", animationDelay: "0.5s"}}>
              <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                42.8K
              </div>
              <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                hours watched
                <span style={{color: "#3DDC84"}}>
                  ▲ 84%
                </span>
              </div>
            </div>
            <div className="vabs vup" style={{left: "33.333cqw", top: "34.444cqh", animationDelay: "0.65s"}}>
              <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                +1.4K
              </div>
              <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                new subscribers
                <span style={{color: "#3DDC84"}}>
                  ▲ 52%
                </span>
              </div>
            </div>
            <div className="vabs vup" style={{left: "61.458cqw", top: "34.444cqh", animationDelay: "0.8s"}}>
              <div style={{fontSize: "3.958cqw", fontWeight: "700", lineHeight: "1"}}>
                3,757
              </div>
              <div style={{marginTop: "1.111cqh", fontSize: "1.302cqw", color: "#A3A8AE", whiteSpace: "nowrap"}}>
                subscribers in total
              </div>
            </div>
            <div className="vabs vfade" style={{left: "0", right: "0", top: "55.556cqh", overflow: "hidden", animationDelay: "1s"}} aria-label="Thumbnails made for the channel" role="img">
              <div className="gtick">
                <img src="/assets/t-B_T_G_2.jpg" alt="Barebow team gold medal match" />
                <img src="/assets/t-Compound_Finals.jpg" alt="Compound finals, live" />
                <img src="/assets/t-D1_Finals.jpg" alt="Indoor youth championship finals, live" />
                <img src="/assets/t-D2_Finals.jpg" alt="Outdoor youth championship finals, live" />
                <img src="/assets/t-L_M_B.jpg" alt="Longbow men bronze medal match" />
                <img src="/assets/t-L_T_G.jpg" alt="Longbow team gold medal match" />
                <img src="/assets/t-R_T_G.jpg" alt="Recurve team gold medal match" />
                <img src="/assets/t-U18_Quali.jpg" alt="Youth qualification, live" />
                <img src="/assets/t-B_T_G_2.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-Compound_Finals.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-D1_Finals.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-D2_Finals.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-L_M_B.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-L_T_G.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-R_T_G.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-U18_Quali.jpg" alt="" aria-hidden="true" />
              </div>
            </div>
            <div className="vabs vfade" style={{left: "0", right: "0", top: "78.241cqh", overflow: "hidden", animationDelay: "1.15s"}} aria-hidden="true">
              <div className="gtick rev">
                <img src="/assets/t-L_M_B.jpg" alt="Longbow men bronze medal match" />
                <img src="/assets/t-L_T_G.jpg" alt="Longbow team gold medal match" />
                <img src="/assets/t-R_T_G.jpg" alt="Recurve team gold medal match" />
                <img src="/assets/t-U18_Quali.jpg" alt="Youth qualification, live" />
                <img src="/assets/t-B_T_G_2.jpg" alt="Barebow team gold medal match" />
                <img src="/assets/t-Compound_Finals.jpg" alt="Compound finals, live" />
                <img src="/assets/t-D1_Finals.jpg" alt="Indoor youth championship finals, live" />
                <img src="/assets/t-D2_Finals.jpg" alt="Outdoor youth championship finals, live" />
                <img src="/assets/t-L_M_B.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-L_T_G.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-R_T_G.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-U18_Quali.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-B_T_G_2.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-Compound_Finals.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-D1_Finals.jpg" alt="" aria-hidden="true" />
                <img src="/assets/t-D2_Finals.jpg" alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

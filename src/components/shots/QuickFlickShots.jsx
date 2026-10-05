/** QuickFlick: logo card, before/after slider, product, marketing. `v` is the view model from Multiview.renderVals(). */
export default function QuickFlickShots({ v }) {
  return (
    <>
      {v.qShot0 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <img className="vabs qpop" src="/assets/qf-logo.png" alt="QuickFlick" style={{left: "18.125cqw", top: "37.778cqh", width: "63.802cqw", animationDelay: ".25s"}} />
            <p className="vabs vup" style={{margin: "0", left: "0", right: "0", top: "66.667cqh", textAlign: "center", fontSize: "1.771cqw", color: "#6B6F75", animationDelay: ".9s"}}>
              AI video creation for real estate agents
            </p>
          </div>
        </div>
        </>
      )}
      {v.qShot1 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <img className="cover" src="/assets/qf-davinci.jpg" alt="Before: a traditional video editor with many tracks and panels" />
            <span className="qchip" style={{left: "2.5cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF"}}>
              Traditional editor
            </span>
            <div className="fill" style={{background: "#FFFFFF", clipPath: `inset(0 0 0 ${v.qfLeft})`}}>
              <h2 className="vabs vh" style={{left: "0", right: "0", top: "4.444cqh", textAlign: "center", fontSize: "2.917cqw", color: "#FA5FEE", whiteSpace: "nowrap"}}>
                Simplify complex workflow
              </h2>
              <img className="vabs" src="/assets/qf-editor.png" alt="After: the QuickFlick editor, one scene with preview, on-screen text, voice script and media" style={{left: "27.448cqw", top: "14.815cqh", width: "45.104cqw"}} />
              <span className="qchip" style={{right: "2.5cqw", background: "#FA5FEE", color: "#FFFFFF"}}>
                QuickFlick
              </span>
            </div>
            <input className="qcmp" type="range" min="0" max="100" value={v.split} onChange={v.onSplit} aria-label="Drag to compare a traditional video editor with QuickFlick" />
            <div className="qline" aria-hidden="true" style={{position: "absolute", top: "0", bottom: "0", left: `${v.qfLeft}`, width: "0.260cqw", marginLeft: "-0.130cqw", background: "#FA5FEE", pointerEvents: "none", zIndex: "4"}}>
              <span className="qknob" style={{position: "absolute", top: "50%", left: "50%", width: "3.333cqw", height: "3.333cqw", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#FA5FEE", boxShadow: "0 0.556cqh 1.667cqh rgba(17,18,20,.35)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{width: "55%", height: "55%"}} aria-hidden="true">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        </>
      )}
      {v.qShot2 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <img className="vabs vrise" src="/assets/qf-voices.png" alt="AI voice picker with voice cards" style={{left: "26.302cqw", top: "5.648cqh", width: "45.052cqw", animationDelay: "0.45s"}} />
            <img className="vabs vrise" src="/assets/qf-grid.png" alt="Scene layout grid" style={{left: "23.177cqw", top: "50.741cqh", width: "35.990cqw", animationDelay: "0.8s"}} />
            <img className="vabs vrise" src="/assets/qf-pricing.png" alt="Pricing plans" style={{left: "1.979cqw", top: "22.500cqh", width: "45.312cqw", animationDelay: "1.15s"}} />
            <img className="vabs vrise" src="/assets/qf-signup.png" alt="Sign-in form" style={{left: "71.719cqw", top: "4.630cqh", width: "24.792cqw", animationDelay: "1.5s"}} />
            <img className="vabs vrise" src="/assets/qf-watermark.png" alt="Watermark settings over a video preview" style={{left: "61.562cqw", top: "56.296cqh", width: "35.990cqw", animationDelay: "1.85s"}} />
            <h2 className="vabs vh vwipe" style={{left: "5.208cqw", top: "85.370cqh", fontSize: "2.708cqw", color: "#FA5FEE", whiteSpace: "nowrap", animationDelay: "0.2s"}}>
              Solo UI designer and frontend engineer
            </h2>
          </div>
        </div>
        </>
      )}
      {v.qShot3 && (
        <>
        <div className={`fill ${v.trClass}`}>
          <div className="vs">
            <h2 className="vabs vh vwipe" style={{left: "5.208cqw", top: "5.370cqh", fontSize: "2.708cqw", color: "#FA5FEE", whiteSpace: "nowrap", animationDelay: "0.2s"}}>
              Ads in every format
            </h2>
            <div className="vabs vup" style={{left: "5.208cqw", top: "15.741cqh", width: "45.833cqw", height: "45.833cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.4s"}}>
              <video src="/assets/qf-ad-demo.mp4" poster="/assets/qf-ad-demo.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Product demo ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                16:9 · Product demo
              </span>
            </div>
            <div className="vabs vup" style={{left: "5.208cqw", top: "64.352cqh", width: "17.188cqw", height: "30.556cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.6s"}}>
              <video src="/assets/qf-ad-square.mp4" poster="/assets/qf-ad-square.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Square video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                1:1
              </span>
            </div>
            <div className="vabs vup" style={{left: "23.958cqw", top: "64.352cqh", width: "27.083cqw", height: "27.130cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.75s"}}>
              <video src="/assets/qf-ad-landscape.mp4" poster="/assets/qf-ad-landscape.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Landscape video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                16:9
              </span>
            </div>
            <div className="vabs vup" style={{left: "53.125cqw", top: "15.741cqh", width: "25.104cqw", height: "79.352cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "0.9s"}}>
              <video src="/assets/qf-ad-portrait.mp4" poster="/assets/qf-ad-portrait.jpg" muted={true} loop={true} playsInline={true} autoPlay={true} preload="auto" ref={v.setVid} aria-label="Vertical video ad" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                9:16
              </span>
            </div>
            <div className="vabs vup" style={{left: "80.312cqw", top: "15.741cqh", width: "15.625cqw", height: "34.722cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "1.05s"}}>
              <img src="/assets/qf-insta2.jpg" alt="Instagram post: Instant Listing Videos" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                4:5
              </span>
            </div>
            <div className="vabs vup" style={{left: "80.312cqw", top: "53.241cqh", width: "15.625cqw", height: "34.722cqh", borderRadius: "0.729cqw", overflow: "hidden", background: "#EEE", boxShadow: "0 0.926cqh 2.778cqh rgba(17,18,20,.18)", animationDelay: "1.2s"}}>
              <img src="/assets/qf-insta4.jpg" alt="Instagram post: Easy Editing" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
              <span style={{position: "absolute", left: "0.729cqw", top: "1.296cqh", padding: "0.556cqh 0.625cqw", background: "rgba(17,18,20,.85)", color: "#FFFFFF", fontSize: "0.938cqw", fontWeight: "500", borderRadius: "0.208cqw", whiteSpace: "nowrap"}}>
                4:5
              </span>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

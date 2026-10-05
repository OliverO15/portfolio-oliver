/** Table texture and the three lamps behind the page. `v` is the view model from Multiview.renderVals(). */
export default function Surface({ v }) {
  return (
    <>
      <div className="surface" aria-hidden="true">
        <div className="wall" />
      </div>
      <div className="vig" aria-hidden="true" />
      <div className="pool rake" aria-hidden="true" />
      <div className="pool add" aria-hidden="true" />
      {v.l2.on && (
        <>
        <div aria-hidden="true" style={{display: "contents", "--light": `${v.l2.light}`, "--lamp": `${v.l2.lamp}`, "--lx": `${v.l2.lx}`, "--ly": `${v.l2.ly}`, "--lw": `${v.l2.lw}`, "--lr": `${v.l2.lr}`, "--la": `${v.l2.la}`, "--lhard": `${v.l2.lhard}`, "--rake": `${v.l2.rake}`}}>
          <div className="pool rake" />
          <div className="pool add" />
        </div>
        </>
      )}
      {v.l3.on && (
        <>
        <div aria-hidden="true" style={{display: "contents", "--light": `${v.l3.light}`, "--lamp": `${v.l3.lamp}`, "--lx": `${v.l3.lx}`, "--ly": `${v.l3.ly}`, "--lw": `${v.l3.lw}`, "--lr": `${v.l3.lr}`, "--la": `${v.l3.la}`, "--lhard": `${v.l3.lhard}`, "--rake": `${v.l3.rake}`}}>
          <div className="pool rake" />
          <div className="pool add" />
        </div>
        </>
      )}
    </>
  );
}

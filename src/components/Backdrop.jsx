export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="sky"></div>
      <div className="starfield">
        <span className="twinkle" style={{ top: '14%', left: '21%' }}></span>
        <span className="twinkle t2" style={{ top: '30%', left: '64%' }}></span>
        <span className="twinkle t3" style={{ top: '8%', left: '45%' }}></span>
      </div>
      <div className="halo"></div>
      <div className="moon"></div>
      <div className="cloud c1"></div>
      <div className="cloud c2"></div>
    </div>
  )
}

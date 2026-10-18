export default function StatsBar({ boardCount, pinCount }) {
  return (
    <div className="stats">
      <div className="stat">{boardCount} boards</div>
      <div className="stat">{pinCount} pins</div>
    </div>
  );
}
export default function Pin({ pin, onRemove }) {
  return (
    <div
      className="pin"
      style={{
        left: `${pin.x * 100}%`,
        top: `${pin.y * 100}%`,
        width: `${pin.w * 100}%`,
      }}
      onClick={() => onRemove(pin.id)}
      title="Click to remove"
    >
      <img src={pin.src} alt="" draggable={false} />
    </div>
  );
}

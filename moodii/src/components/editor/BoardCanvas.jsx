import { useRef } from "react";
import { readImageFile } from "../../utils/readImageFile";
import Pin from "./Pin";

export default function BoardCanvas({ background, pins, onAddPin, onRemovePin }) {
  const boardRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();

    // Convert screen coordinates to board-relative fractions so positions scale with the canvas.
    const rect = boardRef.current.getBoundingClientRect();
    const dropX = (e.clientX - rect.left) / rect.width;
    const dropY = (e.clientY - rect.top) / rect.height;

    const files = [...e.dataTransfer.files].filter((f) =>
      f.type.startsWith("image/")
    );

    for (const file of files) {
      const image = await readImageFile(file);
      onAddPin(image, dropX, dropY);
    }
  };

  return (
    <div
      ref={boardRef}
      className="canvas"
      style={{ background }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {pins.length === 0 && <div className="hint">Drag &amp; drop images here</div>}
      {pins.map((pin) => (
        <Pin key={pin.id} pin={pin} onRemove={onRemovePin} />
      ))}
    </div>
  );
}
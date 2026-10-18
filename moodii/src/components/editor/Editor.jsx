import { useState } from "react";
import BoardCanvas from "./BoardCanvas";
import { BOARD_RATIO, clamp } from "../../utils/board";

export default function Editor({ board, onSave, onBack, onDelete }) {
  const [name, setName] = useState(board.name);
  const [pins, setPins] = useState(board.pins ?? []);

  const addPin = (image, centerX, centerY) => {
    // Limit each pin to 25% of board width and 50% of board height.
    const w = Math.min(0.25, (0.5 * image.aspect) / BOARD_RATIO);
    const h = (w * BOARD_RATIO) / image.aspect;

    const pin = {
      id: Date.now() + Math.random(),
      src: image.src,
      aspect: image.aspect,
      w,
      // Clamp the top-left position so the full pin stays inside the board.
      x: clamp(centerX - w / 2, 0, 1 - w),
      y: clamp(centerY - h / 2, 0, 1 - h),
    };

    setPins((currentPins) => [...currentPins, pin]);
  };

  const removePin = (id) => {
    setPins((currentPins) => currentPins.filter((pin) => pin.id !== id));
  };

  const handleSave = () => {
    onSave({ ...board, name, pins });
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      onDelete(board.id);
    }
  };

  return (
    <div>
      <div className="toolbar">
        <div className="left">
          <button className="primaryButton" type="button" onClick={onBack}>
            Back
          </button>
        </div>
        <div className="center">
          <button className="primaryButton primary" type="button" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="right">
          <button className="primaryButton dangerButton" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <input
        className="name-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        aria-label="Board name"
      />
      <BoardCanvas
        background={board.background}
        pins={pins}
        onAddPin={addPin}
        onRemovePin={removePin}
      />
    </div>
  );
}
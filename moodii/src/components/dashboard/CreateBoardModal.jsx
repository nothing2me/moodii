import { useState } from "react";

export default function CreateBoardModal({ onCreate, onClose }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) onCreate(trimmedName);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form
        className="create-board-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-board-title"
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="create-board-title">Create a board</h2>
        <label htmlFor="new-board-name">Board name</label>
        <input
          id="new-board-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="My new board"
          maxLength={60}
          required
          autoFocus
        />
        <div className="create-board-actions">
          <button className="primaryButton primary" type="submit">
            Create board
          </button>
          <button className="primaryButton" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

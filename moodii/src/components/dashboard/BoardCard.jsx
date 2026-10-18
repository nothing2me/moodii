export default function BoardCard({ board, onOpen }) {
  return (
    <button className="board-card" onClick={() => onOpen(board.id)}>
      <div className="preview" style={{ background: board.background }} />
      <span className="board-name">{board.name}</span>
    </button>
  );
}
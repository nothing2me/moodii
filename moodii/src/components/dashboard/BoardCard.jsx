import BoardPreview from "./BoardPreview";

export default function BoardCard({ board, onOpen }) {
  return (
    <button className="board-card" onClick={() => onOpen(board.id)}>
      <BoardPreview board={board} />
      <span className="board-name">{board.name}</span>
    </button>
  );
}
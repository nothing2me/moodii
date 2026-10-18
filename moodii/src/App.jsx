import { useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/dashboard/StatsBar";
import BoardCard from "./components/dashboard/BoardCard";
import "./App.css";

// Temporary board data used to populate the dashboard.
const sampleBoards = [
  { id: 1, name: "Summer", background: "#cfe8ff", pins: [] },
  { id: 2, name: "Cozy Autumn", background: "#fff2c6", pins: [] },
  { id: 3, name: "Pastel Dreams", background: "#ffe3ec", pins: [] },
  { id: 4, name: "Forest", background: "#e4f7d9", pins: [] },
  { id: 5, name: "Ocean Escape", background: "#d7f3f5", pins: [] },
  { id: 6, name: "Minimal Spaces", background: "#eeeeee", pins: [] },
  { id: 7, name: "Garden Ideas", background: "#e8f5d0", pins: [] },
  { id: 8, name: "Weekend Recipes", background: "#ffe4c9", pins: [] },
  { id: 9, name: "Travel Dreams", background: "#e2e4ff", pins: [] },
  { id: 10, name: "Art Inspiration", background: "#f3ddff", pins: [] },
];

const BOARDS_PER_PAGE = 6;

export default function App() {
  // Keep the board collection and selected page in React state.
  const [boards, setBoards] = useState(sampleBoards);
  const [currentPage, setCurrentPage] = useState(0);

  // Derive the summary and current six-board section from the full collection.
  const pinCount = boards.reduce((sum, board) => sum + board.pins.length, 0);
  const pageCount = Math.ceil(boards.length / BOARDS_PER_PAGE);
  const visibleBoards = boards.slice(
    currentPage * BOARDS_PER_PAGE,
    (currentPage + 1) * BOARDS_PER_PAGE
  );

  function changePage(direction) {
    // Wrap around when moving past the first or last section.
    setCurrentPage((page) => (page + direction + pageCount) % pageCount);
  }

  return (
    <div className="app">
      <div className="screen">
        <Header onCreate={() => console.log("create button clicked")} />
        <StatsBar boardCount={boards.length} pinCount={pinCount} />

        <div className="board-gallery">
          {/* Only show paging controls when there is more than one section. */}
          {pageCount > 1 && (
            <button
              className="page-arrow page-arrow-previous"
              type="button"
              aria-label="Show previous boards"
              onClick={() => changePage(-1)}
            >
              ‹
            </button>
          )}

          <div className="grid">
            {/* Pass each board and its open handler to a reusable card. */}
            {visibleBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onOpen={(id) => console.log("Board opened", id)}
              />
            ))}
          </div>

          {pageCount > 1 && (
            <button
              className="page-arrow page-arrow-next"
              type="button"
              aria-label="Show next boards"
              onClick={() => changePage(1)}
            >
              ›
            </button>
          )}
        </div>
        {pageCount > 1 && (
          <p className="page-indicator" aria-live="polite">
            Section {currentPage + 1} of {pageCount}
          </p>
        )}
      </div>
    </div>
  );
}
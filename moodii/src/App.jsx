import { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/dashboard/StatsBar";
import BoardCard from "./components/dashboard/BoardCard";
import CreateBoardModal from "./components/dashboard/CreateBoardModal";
import Editor from "./components/editor/Editor";
import "./App.css";

// Sample boards for display
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
  { id: 11, name: "Reading Nook", background: "#f5e6d3", pins: [] },
  { id: 12, name: "City Getaways", background: "#dceef2", pins: [] },
];

const BOARDS_PER_PAGE = 6;
const STORAGE_KEY = "moodii.boards";

// Load saved boards when possible.
function loadBoards() {
  try {
    const storedBoards = localStorage.getItem(STORAGE_KEY);
    if (storedBoards) {
      const parsedBoards = JSON.parse(storedBoards);
      if (Array.isArray(parsedBoards)) return parsedBoards;
    }
  } catch {
    // Use the sample boards when browser storage is unavailable or invalid.
  }

  return sampleBoards;
}


export default function App() {
  // Passing the loader function lets React read storage only during initialization.
  const [boards, setBoards] = useState(loadBoards);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Persist committed board edits so they survive a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    } catch (error) {
      console.error("Could not save boards to local storage.", error);
    }
  }, [boards]);

  // A view mode handles navigation without a routing library.
  const [view, setView] = useState("dashboard"); // "dashboard" | "editor"
  // Keep only the active id; derive the board from the latest saved collection.
  const [activeId, setActiveId] = useState(null);

  function createBoard(name) {
    const newBoard = {
      id: crypto.randomUUID(),
      name,
      background: "#e8f5ff",
      pins: [],
    };

    setBoards((currentBoards) => [...currentBoards, newBoard]);
    // Move to the page containing the newly added board.
    setCurrentPage(Math.floor(boards.length / BOARDS_PER_PAGE));
    setIsCreateModalOpen(false);
  }

  const openBoard = (id) => {
    setActiveId(id);
    setView("editor");
  };
  const saveBoard = (updated) => {
    setBoards((currentBoards) =>
      currentBoards.map((board) => (board.id === updated.id ? updated : board))
    );
  };
  const deleteBoard = (id) => {
    const remainingCount = boards.length - 1;
    setBoards((currentBoards) => currentBoards.filter((board) => board.id !== id));
    setCurrentPage((page) =>
      Math.min(page, Math.max(0, Math.ceil(remainingCount / BOARDS_PER_PAGE) - 1))
    );
    setActiveId(null);
    setView("dashboard");
  };
  const activeBoard = boards.find((b) => b.id === activeId);

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
  };

  return (
  <div className="app">
    <div className="screen">
      {view === "dashboard" ? (
        <>
          <Header onCreate={() => setIsCreateModalOpen(true)} />
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
                  onOpen={openBoard}
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

          {isCreateModalOpen && (
            <CreateBoardModal
              onCreate={createBoard}
              onClose={() => setIsCreateModalOpen(false)}
            />
          )}
        </>
      ) : (
        <Editor
          key={activeId}
          board={activeBoard}
          onSave={saveBoard}
          onDelete={deleteBoard}
          onBack={() => setView("dashboard")}
        />
      )}
    </div>
  </div>
);
}
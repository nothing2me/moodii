export default function Header({ onCreate }) {
  return (
    <header className="header">
      <h1>Moodii</h1>
      <button className="primaryButton" id="CreateButton" onClick={onCreate}>
        + Create
      </button>
    </header>
  );
}
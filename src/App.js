import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);
  return <button className="square" onClick={() => handleClick({ value, setValue })} id={`square-${value}`}>{value}</button>;
}

function handleClick({ value, setValue }) {
  if (value === null) {
    setValue("X");
  }
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

export default function layoutGame() {
  return (
    <>
      <header className="text-red-500">Jogo da Velha</header>
      <main>
        <Board />
      </main>
    </>
  )
}
/**
 * Os componentes React precisam retornar um único elemento JSX e não vários elementos JSX adjacentes, como dois botões.
 * Para corrigir isso, você pode usar Fragments (<> e </>) para agrupar vários elementos JSX adjacentes como este:
 */
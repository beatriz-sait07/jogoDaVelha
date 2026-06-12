function Square({ value }) {
  return <button className="square" id={`square-${value}`}>{value}</button>;
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
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
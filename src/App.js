import { useState } from "react";


const themes = {
  sakura: {
    players: {
      first: "🌸",
      second: "🍥",
    },
    colors: {
      primary: "#F3B8AD",
      secondary: "#E15B62",
      neutral: "#854547",
      theme: "#F1DCD9",
    },
    imgBgDesktop: "https://github.com/beatriz-sait07/imagens-widgets/blob/main/sakuras-wpp-desktop.png?raw=true",
    imgBgMobile: "https://github.com/beatriz-sait07/imagens-widgets/blob/main/sakuras-wpp-mobile.png?raw=true",
    icon: "🌸",
  },

  ninja: {
    players: {
      first: "🐾",
      second: "🗡️",
    },
    colors: {
      primary: "#A32622",
      secondary: "#2F3030",
      neutral: "#1C1D1D",
      theme: "#D8D0C3",
    },
    imgBgDesktop: "https://github.com/beatriz-sait07/imagens-widgets/blob/main/paisagem-japan-desktop.png?raw=true",
    imgBgMobile: "https://github.com/beatriz-sait07/imagens-widgets/blob/main/paisagem-mobile-japan.png?raw=true",
    icon: "🐾",
  },
};

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick} id={`square-${value}`}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay, theme }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = themes[theme].players.first;
    } else {
      nextSquares[i] = themes[theme].players.second;
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function ThemeToggle({ isMasculineTheme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isMasculineTheme}
      className={`
            absolute top-[2%] right-[5%]
            w-20 h-10 rounded-full p-1
            flex items-center
            transition-all duration-300 ease-in-out
            border border-white/30 shadow-lg backdrop-blur-md

            ${isMasculineTheme
          ? "bg-zinc-800/80"
          : "bg-pink-200/80"
        }
          `}
    >
      <span
        className={`
              w-8 h-8 rounded-full
              flex items-center justify-center
              text-sm font-bold shadow-md
              transition-all duration-300 ease-in-out

              ${isMasculineTheme
            ? "translate-x-10 bg-red-700 text-white"
            : "translate-x-0 bg-white text-pink-500"
          }
            `}
      >
        {isMasculineTheme ? "♂" : "♀"}
      </span>
    </button>
  );
}

export default function layoutGame() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isMasculineTheme, setIsMasculineTheme] = useState(false);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganhador: " + winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? themes[isMasculineTheme ? "ninja" : "sakura"].players.first : themes[isMasculineTheme ? "ninja" : "sakura"].players.second);
  }
  const currentTheme = isMasculineTheme ? themes.ninja : themes.sakura;
  return (
    <>
      <div
        className="
      w-full h-full flex items-center justify-center gap-4 p-4
      bg-[image:var(--bg-mobile)]
      lg:bg-[image:var(--bg-desktop)]
      bg-cover bg-center bg-no-repeat
      transition-all duration-500
    "
        style={{
          "--bg-mobile": `url(${currentTheme.imgBgMobile})`,
          "--bg-desktop": `url(${currentTheme.imgBgDesktop})`,
        }}
      >
        <ThemeToggle
          isMasculineTheme={isMasculineTheme}
          onToggle={() => setIsMasculineTheme(!isMasculineTheme)}
        />
        <article className="bg-red-200 rounded-md w-[80%] md:w-[60%] lg:w-[40%]  flex flex-col items-center justify-start gap-4 p-4">
          <section className="w-full min-h-[50px] flex flex-col items-center justify-center">
            <p className="w-8 h-8  rounded-full shadow-sm shadow-black text-center flex items-center justify-center p-2">{isMasculineTheme ? themes["ninja"]?.icon : themes["sakura"]?.icon}</p>
            <h1 className="text-xl font-semibold">Jogo da Velha</h1>
            <p className="text-xs font-thin">Aguarde sua vez, e faça sua jogada com atenção!</p>
          </section>
          <section>
            <p>{status}</p>
            <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} theme={isMasculineTheme ? "ninja" : "sakura"} />
          </section>
        </article>
      </div>
    </>
  )
}
/**
 * Os componentes React precisam retornar um único elemento JSX e não vários elementos JSX adjacentes, como dois botões.
 * Para corrigir isso, você pode usar Fragments (<> e </>) para agrupar vários elementos JSX adjacentes como este:
 */
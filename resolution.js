const GameBoard = () => {
  const board = {};

  return {
    board,
  };
};

const Knight = () => {
  const knightMoves = (start, end) => {
    if (JSON.stringify(start) === JSON.stringify(end))
      return `[${start}] and [${end}] is same!`;

    // Initialize the board and calculate the possible moves from start
    const newGameBoard = GameBoard().board;
    const parent = {};
    const queue = [start];
    const visited = [start];
    addMovements(newGameBoard, start, possibleMovements(start));

    while (queue.length > 0) {
      const vertex = queue.shift();
      addMovements(newGameBoard, vertex, possibleMovements(vertex));
      for (const neighbor of newGameBoard[vertex]) {
        if (
          !visited.some(
            (value) => JSON.stringify(value) === JSON.stringify(neighbor)
          )
        ) {
          parent[neighbor] = vertex;

          if (JSON.stringify(neighbor) === JSON.stringify(end))
            return printTrace(parent, start, end);

          queue.push(neighbor);
          visited.push(neighbor);
        }
      }
    }
  };

  const addMovements = (graph, start, array) => {
    graph[start] = [];
    for (let i = 0; i < array.length; i += 1) {
      if (
        array[i][0] >= 0 &&
        array[i][0] <= 7 &&
        array[i][1] >= 0 &&
        array[i][1] <= 7
      ) {
        graph[start].push(array[i]);
      }
    }
  };

  const possibleMovements = (node) => {
    const upRightS = [node[0] + 2, node[1] + 1];
    const upRightL = [node[0] + 1, node[1] + 2];

    const downRightS = [node[0] + 2, node[1] - 1];
    const downRightL = [node[0] + 1, node[1] - 2];

    const upLeftS = [node[0] - 2, node[1] + 1];
    const upLeftL = [node[0] - 1, node[1] + 2];

    const downLeftS = [node[0] - 2, node[1] - 1];
    const downLeftL = [node[0] - 1, node[1] - 2];

    return [
      upRightS,
      upRightL,
      downRightS,
      downRightL,
      upLeftS,
      upLeftL,
      downLeftS,
      downLeftL,
    ].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };

  const printTrace = (parent, start, end) => {
    const path = [end];
    while (JSON.stringify(path[path.length - 1]) !== JSON.stringify(start))
      path.push(parent[path[path.length - 1]]);

    path.reverse();
    let msg = `You made it in ${path.length} moves! Here's your path:`;
    for (let i = 0; i < path.length; i += 1) {
      msg += `\n[${path[i]}]`;
    }

    return msg;
  };

  return {
    knightMoves,
  };
};

const caballero = Knight();
console.log(caballero.knightMoves([4, 7], [6, 7]));

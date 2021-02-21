import React, { useState } from 'react';
import { mockBoards } from '../../mockBoards';
import Item from '../Item/Item';
import './Board.scss';

const Board = () => {

  const [boards, setBoards] = useState(mockBoards);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStart = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  const dragOver = e => {
    e.preventDefault();
  }

  const drop = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(boards.map(originBoard => {
      if(originBoard.id === board.id) {
        return board;
      }

      if(originBoard.id === currentBoard.id) {
        return currentBoard;
      }

      return originBoard;
    }))
  }

  const dropBoard = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(boards.map(originBoard => {
      if(originBoard.id === board.id) {
        return board;
      }

      if(originBoard.id === currentBoard.id) {
        return currentBoard;
      }

      return originBoard;
    }))
  } 

  return(
  <main className="main">
    <h1 className="title">Turbo Trello</h1>
    <div className="boards">
      {boards.map(board => {
        return(
          <div 
            className="board"
            key={board.id}
            onDragOver={e => dragOver(e)}
            onDrop={e => dropBoard(e, board)}
          >
            <h2 className="board__title">{board.title}</h2>
            {board.items.map(item => {
              return(
                <Item 
                  key={item.id}
                  item={item}
                  board={board}
                  dragStart={dragStart}
                  dragOver={dragOver}
                  drop={drop}
                />
              )
            })}
          </div>
        );
      })}
    </div>
  </main>
  )
}

export default Board;

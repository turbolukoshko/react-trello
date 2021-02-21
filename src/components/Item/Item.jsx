import React from 'react';
import './Item.scss';

const Item = ({
  item,
  board,
  dragStart,
  dragOver,
  drop
}) => {
  return(
    <div 
      className="board__item"
      key={item.id}
      draggable={true}
      onDragStart={e => dragStart(e, board, item)}
      onDragOver={e => dragOver(e)}
      onDrop={e => drop(e, board, item)}
  >
    <h3 className="board__item-title">{item.title}</h3>
  </div>
  );
}

export default Item;

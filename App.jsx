import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialData = {
  droppable1: Array.from({ length: 5 }, (_, i) => ({ id: `droppable1-item-${i}`, content: `Item ${i + 1}` })),
  droppable2: Array.from({ length: 5 }, (_, i) => ({ id: `droppable2-item-${i}`, content: `Item ${i + 1}` })),
  draggableDroppable1: Array.from({ length: 5 }, (_, i) => ({ id: `draggableDroppable1-item-${i}`, content: `Item ${i + 1}` })),
  draggableDroppable2: Array.from({ length: 5 }, (_, i) => ({ id: `draggableDroppable2-item-${i}`, content: `Item ${i + 1}` })),
  onlyDraggable: Array.from({ length: 20 }, (_, i) => ({ id: `onlyDraggable-item-${i}`, content: `Item ${i + 1}` })),
};

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceList = [...data[source.droppableId]];
    const destinationList = [...data[destination.droppableId]];

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setData({
      ...data,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  const renderList = (items, droppableId, isDragDisabled, isDropDisabled) => (
    <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={isDragDisabled}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <img src={`https://via.placeholder.com/50?text=${item.content}`} alt={item.content} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>React Beautiful DND Example</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Droppable Lists */}
        <div>
          <h2>Only Droppable Lists</h2>
          {renderList(data.droppable1, 'droppable1', true, false)}
          {renderList(data.droppable2, 'droppable2', true, false)}
        </div>

        {/* Draggable and Droppable Lists */}
        <div>
          <h2>Draggable and Droppable Lists</h2>
          {renderList(data.draggableDroppable1, 'draggableDroppable1', false, false)}
          {renderList(data.draggableDroppable2, 'draggableDroppable2', false, false)}
        </div>

        {/* Only Draggable List */}
        <div>
          <h2>Only Draggable List</h2>
          {renderList(data.onlyDraggable, 'onlyDraggable', false, true)}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;

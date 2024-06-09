import './App.css';
import { useState } from 'react';
import CardForm from './Component/CardForm';
import TaskList from './Component/TaskList';

function App() {
  const [board, setBoard] = useState({
    todos: [
      { id: 1, title: 'Learn React', status: 'todos' },
      { id: 2, title: 'Learn JS', status: 'todos' },
    ], inProgress: [], review: [], done: []
  });
  const [open, setOpen] = useState(false);
  const [selectBoard, setSelectBoard] = useState('todos');
  const [editData, setEditData] = useState({});

  const openModal = (status) => {
    setSelectBoard(status);
    setOpen(true);
  }

  const onCloseModal = () => {
    setOpen(false);
  }

  const addToCardHandle = (e, data) => {
    e.preventDefault();
    const status = data.status || selectBoard;
  
    setBoard((prevBoard) => {
      const updatedBoard = { ...prevBoard };
      const existingStatusList = updatedBoard[status] || [];
  
      const existingItemIndex = existingStatusList.findIndex(item => item.id === data.id);
      
      if (existingItemIndex !== -1) {
        // Update the existing item
        existingStatusList[existingItemIndex] = { ...existingStatusList[existingItemIndex], ...data };
      } else {
        // Add a new item
        const id = existingStatusList.length ? Math.max(...existingStatusList.map(item => item.id)) + 1 : 1;
        existingStatusList.push({ id, title: data.title, status });
      }
      updatedBoard[status] = existingStatusList;
      return updatedBoard;
    });
  
    setOpen(false);
  };
  

  const editCardHandle = (e, data) => {
    e.preventDefault();
    setOpen(true);
    setEditData(data);
    setSelectBoard(data.status);
    const updatedData = board[selectBoard].map(item => {
      if (item.id === data.id) {
        return {
          ...item,
          title: data.title
        }
      }
      return item;
    });
    setBoard({
      ...board,
      [selectBoard]: updatedData
    });
  }

  return (
    <div className="App">
      <h1 className='main-heading'>Trello Board</h1>
      <div className="board">
        <div className="boardWrap">
          <TaskList
            openModal={openModal}
            options={board.todos}
            boardName='todos'
            heading='Todo'
            editCardHandle={editCardHandle}
          />
        </div>
        <div className="boardWrap">
          <TaskList
            openModal={openModal}
            options={board.inProgress}
            boardName='inProgress'
            heading='In Progress'
            editCardHandle={editCardHandle}
          />

        </div>
        <div className="boardWrap">
          <TaskList
            openModal={openModal}
            options={board.review}
            boardName='review'
            heading='Review'
            editCardHandle={editCardHandle}
          />
        </div>
        <div className="boardWrap">
          <TaskList
            openModal={openModal}
            options={board.done}
            boardName='done'
            heading='Done'
            editCardHandle={editCardHandle}
          />
        </div>
      </div>
      <CardForm
        open={open}
        onCloseModal={onCloseModal}
        addToCardHandle={addToCardHandle}
        status={selectBoard}
        editData={editData}
      />
    </div>
  );
}

export default App;

import { Fragment } from "react"

const TaskList = ({options, boardName, openModal, heading, editCardHandle, deleteCard }) => {
    return (
        <Fragment>
            <h2 className='heading'>{heading}</h2>
            {options.map((item) => (
                <div key={item.id} className="todolist">
                    <p>{item.title}</p>
                    <div className="action-btn">
                        <button className="editBtn" onClick={(e) => editCardHandle(e, item)}>Edit</button>
                        <button className="deleteCard" onClick={() => deleteCard(item)}>Delete</button>
                    </div>
                </div>
            ))}
            <button className='addToCard' onClick={() => openModal(boardName)}>+ Add a card</button>
        </Fragment>
    )
}

export default TaskList;

import React, { useEffect, useState, useCallback } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const optionList = [{
    value: 'todos',
    label: 'Todo'
}, {
    value: 'inProgress',
    label: 'In Progress'
}, {
    value: 'review',
    label: 'Review'
}, {
    value: 'done',
    label: 'Done'

}];

const CardForm = ({ open, onCloseModal, addToCardHandle, status, editData }) => {
    const [data, setData] = useState({
        title: '',
        status: status
    });
    const [filterList, setFilterList] = useState(optionList);
    const [isSearch, setIsSearch] = useState(false);

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setIsSearch(true);
        setData({
            ...data,
            [name]: value
        });
    }

    useEffect(() => {
        // Function to update the data with the new status
        const updateData = () => {
            setData(prevData => ({
                ...prevData,
                status: status
            }));
        };
        updateData();
        updateFilterList();
    }, [open]);

    // Function to filter and sort the option list based on status
    const updateFilterList = useCallback(() => {
        const [filterData, remainingData] = optionList.reduce(([filterAcc, remainingAcc], item) => {
            if (item.value === status) {
                filterAcc.push(item);
            } else {
                remainingAcc.push(item);
            }
            return [filterAcc, remainingAcc];
        }, [[], []]);

        setFilterList([...filterData, ...remainingData]);
    }, [status]);

    const editedData = {...data, id: editData.id};

    return (
        <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'modalParent' }}>
            <h2 className="searchFormHeading">Search Form</h2>
            <div>
                <form className="form">
                    <input
                        className="inputField"
                        type="text" name="title"
                        placeholder="Task Title"
                        onChange={onChangeHandle}
                        value={isSearch ? data.title : editData.title}
                    />
                    <select className="inputField" name="status" onChange={onChangeHandle}>
                        {filterList.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <button className="submit-btn" type="submit" disabled={data.title === ''} onClick={(e) => addToCardHandle(e, editedData)}>Submit</button>
                </form>
            </div>
        </Modal>
    );
}

export default CardForm;
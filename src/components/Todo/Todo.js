import React, { useState, useEffect } from 'react';
import './Todocss.css';

const getlocalData = () => {

    const list = localStorage.getItem("myTodoList");
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }


}

const color = ['normal', 'important', 'urgent'];


const Todo = () => {
    const [inputdata, setInputdata] = useState("");
    const [task, setTask] = useState(getlocalData());
    const [editCheck, setEditCheck] = useState();
    const [category, setcategory] = useState("normal");


    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(task))
    }, [task])

    useEffect(() => {
        change_color(category);
    }, [category])
    //changing category 
    const change_cate = (val) => {
        setcategory(val);
    }


    //adding item to list
    const addItem = () => {
        if (!inputdata) {
            alert("Please write some tasks 🙏");
        }
        else if (editCheck) {
            const arr = task.map((curElem) => {
                if (curElem.id === editCheck) {
                    const obj = { "texts": inputdata, "id": editCheck, "category": category };
                    return obj;
                }
                return curElem;
            })
            setTask(arr);
            setEditCheck("");
            setInputdata("");
        }
        else {
            const val = {
                "texts": inputdata,
                "id": new Date().getTime().toString(),
                "category": category
            }
            setTask([...task, val]);
            setInputdata("");
        }
    }

    //deleting items
    const deleteItem = (Id) => {
        const list = task.filter((curElem) => {
            return curElem.id !== Id
        })
        setTask(list)
    }
    //edit items
    const editItem = (Texts, Id) => {
        setInputdata(Texts);
        setEditCheck(Id)
    }
    //remove all
    const removeAll = () => {
        const ch = window.confirm("do u really want to delete task of all the category");
        if (ch) {
            setTask([]);
        }

    }
    function change_color(id) {

        color.map((curElem) => {
            if (curElem === id) {
                document.getElementById(id).setAttribute("style", "color:white; background-color:black;font-weight: bold;")
            }
            else {
                document.getElementById(curElem).setAttribute("style", "color:rgb(204, 67, 135); background-color:aliceblue;font-weight:normal;")
            }
            return ("")
        })

    }
    return (

        <div className="screen">
            <div className="container">
                <h1 className="Todo-heading">Todo - List</h1>
                <h3 className="Todo-cat">Choose your catagory here :</h3>

                <div className="day">

                    <div className="normal" id="normal" onClick={() => { change_cate("normal"); change_color('normal'); }}>Normal🟡</div>
                    <div className="important" id="important" onClick={() => { change_cate("important"); change_color('important'); }}>Important🟢</div>
                    <div className="urgent" id="urgent" onClick={() => { change_cate("urgent"); change_color('urgent'); }}>Urgent🔴</div>
                </div>
                <div className="list_container">
                    <div className="type_box">
                        <input type="text"
                            placeholder="write a task ✍"
                            value={inputdata}
                            onChange={(event) => setInputdata(event.target.value)}
                        />
                        {!editCheck ? (<div className="add" onClick={addItem}>➕</div>) : (<div className="add" onClick={addItem}>✍</div>)}


                    </div>
                    <div className="task_container">

                        {task.map((curElem) => {
                            if (curElem.category === category) {
                                return (
                                    <div className="task_box" key={curElem.id}>
                                        <div className="texts">{curElem.texts}</div>
                                        <div className="icons">
                                            <div className="delete" onClick={() => deleteItem(curElem.id)}>❌</div>
                                            <div className="edit" onClick={() => editItem(curElem.texts, curElem.id)}>✍</div>

                                        </div>


                                    </div>
                                )
                            }//end if
                            return (<></>)
                        })}


                        <center> <div className="removeall" onClick={removeAll}>Remove all 🚽</div>  </center>
                    </div>
                </div>

                <footer>Made with ❤ by Swayam prakash sahoo
                    <p>Hacktoberfest 2021</p>
                </footer>
            </div>
        </div >

    );
}

export default Todo;

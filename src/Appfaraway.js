import { useState } from "react";

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "shose", quantity: 1, packed: true },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "shose", quantity: 1, packed: true },
];

export default function App() {
  const [list, setList] = useState([]);

  function handleAddItem(item) {
    setList((items) => [...items, item]);
  }

  function handleDelete(id) {
    let newList = list.filter((i) => {
      return i.id !== id;
    });
    setList(newList);
  }
  return (
    <div className="app">
      <Logo />
      <Form list={list} handleAddItem={handleAddItem} />
      <PackingList list={list} handleDelete={handleDelete} setList={setList}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ list, handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description.trim() === "") {
      alert("description cant be Empty");
      return;
    }
    const newItem = {
      description,
      quantity,
      packed: false,
      id: list?.length + 1,
    };

    handleAddItem(newItem);
    setDescription(() => "");
    setQuantity(() => 1);
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>what do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ list, handleDelete , setList}) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <input type="checkbox" name="" id="" />
              <span
                style={item.packed ? { textDecoration: "line-through" } : {}}
              >
                {item.quantity}
                <span> </span>
                {item.description}
              </span>
              <button onClick={() => handleDelete(item.id)}>❌</button>
            </li>
          );
        })}
      </ul>
      <button onClick={()=>setList([])}>reset</button>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

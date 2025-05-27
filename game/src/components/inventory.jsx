import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToInventory } from "../slices/playerSlice";

const Inventory = () => {
  const inventory = useSelector((state) => state.player.inventory);
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addItemToInventory(item));
  };

  return (
    <div>
      <h3>Inventory</h3>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => addItem("Potion")}>Add Potion</button>
    </div>
  );
};

export default Inventory;

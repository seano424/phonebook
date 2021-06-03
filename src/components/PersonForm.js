import React from "react";

export default function PersonForm({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) {
  return (
    <>
      <h2>Add a New Person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

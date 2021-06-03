import React from "react";

export default function Filter({ handleFilteredContent }) {
  return (
    <div>
      filter shown with <input type="text" onChange={handleFilteredContent} />
    </div>
  );
}

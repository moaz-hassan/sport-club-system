/* eslint-disable react/prop-types */
function Filter({ openFilter, setOpenFilter }) {
  return (
    <div className="filter-aside" style={openFilter ? { left: "0" } : null}>
      <div className="filter-header">
      <h2>Filter</h2>
      <span onClick={() => setOpenFilter(false)}>&times;</span>
      </div>
      <div className="filter-items">
        <ul></ul>
      </div>
    </div>
  );
}

export default Filter;

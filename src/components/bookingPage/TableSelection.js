import { ReactComponent as TableImg } from "../../assets/img/round-table-svgrepo-com.svg";

const TableSelection = ({ tables, selectedTable, setSelectedTable }) => {
  return (
    <>
      {tables.map((table) => (
        <button
          className="table-button"
          key={table.id}
          onClick={(e) => {
            e.preventDefault();
            setSelectedTable(table);
          }}
          style={{
            color: table.id === selectedTable.id ? "#495E57" : "#EDEFEE",
            fill: table.id === selectedTable.id ? "#495E57" : "#EDEFEE",
            backgroundColor: "#ffffff",
          }}
          disabled={table.reserved}
        >
          <TableImg
            fill={
              table.reserved === false
                ? table.id === selectedTable.id
                  ? "#495E57"
                  : "#EDEFEE"
                : "#EE9972"
            }
          />
          {table.name}
        </button>
      ))}
    </>
  );
};

export default TableSelection;

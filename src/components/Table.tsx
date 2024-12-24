// TableComponent.tsx

import React from "react";
import { useTable, Column } from "react-table";
import { Table } from "react-bootstrap";

interface TableComponentProps {
  columns: Column<any>[];
  data: any[];
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
  // Use the useTable hook from react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()} striped bordered hover responsive>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComponent;
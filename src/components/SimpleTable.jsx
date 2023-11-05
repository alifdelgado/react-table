import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const SimpleTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <input
        type="text"
        onChange={(e) => setFiltering(e.target.value)}
        value={filtering}
        placeholder="Search..."
        className="border p-2 rounded shadow mb-2 w-2/5"
      />
      <table className="border bg-slate-100">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-2 py-4 border text-lg"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {
                    { asc: "🔼", desc: "🔽" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-around mt-3 shadow">
        <button
          type="button"
          className="p-2 bg-indigo-800 text-white rounded-l"
          onClick={() => table.setPageIndex(0)}
        >
          First
        </button>
        <button
          type="button"
          className="p-2 bg-indigo-800 text-white"
          onClick={() => table.previousPage()}
        >
          Prev
        </button>
        <button
          type="button"
          className="p-2 bg-indigo-800 text-white"
          onClick={() => table.nextPage()}
        >
          Next
        </button>
        <button
          type="button"
          className="p-2 bg-indigo-800 text-white rounded-r"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default SimpleTable;

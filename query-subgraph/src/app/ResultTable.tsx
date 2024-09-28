"use client";
import React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import styles from "./ResultTable.module.scss";

interface ResultTableProps {
  rowsData: Array<Object> | [];
  columnsData: string[];
}

const ResultTable = ({ rowsData, columnsData }: ResultTableProps) => {
  const columns: ColumnDef<unknown, any>[] = [
    ...columnsData.map((column) => {
      return {
        accessorKey: column,
        header: column,
      };
    }),
  ];

  const table = useReactTable({
    data: rowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {table.getHeaderGroups()[0].headers.length > 0 && (
        <div className={styles.resultTable}>
          <Table className={styles.table}>
            <TableHeader className={styles.tableHeader}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className={styles.tableColumn}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="overflow-y-auto">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={styles.tableRow}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={styles.tableCell}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className={styles.tableRow}>
                  <TableCell
                    className={styles.tableCell}
                    colSpan={columns.length}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ResultTable;

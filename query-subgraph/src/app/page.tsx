"use client";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient"; //
import ResultTable from "./ResultTable";
import { queries } from "./constants";
import styles from "./page.module.scss";

export default function Home() {
  const [columnsDataList, setColumnsDataList] = useState<string[]>([]);
  const [rowsDataList, setRowsDataList] = useState<Array<Object>>([]);

  const [queryDetails] = useState<{ queryName: string; query: string }>(queries[2]);

  const GET_DATA_QUERY = gql`
    ${queryDetails.query}
  `;

  const { loading, error, data } = useQuery(GET_DATA_QUERY, { client });

  useEffect(() => {
    if (data) {
      const extractedColumns = Object.keys(data[queryDetails.queryName]?.[0] || {});
      const extractedRows = data[queryDetails.queryName] || [];

      setColumnsDataList(extractedColumns);
      setRowsDataList(extractedRows);
    }

    if (error) {
      console.error("GraphQL query error:", error);
    }
  }, [data, error, queryDetails.queryName]);

  return (
    <main className={styles.mainContainer}>
      {loading ? (
        <p className="text-xl text-slate-200 text-center font-bold">Fetching...</p>
      ) : (
        <>
          <h1 className="text-xl text-slate-200 font-bold py-2 px-[15px]">{queryDetails.queryName}</h1>
          <ResultTable
            columnsData={columnsDataList}
            rowsData={rowsDataList}
          />
        </>
      )}
    </main>
  );
}

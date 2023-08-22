import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";

import "./Excel.scss";

const ExportToExcelButton = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aquí se obtienen los datos de Firebase y se almacenan en `data`
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "task"));
      const newData = querySnapshot.docs.map((doc) => doc.data());
      setData(newData);
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "datos.xlsx");
  };

  return (
    <button onClick={exportToExcel}>
      Exportar datos a Excel
      <div class="arrow-wrapper">
        <div class="arrow"></div>
      </div>
    </button>
  );
};

export default ExportToExcelButton;

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const SampleDataTable = (props) => {

  const [data, setData] = useState([])
  useEffect(() => {
    setData([...props.departmentData])
    console.log(data);
  }, [])


  const columns = [
    {
      name: 'Index',
      selector: '_id',
    },
    {
      name: 'Name',
      selector: 'departmentName',
    },
    {
      name: 'departmentImg',
      cell: (row) => <img src={row.image} alt={row.name} width="50" />,
    },
    {
      name: 'Description',
      selector: 'departmentHead',
    },
    {
      name: 'Status',
      selector: 'status',
    },
    {
      name: 'Action',
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ];

  const handleDelete = (id) => {
   
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
    </div>
  );
};

export default SampleDataTable;

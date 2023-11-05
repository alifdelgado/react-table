import dayjs from "dayjs";
import SimpleTable from "./components/SimpleTable";
import data from "./data.json";
const App = () => {
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "First Name", accessorKey: "first_name" },
    { header: "Last Name", accessorKey: "last_name" },
    { header: "Email", accessorKey: "email" },
    { header: "Country", accessorKey: "country" },
    {
      header: "Birth Date",
      accessorKey: "birth_date",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className="container mx-auto h-screen">
      <SimpleTable columns={columns} data={data} />
    </div>
  );
};

export default App;

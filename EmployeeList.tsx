import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import React from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50% -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderradius: 2,
  boxShadow: 24,
  p: 4,
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch employee data
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);
  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleCLose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Employee List
      </Typography>

      <TextField
        label="Search Employee"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                hover
                onClick={() => handleRowClick(employee)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleCLose}>
        <Box sx={style}>
          {selectedEmployee && (
            <div>
              <Typography variant="h6" gutterBottom>
                {selectedEmployee.name}
              </Typography>
              <Typography>Email: {selectedEmployee.email}</Typography>
              <Typography>Phone: {selectedEmployee.phone}</Typography>
              <Typography>Company: {selectedEmployee.company.name}</Typography>
              <Typography>Website: {selectedEmployee.website}</Typography>
              <Typography>
                Address:{" "}
                {`${selectedEmployee.address.street}, ${selectedEmployee.address.city}`}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeList;


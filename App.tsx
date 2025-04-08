import { Container, Typography } from "@mui/material";
import React from "react";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Employee Directory
      </Typography>
      <EmployeeList />
    </Container>
  );
}

export default App;

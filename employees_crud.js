const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Static list of employees
let employees = [
  { id: 1, name: 'John Doe', email: 'john@example.com', salary: 50000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', salary: 60000 },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', salary: 55000 }
];

app.use(bodyParser.json());

// Create an employee
app.post('/employees', (req, res) => {
  const { name, email, salary } = req.body;
  const id = employees.length + 1; // Generate a unique ID (not ideal for production use)
  const newEmployee = { id, name, email, salary };
  employees.push(newEmployee);
  res.json(newEmployee);
});

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Get an employee by ID
app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id === parseInt(id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, salary } = req.body;
  const index = employees.findIndex(emp => emp.id === parseInt(id));
  if (index !== -1) {
    employees[index] = { id: parseInt(id), name, email, salary };
    res.json(employees[index]);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === parseInt(id));
  if (index !== -1) {
    const deletedEmployee = employees.splice(index, 1);
    res.json({ message: 'Employee deleted successfully', deletedEmployee });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const data = {
  employee: require("../model/employeeData.json"),
  setEmployee: function (data) {
    this.employee = data;
  },
};
console.log("hello its my employee", data.employee);

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employee[data.employee.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  data.setEmployee([...data.employee, newEmployee]);
  res.json(data.employee);
};

const updateEmployee = (req, res) => {
  const employee = data.employee.find(
    (emp) => (emp.id = parseInt(req.body.id))
  );

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employee.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employee);
};

const deleteEmployee = (req, res) => {
  const employee = data.employee.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  const filteredArray = data.employee.filter(
    (emp) => emp.id === parseInt(req.body.id)
  );
  data.setEmployee([...filteredArray]);
  res.json(data.employee);
};

const getEmployee = (req, res) => {
  const employee = data.employee.find((emp = emp.id === parseInt(req.body.id)));
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};

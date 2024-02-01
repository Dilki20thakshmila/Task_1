const Employee = require('./model');

// Controller functions

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.log(error);
        //res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            employee.set(req.body);
            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            console.log('Employee not found'); // Log a custom error message
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: error.message });
    }
};


/*const updateEmployeeFields = async (req, res) => {
    // Implement logic to update specific fields of an employee
};*/

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            await employee.remove();
            res.json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    //updateEmployeeFields,
    deleteEmployee
};

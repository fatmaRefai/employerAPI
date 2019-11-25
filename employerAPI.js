const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();
app.listen(8080, () => { console.log('The Server is ON'); });

const employees = [
    { ID: 101, Name: 'Donald Duck', Department: 'Marketing', Salary: 10000 },
    { ID: 102, Name: 'Mickey Mouse', Department: 'Software Engineering', Salary: 15000 },
    { ID: 103, Name: 'Goofy', Department: 'Management', Salary: 30000 }
];

app.get('/employees', (req, res) => {
    res.send(employees);
});

app.post('/employees/add', jsonParser, (req, res) => {
    const employee = {
        ID: req.body.id,
        Name: req.body.name,
        Department: req.body.department,
        Salary: req.body.salary
    };
    employees.push(employee);
    res.status(200).send(employees);

});

app.patch('/employees/update/:id', (req, res) => {
    const employee = employees.find((element) => {
        if (element.ID === parseInt(req.params.id)) { return true; }
    });
    if (employee) {
        for (let i in req.body) {
            employee[i] = req.body[i];
        }
        return res.status(200).send(employee);
    }
    return res.status(404).send('Wrong ID, No Employee Found');
});

app.delete('/employees/delete/:id', (req, res) => {

    const employee = employees.find((element) => {
        {
            return true;
        }
    });

    if (employee) {
        const index = employees.indexOf(employee);
        employees.splice(index, 1);
        return res.status(200).send(employee);
    }
    return res.status(404).send('Wrong ID, No Employee Found');
});
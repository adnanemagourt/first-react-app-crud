import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';

import { EmployeeContext } from '../contexts/EmployeeContext';


const EditForm = ({theEmployee}) => {
    const { updateEmployee } = useContext(EmployeeContext);
    const [name, setName] = useState(theEmployee.name);
    const [email, setEmail] = useState(theEmployee.email);
    const [address, setAddress] = useState(theEmployee.address);
    const [phone, setPhone] = useState(theEmployee.phone);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEmployee = { id: theEmployee.id, name, email, address, phone };
        updateEmployee(theEmployee.id, updatedEmployee);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                as="textarea"
                placeholder="Address"
                value={address}
                onChange={(e)=>{setAddress(e.target.value)}}
                rows={3}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e)=>{setPhone(e.target.value)}}
                />
            </Form.Group>
            <Button variant="success" type="submit">
                Edit employee
            </Button>
        </Form>
    );
};

export default EditForm;
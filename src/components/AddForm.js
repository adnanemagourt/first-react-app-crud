import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';

import { EmployeeContext } from '../contexts/EmployeeContext';


const AddForm = () => {
    const { addEmployee } = useContext(EmployeeContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(name, email, address, phone);
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
                Add new employee
            </Button>
        </Form>
    );
};

export default AddForm;
import { useContext, useState, useEffect } from 'react';

import Employee from './Employee';
import { EmployeeContext } from '../contexts/EmployeeContext';
import { Alert, Button, Modal, FormControl, InputGroup } from 'react-bootstrap';
import AddForm from './AddForm';
import Pagination from './Pagination';

const EmployeeList = () => {

    const { sortedEmployees } = useContext(EmployeeContext);

    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');
    // const [searchResults, setSearchResults] = useState(sortedEmployees);

    const searchResults = sortedEmployees.filter((employee) => {
        return Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    });

    // const handleSearch = (e) => {
    //     setSearchTerm(e.target.value);
    //     if (searchTerm !== '') {
    //         const newEmployeeList = sortedEmployees.filter((employee) => {
    //             return Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    //         });
    //         setSearchResults(newEmployeeList);
    //     } else {
    //         setSearchResults(sortedEmployees);
    //     }
    // };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        handleClose();
        return () => {
            handleShowAlert();
        };
    }, [sortedEmployees]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = searchResults.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(searchResults.length / employeesPerPage);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };



    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>

                    <div className="col-sm-6 d-flex justify-content-end">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                        <Button onClick={handleShow} className="btn btn-success ml-2" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div>

                    {/* <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div> */}
                </div>
            </div>

            <Alert show={showAlert} variant='success'>
                Employee list updated successfully!
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map(employee => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentEmployees={currentEmployees.length}
                allEmployees={searchResults.length} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}


export default EmployeeList;

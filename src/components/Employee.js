import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from "./EditForm";
import ConfirmationModal from './ConfirmationModal';

const Employee = ({ employee }) => {

    const { deleteEmployee } = useContext(EmployeeContext);

    const [show, setShow] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose();
    }, [employee]);

    const handleDeleteConfirmation = () => {
        deleteEmployee(employee.id);
        setShowConfirmationModal(false); // Close the confirmation modal after action
    };


    return (
        <>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
                <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Edit
                    </Tooltip>
                }>
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Delete
                    </Tooltip>
                }>
                    <button onClick={() => setShowConfirmationModal(true)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theEmployee={employee} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <ConfirmationModal
                show={showConfirmationModal}
                onHide={() => setShowConfirmationModal(false)}
                onConfirm={handleDeleteConfirmation}
                message={`Do you want to delete employee ${employee.name}?`}
            />

        </>
    );
}

export default Employee;

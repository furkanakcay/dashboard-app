import React, { useState, useEffect } from 'react';
import EmployeeDetail from './EmployeeDetail';
import {createResource, fetchResources} from "../services/apiService";
import {apiResources} from "../appConstants";
import SearchBox from "../components/SearchBox";
import DetailTable from "../components/DetailTable";
import Modal from "../components/Modal";
import EmployeeForm from "../forms/EmployeeForm";

function DepartmentDetail({ entity }) {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchEmployees(entity.id, currentPage, searchQuery);
    }, [entity.id, currentPage, searchQuery]);

    const fetchEmployees = async (departmentId, page, query) => {
        const response = await fetchResources(apiResources.DEPARTMENTS + `/${departmentId}` + apiResources.EMPLOYEES, query, page);
        setEmployees(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveEmployee = async (employee) => {
        await createResource(apiResources.DEPARTMENTS + "/" + entity.id + apiResources.EMPLOYEES, employee);
        closeModal();
        fetchEmployees(entity.id, currentPage, searchQuery);
    };

    return (
        <div>
            <div className="header-with-button">
                <h3>Employees in {entity.name}</h3>
                <button onClick={openModal}>Create Employee</button>
            </div>
            <SearchBox placeholder={`Search Employees in ${entity.name}...`} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {employees.length === 0 ? (
                <p>No employees found in {entity.name}</p>
            ) : (
                <DetailTable resources={employees}
                             currentPage={currentPage}
                             totalPages={totalPages}
                             setCurrentPage={setCurrentPage}
                             DetailComponent={<EmployeeDetail/>}
                ></DetailTable>
            )}

            <Modal show={showModal} onClose={closeModal}>
                <EmployeeForm department={entity} closeModal={closeModal} onSave={saveEmployee}/>
            </Modal>
        </div>
    );
}

export default DepartmentDetail;

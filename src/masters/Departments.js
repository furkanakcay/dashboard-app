import React, { useState, useEffect } from 'react';
import DepartmentDetail from '../details/DepartmentDetail';
import {createResource, fetchResources} from "../services/apiService";
import {apiResources} from "../appConstants";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import MasterList from "../components/MasterList";
import SimpleEntityForm from "../forms/SimpleEntityForm";

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDepartments(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchDepartments = async (page, query) => {
        const response = await fetchResources(apiResources.DEPARTMENTS, query, page, 5);
        setDepartments(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveDepartment = async (name) => {
        await createResource(apiResources.DEPARTMENTS, { name });
        closeModal();
        fetchDepartments(currentPage, searchQuery);
    };

    return (
        <div>
            <div className="header-with-button">
                <h3>Departments</h3>
                <button onClick={openModal}>Create Department</button>
            </div>
            <SearchBox placeholder="Search Departments..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {departments.length === 0 ? (
                <p>No departments found</p>
            ) : (
                <MasterList resources={departments}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            DetailComponent={<DepartmentDetail/>}
                ></MasterList>
            )}

            <Modal show={showModal} onClose={closeModal}>
                <SimpleEntityForm entityName={"Department"} closeModal={closeModal} onSave={saveDepartment}/>
            </Modal>
        </div>
    );
}

export default Departments;

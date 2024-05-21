import React, { useState, useEffect } from 'react';
import StudentDetail from './StudentDetail';
import {createResource, fetchResources} from "../services/apiService";
import {apiResources} from "../appConstants";
import SearchBox from "../components/SearchBox";
import DetailTable from "../components/DetailTable";
import Modal from "../components/Modal";
import StudentForm from "../forms/StudentForm";

function CourseDetail({ entity }) {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchStudents(entity.id, currentPage, searchQuery);
    }, [entity.id, currentPage, searchQuery]);

    const fetchStudents = async (courseId, page, query) => {
        const response = await fetchResources(apiResources.COURSES + `/${courseId}` + apiResources.STUDENTS, query, page);
        setStudents(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveStudent = async (employee) => {
        await createResource(apiResources.COURSES + "/" + entity.id + apiResources.STUDENTS, employee);
        closeModal();
        fetchStudents(entity.id, currentPage, searchQuery);
    };

    return (
        <div>
            <div className="header-with-button">
                <h3>Students in {entity.name}</h3>
                <button onClick={openModal}>Create Student</button>
            </div>
            <SearchBox placeholder={`Search Students in ${entity.name}...`} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {students.length === 0 ? (
                <p>No employees found in {entity.name}</p>
            ) : (
                <DetailTable resources={students}
                         currentPage={currentPage}
                         totalPages={totalPages}
                         setCurrentPage={setCurrentPage}
                         DetailComponent={<StudentDetail/>}
                ></DetailTable>
            )}

            <Modal show={showModal} onClose={closeModal}>
                <StudentForm course={entity} closeModal={closeModal} onSave={saveStudent}/>
            </Modal>
        </div>
    );
}

export default CourseDetail;

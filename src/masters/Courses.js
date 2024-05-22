import React, { useState, useEffect } from 'react';
import CourseDetail from '../details/CourseDetail';
import {createResource, fetchResources} from "../services/apiService";
import {apiResources} from "../appConstants";
import SearchBox from "../components/SearchBox";
import MasterList from "../components/MasterList";
import SimpleEntityForm from "../forms/SimpleEntityForm";
import Modal from "../components/Modal";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCourses(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchCourses = async (page, query) => {
        const response = await fetchResources(apiResources.COURSES, query, page, 5);
        setCourses(response.data.content);
        setTotalPages(response.data.totalPages);
    };


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveCourse = async (name) => {
        await createResource(apiResources.COURSES, { name });
        closeModal();
        fetchCourses(currentPage, searchQuery);
    };

    return (
        <div>
            <div className="header-with-button">
                <h3>Courses</h3>
                <button onClick={openModal}>Create Course</button>
            </div>
            <SearchBox placeholder="Search Courses..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {courses.length === 0 ? (
                <p>No courses found</p>
            ) : (
                <MasterList resources={courses}
                             currentPage={currentPage}
                             totalPages={totalPages}
                             setCurrentPage={setCurrentPage}
                             DetailComponent={<CourseDetail/>}
                ></MasterList>
            )}

            <Modal show={showModal} onClose={closeModal}>
                <SimpleEntityForm entityName={"Course"} closeModal={closeModal} onSave={saveCourse}/>
            </Modal>
        </div>
    );
}

export default Courses;

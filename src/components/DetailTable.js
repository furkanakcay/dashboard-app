import React, {useState} from 'react';
import Pagination from "./Pagination";
import Modal from "./Modal";
import StudentDetail from "../details/StudentDetail";

const DetailTable = ({resources, currentPage, setCurrentPage, totalPages, DetailComponent}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const selectResource = (resource) => {
        setSelectedResource(resource);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedResource(null);
        document.body.classList.remove('modal-open');
    };

    return <div>
        <table className="styled-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {resources.map(resource => (
                <tr key={resource.id}
                    onClick={() => selectResource(resource)}
                    className={selectedResource && selectedResource.id === resource.id ? 'active-row' : ''}
                >
                    <td>{resource.id} </td>
                    <td>{resource.name} </td>
                    <td>{resource.email} </td>
                </tr>
            ))}
            </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <Modal show={showModal} onClose={closeModal}>
            {selectedResource && (
                React.cloneElement(DetailComponent, {entity: selectedResource})
            )}
        </Modal>
    </div>
}

export default DetailTable;
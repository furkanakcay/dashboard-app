import React, {useState} from 'react';
import Pagination from "./Pagination";

const MasterList = ({resources, currentPage, setCurrentPage, totalPages, DetailComponent}) => {
    const [selectedResource, setSelectedResource] = useState(null);

    return <div>
        <ul className="styled-list">
            {resources.map(resource => (
                <li key={resource.id} onClick={() => setSelectedResource(resource)}
                    className={selectedResource && selectedResource.id === resource.id ? 'active-item' : ''}>
                    {resource.name}
                </li>
            ))}
        </ul>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        {selectedResource &&
            React.cloneElement(DetailComponent, {entity: selectedResource})
        }
    </div>;
}

export default MasterList;
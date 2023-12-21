import React, { useState, useEffect } from 'react';

function Tasklist({ date }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/days/${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTasks(data.hours || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [date]); // useEffect will run when `date` changes

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="daily-tasks">
            {tasks.length > 0 ? (
                tasks.map((hour, index) => (
                    <div key={index} className="task">
                        <strong>{hour.hour}</strong>: {hour.tasks.join(', ')}
                    </div>
                ))
            ) : (
                <p>No tasks for this day.</p>
            )}
        </div>
    );
}

export default Tasklist;
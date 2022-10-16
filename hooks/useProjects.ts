import { useEffect, useState } from 'react';
import { IProjects } from '../data/types';

function useProjects() {
    const [projects, setProjects] = useState<IProjects>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data.reverse());
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return { projects, loading, error };
}

export default useProjects;

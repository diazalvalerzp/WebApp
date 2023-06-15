// Create a new tutorial
export const createTutorial = async (tutorialData) => {
    try {
        const response = await fetch('https://nicefunktion.azurewebsites.net/api/createTutorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutorialData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating tutorial:', error);
        throw error;
    }
};

// Get all tutorials
export const getAllTutorials = async () => {
    try {
        const response = await fetch('https://nicefunktion.azurewebsites.net/api/tutorials');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving tutorials:', error);
        throw error;
    }
};

// Get a specific tutorial by ID
export const getTutorialById = async (id) => {
    try {
        const response = await fetch(`https://nicefunktion.azurewebsites.net/api/tutorials/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving tutorial:', error);
        throw error;
    }
};

// Update a tutorial
export const updateTutorial = async (id, updatedTutorialData) => {
    try {
        const response = await fetch(`https://nicefunktion.azurewebsites.net/api/tutorials/${id}/updateTutorial`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTutorialData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating tutorial:', error);
        throw error;
    }
};

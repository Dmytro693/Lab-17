// Asynkhronna funktsiya dlya otrimannya foto z API
export const fetchPhotos = async (page = 1, limit = 4) => {
    try {
        // Formuvannya URL iz parametramy page ta limit
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error('Merezheva pomylka pry zavantazhenni danykh');
        }
        
        // Konvertatsiya vidpovidi u JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Obrobka pomylok, yakscho shos pitye ne tak
        console.error('Pomylka API:', error);
        return [];
    }
};
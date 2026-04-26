import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/photosApi';
import './Gallery.css'; // Pidklyuchennya styliv

const Gallery = () => {
    // Initsializatsiya stanyv
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Vyklyk API pry kozhnij zmini storinky (zminnoyi page)
    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true); // Vmykayemo indikator zavantazhennya
            
            // Zavantazhennya 4 kartynok dlya potochnoyi storinky
            const data = await fetchPhotos(page, 4);
            setPhotos(data);
            
            setLoading(false); // Vymykayemo indikator
        };

        loadPhotos();
    }, [page]); // Masiv zalezhnostej: efekt spratsyuye tilky koly zminytsya page

    // Obrobnyky natyskannya na knopky
    const handleNext = () => setPage(prevPage => prevPage + 1);
    
    // Zaboronyayemo perekhid na storinku menshu za 1
    const handlePrev = () => setPage(prevPage => Math.max(prevPage - 1, 1));

    return (
        <div className="gallery-container">
            <h2>Moya Galereya</h2>

            <div className="controls">
                {/* Knopka "Poperedni" neaktyvna, yakscho storinka 1 abo jde zavantazhennya */}
                <button onClick={handlePrev} disabled={page === 1 || loading}>
                    Попередні
                </button>
                <span className="page-indicator">Storinka: {page}</span>
                <button onClick={handleNext} disabled={loading}>
                    Наступні
                </button>
            </div>

            {/* Vidobrazhennya zavantazhennya abo spysku foto */}
            {loading ? (
                <div className="loader">Zavantazhennya...</div>
            ) : (
                <div className="photos-grid">
                    {photos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <img src={photo.download_url} alt={`Foto vid ${photo.author}`} />
                            <p className="author-name">Avtor: {photo.author}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
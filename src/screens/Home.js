import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodcat, setFoodcat] = useState([]);
    const [fooditem, setFooditem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5002/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            response = await response.json();
            setFooditem(response[0] || []);
            setFoodcat(response[1] || []);
            console.log(response[0], response[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFooditem([]);
            setFoodcat([]);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://unsplash.com/photos/a-man-sitting-in-front-of-a-laptop-computer-RtOINPihAeQ" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Carousel Image 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1721679242133-4574b1408b94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Carousel Image 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1721679242133-4574b1408b94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Carousel Image 3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {foodcat.length > 0 ? (
                    foodcat.map((data) => (
                        <div key={data.id} className='row mb-3'>
                            <div className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {fooditem.length > 0 ? (
                                fooditem
                                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((filterItems) => (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                            <Card foodItem={filterItems} options={filterItems.options[0]} />
                                        </div>
                                    ))
                            ) : (
                                <div>No such data found</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No categories available</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'


export default function Home() {
    const [search,setsearch]=useState('')
    const [foodcat, setfoodcat] = useState([])
    const [fooditem, setfooditem] = useState([])
    const loadData = async () => {
        let response = await fetch("http://localhost:5002/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json()
        setfooditem(response[0])
        setfoodcat(response[1])
        console.log(response[0], response[1])
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=>{setsearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="https://source.unsplash.com/random/300x300/?burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="https://source.unsplash.com/random/300x300/?pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="https://source.unsplash.com/random/300x300/?barbeque" />
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
            </div></div>
            <div className='container'>
                {
                    foodcat !== []
                        ? foodcat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data.id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                                .map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                            <Card foodItem={filterItems} options={filterItems.options[0]}  />
                                        </div>

                                    )
                                }) : <div> no such data found</div>}
                            </div>
                            )
                        })
                        : <div>""""</div>
                }

            </div>

            <div><Footer /></div>
        </div>
    )
}


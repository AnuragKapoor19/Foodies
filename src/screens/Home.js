import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
const img1 = "https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=2048x2048&w=is&k=20&c=8TokrDFU7l0NCqcEng6hHp6EqYn1dcwyH7uc9tbIN3U="
const img2 = "https://www.bitesbee.com/wp-content/uploads/2021/09/banner-3.jpg"
const img3 = "https://www.chefonline.co.uk/blog/public/storage/image/post_image/post_image_21650621182.png"

export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const localData = async () => {
    let response = await fetch("http://localhost:4000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    response = await response.json()

    setfoodCat(response[1])
    setfoodItem(response[0])
    // console.log(response[0], response[1])

  }

  useEffect(() => {
    localData()
  }, [])

  return (
    <div>
      <div> <Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-caption" style={{ zIndex: "1" }}>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
            </form>
          </div>
          <div className="carousel-inner" style={{ maxHeight: '60vh', zIndex: '0', opacity: '90%' }}>
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt="img1" />
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="img2" />
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="img3" />
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
      {/* <div className='d-flex flex-wrap mt-4 bg-danger justify-content-around'> */}
      <div className='container mt-3'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>

                <div key={data._id} className='fs-3'>{data.CategoryName}</div>
                <hr />
                {foodItem !== []
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(
                    (filterItems) => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      )
                    }
                  ) : <div>No Such Data Found </div>
                }
              </div>
              )
            })
            : ""
        }
      </div>
      <div> <Footer /> </div>
    </div>
  )
}

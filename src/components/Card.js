import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    let priceRef = useRef();
    let options = props.options
    let priceOptions = Object.keys(options)
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")

    const handleCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc})
        // console.log(data)
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "500px", "border": "1px solid black"}}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ "height": "15rem", "objectFit": "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className='container w-80 d-flex align-items-center justify-content-around'>
                        <select className='bg-danger m-2 h-100 text-light rounded' onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='bg-danger m-2 h-100 text-light rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline fs-5 h-100'>
                            ₹{finalPrice}/-
                        </div>
                        <hr />
                    </div>
                    {(localStorage.getItem("authToken"))?
                    <div className='btn bg-danger text-light w-100' onClick={handleCart}>Add to cart</div>
                    : " "}
                </div>
            </div>
        </div>
    )
}
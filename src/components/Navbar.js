import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {

  let data = useCart()
  const [cartView, setcartView] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar bg-danger navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic text-warning" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-light fs-4" aria-current="page" to="/">Home</Link>
              </li>


              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link text-light fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                  </li>
                  : ""
              }
            </ul>

            {
              (!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  <Link className="btn bg-light text-danger mx-1" to="/loginuser">Login</Link>
                  <Link className="btn bg-light text-danger mx-1" to="/createuser">Signup</Link>
                </div>
                :
                <div>
                  <div className='btn bg-light text-danger mx-1' onClick={() => setcartView(true)}>
                    My Cart {" "}
                    <Badge pill bg="danger"> {data.length} </Badge>
                  </div>
                  {cartView ? <Modal onClose={() => setcartView(false)}> <Cart /> </Modal> : null}
                  <div className='btn bg-light text-danger mx-1 btn-outline-danger' onClick={handleLogout}>Log Out</div>
                </div>
            }


          </div>
        </div>
      </nav>
    </div>
  )
}

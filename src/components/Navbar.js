import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const [cartView,setcartView]=useState(false)
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2" >
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">Home</Link>

              </li>
              {(localStorage.getItem("authtoken"))?
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/myorder">My Orders</Link>

              </li>
              :""
              } 

            </ul>
            {(!localStorage.getItem("authtoken"))?
              <div className='d-flex'>
                <Link className="btn btn-light text-success mx-1" to="/login">Login</Link>
                <Link className="btn btn-light text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :<div>
              <div className='btn btn-light text-success mx-2' onClick={()=>{setcartView(true)}}>
                My Cart{" "}
                <Badge pill bg='danger'>{data.length}</Badge>
              </div>
              {cartView?<Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}

              <div className='btn btn-light text-danger mx-2' onClick={handlelogout}>
                Logout
              </div>
              </div>
            }
          </div>
          
            
        </div>
      </nav>
    </div>
  )
}

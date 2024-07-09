import React from 'react'
import ReactDOM from 'react-dom'



export default function Modal({ children, onClose }) {
    const MODAL_STYLES = {
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        height: "90%",
        width: "90%"
    }

    const OVERLAY_STYLES = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0)",
        zIndex: 10
    }
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <button type="button" className='btn bg-light text-danger btn-outline-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
                {children}
            </div>
        </>,
        document.getElementById('cart-root')
    )
}

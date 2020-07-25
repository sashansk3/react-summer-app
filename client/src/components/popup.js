import React, {useRef} from 'react'
import "../styles/popup.scss"

export default function PopUp(props){
  const
    popup        = useRef(null),
    popupContent = useRef(null);

  const closePopUp = (e) => {
    let
      x     = e.pageX,
      y     = e.pageY,
      that  = popupContent.current,
      contW = that.offsetWidth,
      contH = that.offsetHeight;

    if(x === 0 && y === 0) return
    if(x < that.offsetLeft || x > that.offsetLeft + contW || y < that.offsetTop + window.pageYOffset || y > that.offsetTop + contH + window.pageYOffset)
      props.close(false)
  }
  let style = props.isOpen? {display: "flex"}: {display: "none"}
  return(
    <div className="popup" ref={popup} style={style} onClick={closePopUp}>
      <div className="popup_content" ref={popupContent}>
        {props.children}
      </div>
    </div>
  )
}
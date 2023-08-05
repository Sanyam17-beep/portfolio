import React from 'react'

function Footer({dateState}) {
  return (
    <div id="footer">
        <div id="footerleft">
            <h5>2023 &copy;</h5>
            <h5>{dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            
            })}</h5>
        </div>
        <div id="footerright">
            <a href="#">GitHub</a><a href="#">instagram</a><a href="#">linkedin</a><a href="#">twitter</a>
        </div>
    </div>
  )
}

export default Footer
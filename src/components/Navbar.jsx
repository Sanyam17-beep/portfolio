import React, { useState } from 'react'

function Navbar() {
  const [showMenu,setShowMenu] = useState(false);

  
  
  return (
    <nav className='outer-nav' data-scroll data-scroll-sticky data-scroll-target="#main">
    <div id="nav">
        <div id="Name"><a href="#">Sanyam<span className='underline'></span></a></div>
        {!showMenu && <div id="menu">
          <h4 className="js-work-link" onClick={()=>setShowMenu(!showMenu)}>MENU+<span className='underline'></span></h4>
        </div>
        }

        {
          showMenu &&
          <div className='navItems'>
            <ul className='skill_list'>
              <li className="my_items">Skills</li>
              <li className="my_items">Experience</li>
              <li className="my_items">Projects</li>
              <li className="my_items">Contact</li>
            </ul>
          </div>
        }

      </div>

    </nav>
  )
}

export default Navbar;
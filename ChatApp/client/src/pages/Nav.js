import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        Navigate('/')
    }
    return (
        <>
            <div className='nav'>
                <ul>
                    <li><Link to='/' >Home</Link></li>
                    <li><Link to='/about' >About</Link></li>
                    <li><Link to='/add' >Add</Link></li>
                    <li><Link to='/contact' >Contact</Link></li>
                    <li><Link to='/productlist' >ProductList</Link></li>
                    {
                        auth ? <li>
                            <Link onClick={logout} to='/logout' >Logout ({JSON.parse(auth).email}) </Link>
                            {/* <Link onClick={logout} to='/signup'>Logout ({authObject ? authObject.username : 'User'})</Link> */}

                        </li>
                            :
                            <> <li><Link to='/signup' >Signup</Link></li>
                                <li> <Link to='/signin' >Login</Link></li>
                            </>

                    }

                </ul>

                {/* <div>
                {
                    auth ?
                        <>
                            <div className='nav'>
                                <ul>
                                    <li><Link to='/' >Home</Link></li>
                                    <li><Link to='/addproducts' >AddProducts</Link></li>
                                    <li><Link to='/about' >About</Link></li>
                                    <li><Link to='/contact' >Contact</Link></li>

                                    <li>
                                        <Link onClick={logout} to='/logout' >Logout ({JSON.parse(auth).email}) </Link>
                                        <Link onClick={logout} to='/signup'>Logout ({authObject ? authObject.username : 'User'})</Link>

                                    </li>

                                </ul>
                            </div>

                        </>

                        : <>
                            <div className='nav'>
                                <ul>
                                    <li><Link to='/signup' >Signup</Link> </li>
                                    <li><Link to='/signin' >Login</Link></li>
                                </ul>
                            </div>
                           
                        </>
                }


            </div> */}

            </div>

        </>
    )
}

export default Nav;

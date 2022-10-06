import React from 'react';
import github from '../../assets/img/octocat.svg';
// import cloud from '../../assets/img/6.png';
import Cart from '../Cart';
const Footer = () => {
  return (
    <footer className="p-4 w-100 bg-dark footer text-center">
      <div className="container">
        <h3 className="mb-2">
          {/* <img src={cloud} alt="White cloud and stars" className="p-1 mb-0 mt-1" height="25px"/> */}
         Dream Notes </h3>
        <h4>{new Date().getFullYear()} © Group 6 </h4>
        <div className="mt-2">
        <a href="https://github.com/jessica-calderon" alt="Jessica Calderon Github"><img src={github} className="mr-2" width="25px" alt="github octocat"/></a> 
        <a href="https://github.com/Christys122" alt="Christy Salazar Github"><img src={github} className="mr-2" width="25px" alt="github octocat"/></a> 
        <a href="https://github.com/Anitinky13" alt="Anastasiya Litvinova Github"><img src={github} className="mr-2" width="25px" alt="github octocat"/></a> 
        <a href="https://github.com/Wumbo-dot" alt="JT Gutierrez Github"><img src={github} className="" width="25px" alt="github octocat"/></a></div>
      </div>
      <div>
      <section className="container">
        <Cart />
      </section>
      </div>

    </footer>
  );
};

export default Footer;

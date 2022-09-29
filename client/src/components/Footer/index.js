import React from 'react';
// TODO: style and update with links
const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        &copy;{new Date().getFullYear()} by Group 6
      </div>
    </footer>
  );
};

export default Footer;

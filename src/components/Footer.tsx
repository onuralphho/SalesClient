import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="justify-self-end grid place-content-center backdrop-blur-sm border-t rounded-3xl border-[#ffffff5e] bg-[#8a8a8a10] h-[200px]">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
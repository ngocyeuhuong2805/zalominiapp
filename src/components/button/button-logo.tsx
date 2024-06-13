import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonLogo: React.FC<ContainerProps> = ({ children, onClick }) => {

  return (
    <div className="w-24 h-24 overflow-hidden object-cover backdrop-blur border border-transparent rounded-sm hover:opacity-70 round-full" onClick={onClick} style={{ objectFit: "contain" }}>
      {children}
    </div>
  );
};

export default ButtonLogo;


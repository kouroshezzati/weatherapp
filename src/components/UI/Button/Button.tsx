import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
}) => {  
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

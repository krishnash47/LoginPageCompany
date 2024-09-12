import { Button } from '@/components/ui/button';
import React from 'react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  loaderColor?: string | '#FFFFFF';
}

export const LoadingButton = ({ children, disabled, loaderColor, ...props }: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      style={{ position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className={`${disabled ? 'opacity-0' : 'opacity-100'} duration-100`}>{children}</div>
      {disabled && (
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="animate-spin">
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width={40}
              height={40}
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
            >
              <path
                fill={loaderColor}
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </Button>
  );
};

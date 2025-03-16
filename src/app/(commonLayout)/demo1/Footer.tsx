import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-8">
            <div className="  mx-auto px-4">
                <Typography variant="body1" className="text-center">
                    &copy; 2025 科技公司. 保留所有权利.
                </Typography>
            </div>
        </footer>
    );
};

export default Footer;
import { useState } from 'react';
import import { ToastContainer, toast } from 'react-toastify';
import { fetchPicture, needValues } from 'services/api';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};

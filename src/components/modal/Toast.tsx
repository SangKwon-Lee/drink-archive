'use client';

import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const Container = styled(ToastContainer)`
  .Toastify__toast-container {
    width: auto !important;
  }
  .Toastify__toast {
    width: auto;
    margin-left: auto;
    font-size: 16px;
  }
`;

export default function ToastProvider() {
  return (
    <>
      <Container autoClose={2000} hideProgressBar />
    </>
  );
}

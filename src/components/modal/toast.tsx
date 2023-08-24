'use client';

import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const Container = styled(ToastContainer)`
  .Toastify__toast {
    width: 200px;
    margin-left: auto;
    font-size: 16px;
  }
`;

export default function ToastProvider() {
  return (
    <>
      <Container />
    </>
  );
}

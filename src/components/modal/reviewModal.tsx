import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleReviewClick: (star: number) => void;
}

export default function ReviewModal({ open, setOpen, handleReviewClick }: Props) {
  const handleClose = () => setOpen(false);
  const [star, setStar] = useState(5);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ModalTitle>리뷰 등록</ModalTitle>
        <Rating
          value={star}
          precision={0.5}
          // readOnly
          onChange={(e, v) => setStar(Number(v))}
          size="large"
          sx={{ fontSize: '30px' }}
        />
        <BtnWrap>
          <BtnCancel onClick={handleClose}>취소</BtnCancel>
          <BtnOK onClick={() => handleReviewClick(star)}>등록</BtnOK>
        </BtnWrap>
      </Box>
    </Modal>
  );
}

const ModalTitle = styled.div`
  margin-bottom: 8px;
  ${({ theme }) => theme.textSize.S16W400};
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const BtnCancel = styled.button`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.gray.gray10};
  border-radius: 24px;
  transition: all 0.3s;
  color: ${({ theme }) => theme.gray.gray10};
  background-color: white;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.gray.gray10};
  }

  &:active {
    background-color: ${({ theme }) => theme.gray.gray10};
    opacity: 0.5;
  }
`;

const BtnOK = styled.button`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.palette.orange};
  border-radius: 24px;
  transition: all 0.3s;
  color: ${({ theme }) => theme.palette.orange};
  background-color: white;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.orange};
    opacity: 0.5;
  }
`;

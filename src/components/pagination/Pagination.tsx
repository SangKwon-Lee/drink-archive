import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const CustomPaginationStyle = styled(Pagination)`
  .MuiPaginationItem-root {
    color: ${({ theme }) => theme.gray.gray40};
    ${({ theme }) => theme.textSize.S14W400};
  }
  .Mui-selected {
    color: white;
    background-color: ${({ theme }) => theme.palette.orange};
    &:hover {
      background-color: ${({ theme }) => theme.palette.orange};
    }
    &:active {
      background-color: ${({ theme }) => theme.palette.orange};
    }
  }
`;

export default function CustomPagination({ total, page, setPage }: Props) {
  return (
    <PageWrap>
      <CustomPaginationStyle
        count={total}
        page={page}
        onChange={(__e, page) => setPage(() => page)}
      />
    </PageWrap>
  );
}

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
`;

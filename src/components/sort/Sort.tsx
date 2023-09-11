import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { Select, MenuItem } from '@mui/material';

interface SortProps {
  sortArr: {
    value: string;
    text: string;
  }[];
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  title?: string;
}
const CustomSelect = styled(Select)`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiSelect-select {
    display: flex;
    align-items: center;
    padding-left: 32px;
    color: ${({ theme }) => theme.gray.gray30};
  }

  .MuiOutlinedInput-input {
    padding: 0;
    padding-top: 1px;
    padding-left: 8px;
    font-size: 14px;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  ${({ theme }) => theme.textSize.S14W400};
`;

const SortTitle = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.textSize.S14W400};
  color: ${({ theme }) => theme.gray.gray40};
`;

export default function Sort({ sort, setSort, sortArr, title }: SortProps) {
  return (
    <SortTitle>
      {title && `${title} :`}
      <CustomSelect value={sort} onChange={(e: any) => setSort(e.target.value)} label="sort">
        {Array.isArray(sortArr) &&
          sortArr.length > 0 &&
          sortArr.map(({ text, value }) => (
            <CustomMenuItem key={value} value={value}>
              {text}
            </CustomMenuItem>
          ))}
      </CustomSelect>
    </SortTitle>
  );
}

'use client';
import { useState } from 'react';
import Images from '@utils/images';
import { Rating } from '@mui/material';
import Sort from '@components/sort/sort';
import { styled } from 'styled-components';
import { Main, MainWrap } from '@commonStyles/styles';
import MainBanner from '../banner/mainBanner';
import List from '@components/list/list';

const sortArr = [
  {
    value: 'new',
    text: '최신순'
  },
  {
    value: 'star_up',
    text: '벌점 높은 순'
  }
];

const typeArr = [
  {
    value: 'all',
    text: '전체'
  },
  {
    value: 'porter',
    text: '포터'
  }
];

export default function BeerPage() {
  const [sort, setSort] = useState('new');
  const [type, setType] = useState('all');

  return (
    <>
      <MainBanner title="BEER" src="/banner/beer_banner.jpg" />
      <Main>
        <MainWrap>
          <TopAside>
            <SearchWrap>
              <Search placeholder="검색" />
              <Images
                src="/icon/icon_beer.svg"
                width={16}
                height={16}
                style={{ cursor: 'pointer' }}
              />
            </SearchWrap>
          </TopAside>
          <ListNavWrap>
            <ListTitle>맥주</ListTitle>
            <SortWrap>
              <Sort title="정렬" setSort={setSort} sort={sort} sortArr={sortArr} />
              <Sort title="종류" setSort={setType} sort={type} sortArr={typeArr} />
            </SortWrap>
          </ListNavWrap>
          <List />
        </MainWrap>
      </Main>
    </>
  );
}

const TopAside = styled.aside`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  border-radius: 24px;
  background-color: white;
  max-width: 500px;
`;

const Search = styled.input`
  width: 85%;
  padding: 15px 0;
  border: none;
  border-radius: 24px;
  outline: none;
  background-color: transparent;
  ${({ theme }) => theme.textSize.S16W400};
`;

const ListNavWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const ListTitle = styled.div`
  ${({ theme }) => theme.textSize.S28W700};
  color: ${({ theme }) => theme.gray.gray20};
`;

const SortWrap = styled.div`
  display: flex;
  align-items: center;
`;

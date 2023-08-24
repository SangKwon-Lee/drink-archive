'use client';
import _ from 'lodash';
import { styled } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

// components
import Sort from '@components/sort/Sort';
import List from '@components/list/List';
import { Main, MainWrap } from '@styles/commonStyles';
import MainBanner from '@components/banner/MainBanner';
import CustomPagination from '@components/pagination/Pagination';

// utils & type
import useAPI from '@api/index';
import Images from '@utils/images';
import { BeerListType } from 'type';

const sortArr = [
  {
    value: 'createdAt:desc',
    text: '최신순'
  },
  {
    value: 'rating:desc',
    text: '벌점 높은 순'
  },
  {
    value: 'rating:asc',
    text: '벌점 낮은 순'
  }
];

const typeArr = [
  {
    value: '전체',
    text: '전체'
  },
  {
    value: '포터',
    text: '포터'
  },
  {
    value: '라거',
    text: '라거'
  },
  {
    value: 'IPA',
    text: 'IPA'
  }
];

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export default function BeerPage() {
  const apiServer = useAPI();

  const [loading, setLoading] = useState(true);

  //* 검색어
  const [search, setSearch] = useState('');

  // * 페이지네이션
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // * 정렬 순서
  const [sort, setSort] = useState('createdAt:desc');
  //  * 맥주 타입
  const [type, setType] = useState('전체');

  // * 맥주 리스트
  const [beerLest, setBeerList] = useState<BeerListType[]>([]);

  //* 검색 함수
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const debouncedSearch = useMemo(
    () =>
      _.debounce((query) => {
        setSearch(query);
        setPage(1);
      }, 200),
    [search]
  );

  // * 맥주 정보 불러오기
  const handleGetBeerList = async () => {
    setLoading(true);
    try {
      const { data, status } = await apiServer.get(
        `/beers?populate=thumbnail&sort=${sort}&filters[name][$contains]=${search}&filters[type][$contains]=${
          type === '전체' ? '' : type
        }`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        }
      );
      if (status === 200 && Array.isArray(data.data)) {
        setTotal(data.meta.pagination.pageCount);
        setBeerList(data.data);
        setPage(1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBeerList();
  }, [sort, search, type]);

  return (
    <>
      <MainBanner title="BEER" src="/banner/beer_banner.jpg" />
      <Main>
        <MainWrap>
          <TopAside>
            <SearchWrap>
              <Search placeholder="검색" onChange={onChange} />
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
          {!loading && <List list={beerLest} />}
          <CustomPagination page={page} total={total} setPage={setPage} />
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

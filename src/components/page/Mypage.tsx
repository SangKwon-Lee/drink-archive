'use client';
import { useEffect, useState } from 'react';
import { MyRatingBeerListAPI, UserInfoType, MyRatingBeerList } from 'type';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Main } from '@styles/commonStyles';
import Images from '@utils/images';
import { Rating } from '@mui/material';
import publicAPI from '@api/public';
import CustomPagination from '@components/pagination/Pagination';
import MyBeerReviewList from '@components/list/MyBeerReviewList';

interface Props {
  userInfo: UserInfoType;
}

export default function MypagePage({ userInfo }: Props) {
  const router = useRouter();
  const apiServer = publicAPI();
  const [page, setPage] = useState(1);
  const [list, setList] = useState<MyRatingBeerList[]>([]);
  const [total, setTotal] = useState(0);

  const handleGetMyReviewList = async () => {
    try {
      const { data } = await apiServer.get<MyRatingBeerListAPI>(
        `/my-rating-beer-list/${userInfo.id}/${page - 1}`
      );
      setTotal(data.totalPage);
      setList(data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userInfo.id === 0) {
      router.push('/login');
    }
  }, []);
  useEffect(() => {
    if (userInfo.id !== 0) {
      handleGetMyReviewList();
    }
  }, [page]);

  return (
    <Main>
      <MyCard>
        <MyNick>{userInfo.nickname}</MyNick>
        <MyDataCard>
          <MyDataTitleWrap>
            <MyDataTitle>내가 남긴 리뷰</MyDataTitle>
            <MyDataCount>
              <Images src={'/icon/icon_review.svg'} width={24} height={24} />
              {userInfo.count}개
            </MyDataCount>
          </MyDataTitleWrap>
          <Border />
          <MyDataTitleWrap>
            <MyDataTitle>리뷰 평균 점수</MyDataTitle>
            <MyDataCount>
              <Rating
                name="read-only"
                value={userInfo.reviewAvg}
                precision={0.5}
                readOnly
                size="large"
              />
              {userInfo.reviewAvg}점
            </MyDataCount>
          </MyDataTitleWrap>
        </MyDataCard>
        <MyDataTitle>리뷰 목록</MyDataTitle>
        <MyBeerReviewList list={list} />
        <CustomPagination total={total} page={page} setPage={setPage} />
      </MyCard>
    </Main>
  );
}

const MyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

const MyNick = styled.div`
  ${({ theme }) => theme.textSize.S28W700}
`;

const MyDataCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;
  background: white;
  box-shadow: ${({ theme }) => theme.shadow10};
`;

const MyDataTitleWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Border = styled.div`
  border-right: 1px solid ${({ theme }) => theme.gray.gray80};
`;

const MyDataTitle = styled.div`
  ${({ theme }) => theme.textSize.S18W700}
`;

const MyDataCount = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  ${({ theme }) => theme.textSize.S16W700}
`;

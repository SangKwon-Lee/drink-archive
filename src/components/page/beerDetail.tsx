'use client';
import dayjs from 'dayjs';
import { styled } from 'styled-components';

// components
import { Rating } from '@mui/material';
import List from '@components/list/list';
import { Main, MainWrap } from '@commonStyles/styles';

// utils
import Images from '@utils/images';

export default function BeerDetailPage() {
  return (
    <Main>
      <MainWrap>
        <ProductWrap>
          <ProductImg>
            <Images src="/test.jpeg" style={{ objectFit: 'cover' }} />
          </ProductImg>
          <ProductContents>
            <ProductComp>제조사 / 맥파이</ProductComp>
            <ProductName>맥파이 첫 차</ProductName>
            <ProductComp>포터</ProductComp>
            <RatingWrap>
              <Rating name="read-only" value={4.7} precision={0.5} readOnly size="large" />
              <RatingNum>4.7</RatingNum>
            </RatingWrap>
            <RatingText>472명이 별점을 남겼어요</RatingText>
            <ProductDesc>
              맥파이 첫 차에 대한 간단한 설명입니다.맥파이 첫 차에 대한 간단한 설명입니다.맥파이 첫
              차에 대한 간단한 설명입니다.맥파이 첫 차에 대한 간단한 설명입니다.맥파이 첫 차에 대한
              간단한 설명입니다.
            </ProductDesc>
            <ReviewBtn>별점 남기기</ReviewBtn>
          </ProductContents>
        </ProductWrap>
        <RatingList>
          <RatingSub>최근 10개의 별점만 표시됩니다</RatingSub>
          {new Array(10).fill(0).map((__, index) => (
            <RatingItem key={index}>
              <Images src="/test.jpeg" width={50} height={50} circle />
              <RatingStarWrap>
                <RatingNameWrap>
                  <RatingName>Kogong</RatingName>
                  <RatingDate>{dayjs().format('YYYY-MM-DD')}</RatingDate>
                </RatingNameWrap>
                <Rating name="read-only" value={4.7} precision={0.5} readOnly size="large" />
              </RatingStarWrap>
            </RatingItem>
          ))}
        </RatingList>
        <List />
      </MainWrap>
    </Main>
  );
}

const ProductWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  gap: 48px;
  margin-bottom: 40px;

  @media ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const ProductImg = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  height: 0;
  padding-bottom: 46.7%;

  @media ${({ theme }) => theme.media.mobile} {
    padding-bottom: 60%;
  }
`;

const ProductContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductComp = styled.div`
  ${({ theme }) => theme.textSize.S14W400};
  color: ${({ theme }) => theme.gray.gray40};
`;

const ProductName = styled.h2`
  margin: 0;
  ${({ theme }) => theme.textSize.S32W700};
  color: ${({ theme }) => theme.gray.gray20};
`;

const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const RatingNum = styled.div`
  margin-left: 4px;
  ${({ theme }) => theme.textSize.S16W400};
`;

const RatingText = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.gray.gray40};
  ${({ theme }) => theme.textSize.S14W400};
`;

const ProductDesc = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  ${({ theme }) => theme.textSize.S16W400};
`;

const ReviewBtn = styled.button`
  margin-top: auto;
  padding: 16px 36px;
  border: 1px solid ${({ theme }) => theme.palette.orange};
  border-radius: 24px;
  transition: all 0.3s;
  color: ${({ theme }) => theme.palette.orange};
  background-color: white;
  ${({ theme }) => theme.textSize.S16W700};

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.orange};
    opacity: 0.5;
  }
`;

const RatingSub = styled.div`
  color: ${({ theme }) => theme.gray.gray30};
  ${({ theme }) => theme.textSize.S14W400};
`;

const RatingList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid ${({ theme }) => theme.gray.gray80};
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray80};
  gap: 24px;
`;

const RatingItem = styled.li`
  display: flex;
  gap: 16px;
`;

const RatingName = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
`;

const RatingDate = styled.div`
  padding-top: 2px;
  color: ${({ theme }) => theme.gray.gray40};
  ${({ theme }) => theme.textSize.S14W400};
`;

const RatingNameWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RatingStarWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

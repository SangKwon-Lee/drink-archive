'use client';
import dayjs from 'dayjs';
import { styled } from 'styled-components';

// components
import { Rating } from '@mui/material';
import List from '@components/list/list';
import { Main, MainWrap } from '@styles/styles';

// utils
import Images from '@utils/images';
import { BeerDetailType } from 'type';
import { useEffect, useState } from 'react';
import useAPI from '@api/index';
import { toFixedNumber } from '@utils/toFixedNumber';

interface Props {
  data: BeerDetailType;
}

const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

export default function BeerDetailPage({ data }: Props) {
  const apiServer = useAPI();
  const [id, setId] = useState(0);
  const handleGetMe = async () => {
    try {
      const { data } = await apiServer.get(`/users/me`);
      console.log(data);
      setId(data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleReviewClick = async () => {
    if (id === 0) {
      return alert('로그인을 해주세요 !');
    }
    try {
      await apiServer.post(`/beer-rating-give`, {
        beers: data.id,
        user: id,
        rating: 5
      });
      alert('리뷰가 등록 됐습니다.');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <Main>
      <MainWrap>
        <ProductWrap>
          <ProductImg>
            <Images
              src={`${IMG_HOST}${data.attributes.thumbnail.data.attributes.url}`}
              style={{ objectFit: 'cover' }}
            />
          </ProductImg>
          <ProductContents>
            <ProductComp>제조사 / {data.attributes?.company}</ProductComp>
            <ProductName>{data.attributes?.name}</ProductName>
            <ProductComp>{data.attributes?.type}</ProductComp>
            <RatingWrap>
              <Rating
                name="read-only"
                value={toFixedNumber(data.attributes?.rating)}
                precision={0.5}
                readOnly
                size="large"
              />
              <RatingNum>{toFixedNumber(data.attributes?.rating)}</RatingNum>
            </RatingWrap>
            <RatingText>{data.attributes?.people}명이 별점을 남겼어요</RatingText>
            <ProductDesc>{data.attributes?.description}</ProductDesc>
            <ReviewBtn onClick={handleReviewClick}>{'별점 남기기'}</ReviewBtn>
          </ProductContents>
        </ProductWrap>
        <RatingList>
          <RatingSub>최근 10개의 별점만 표시됩니다</RatingSub>
          {Array.isArray(data.attributes?.beer_ratings?.data) &&
          data.attributes.beer_ratings?.data.length > 0 ? (
            data.attributes.beer_ratings?.data.map((rating, index) => (
              <RatingItem key={index}>
                <Images
                  src={`${IMG_HOST}${rating.attributes.user.data?.attributes.profile?.data?.attributes?.url}`}
                  width={50}
                  height={50}
                  circle
                />
                <RatingStarWrap>
                  <RatingNameWrap>
                    <RatingName>{rating.attributes.user.data?.attributes.nickname}</RatingName>
                    <RatingDate>
                      {dayjs(rating.attributes.updatedAt).format('YYYY-MM-DD')}
                    </RatingDate>
                  </RatingNameWrap>
                  <Rating
                    name="read-only"
                    value={rating.attributes.rating}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                </RatingStarWrap>
              </RatingItem>
            ))
          ) : (
            <RatingDate>아직 리뷰가 없습니다.</RatingDate>
          )}
        </RatingList>
        {/* <List /> */}
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
  gap: 8px;
`;

const RatingStarWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

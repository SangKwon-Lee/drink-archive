'use client';
import Images from '@utils/images';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

// components
import { Rating } from '@mui/material';
import RecoList from '@components/list/RecoList';
import ReviewModal from '@components/modal/ReviewModal';
import RatingReviewList from '@components/list/RatingReviewList';

// utils
import useAPI from '@api/index';
import { toFixedNumber } from '@utils/toFixedNumber';
import { Main, MainWrap } from '@styles/commonStyles';
import { BeerDetailType, BeerRecomendType, BeerReviewRatingListType } from 'type';

interface Props {
  data: BeerDetailType;
  userId: number;
}

const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

export default function BeerDetailPage({ data, userId }: Props) {
  const apiServer = useAPI();

  // * 리뷰 모달
  const [open, setOpen] = useState(false);

  //* 리뷰 리스트
  const [ratingList, setRatingList] = useState<BeerReviewRatingListType[]>([]);

  // * 하단 추천 리스트
  const [recomendList, setRecomendList] = useState<BeerRecomendType[]>([]);

  //* 리뷰 클릭 전 Login 체크
  const handleLoginCheck = () => {
    if (userId === 0) {
      toast.error('로그인을 해주세요.', {
        toastId: 0,
        autoClose: 2000
      });
    } else {
      setOpen(true);
    }
  };

  // * 리뷰 클릭
  const handleReviewClick = async (star: number) => {
    try {
      await apiServer.post(`/beer-rating-give`, {
        beers: data.id,
        user: userId,
        rating: star
      });
      toast.success('리뷰가 등록 됐습니다.', {
        toastId: 0,
        autoClose: 2000
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // * 추천 게시글 리스트
  const handleGetRecomendList = useCallback(async () => {
    try {
      const { data, status } = await apiServer.get<BeerRecomendType[]>(`/beer-reco`);
      if (status === 200 && Array.isArray(data)) {
        setRecomendList(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  // * 리뷰 불러오기
  const handleGetReview = useCallback(async () => {
    try {
      const { data, status } = await apiServer.get(
        `/beer-ratings?populate[user][populate][0]=profile&pagination[pageSize]=10&sort=createdAt:desc`
      );
      if (status === 200 && Array.isArray(data.data)) {
        setRatingList(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    handleGetReview();
    handleGetRecomendList();
  }, [handleGetRecomendList, handleGetReview]);

  return (
    <>
      <Main>
        <MainWrap>
          <ProductWrap>
            <ProductImg>
              <Images
                src={`${IMG_HOST}${data.attributes?.thumbnail.data.attributes.url}`}
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
              <ReviewBtn onClick={handleLoginCheck}>{'별점 남기기'}</ReviewBtn>
            </ProductContents>
          </ProductWrap>
          <RatingReviewList ratingList={ratingList} />
          <RecoTitle>추천 맥주</RecoTitle>
          <RecoList list={recomendList} />
        </MainWrap>
        {open && (
          <ReviewModal open={open} setOpen={setOpen} handleReviewClick={handleReviewClick} />
        )}
      </Main>
    </>
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

const RecoTitle = styled.h3`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.gray.gray20};
  ${({ theme }) => theme.textSize.S18W700};
`;

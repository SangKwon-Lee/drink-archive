'use client';
import styled from 'styled-components';
import { Main, MainWrap } from '@styles/styles';

// components
import MainBanner from '@components/banner/mainBanner';

// utils
import Images from '@utils/images';
import useAPI from '@api/index';
import { useEffect, useState } from 'react';
import { BeerListType } from 'type';
import { Rating } from '@mui/material';
import { toFixedNumber } from '@utils/toFixedNumber';

const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
export default function HomePage() {
  const apiServer = useAPI();

  const [beerList, setBeerList] = useState<BeerListType[]>([]);
  const [beerRatingList, setBeerRatingList] = useState<BeerListType[]>([]);
  const [beerReviewList, setBeerReviewList] = useState<BeerListType[]>([]);

  // * 맥주 정보 불러오기
  const handleGetBeerList = async () => {
    try {
      const { data: created } = await apiServer.get(
        `/beers?populate=thumbnail&sort=createAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        }
      );
      const { data: rating } = await apiServer.get(`/beers?populate=thumbnail&sort=rating:desc`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      const { data: review } = await apiServer.get(`/beers?populate=thumbnail&sort=people:desc`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      if (Array.isArray(created.data)) {
        setBeerList(created.data);
        setBeerRatingList(rating.data);
        setBeerReviewList(review.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetBeerList();
  }, []);

  return (
    <>
      <MainBanner title="Drink Archive" src="/banner/home_banner.jpg" />
      <Main>
        <MainWrap>
          <HomeTitle>새로운 맥주</HomeTitle>
          <HomeList>
            {beerList.map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images
                    src={`${IMG_HOST}${data.attributes.thumbnail.data.attributes.url}`}
                    style={{ objectFit: 'cover' }}
                  />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>{data.attributes.name}</ListName>
                    <ListType>{data.attributes.type}</ListType>
                  </ListNameWrap>
                </ListContents>
              </HomeListItem>
            ))}
          </HomeList>
          <HomeTitle>별점이 높은 맥주</HomeTitle>
          <HomeList>
            {beerRatingList.map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images
                    src={`${IMG_HOST}${data.attributes.thumbnail.data.attributes.url}`}
                    style={{ objectFit: 'cover' }}
                  />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>{data.attributes.name}</ListName>
                    <ListType>{data.attributes.type}</ListType>
                  </ListNameWrap>
                  <RatingWrap>
                    <Rating
                      name="read-only"
                      value={toFixedNumber(data.attributes?.rating)}
                      precision={0.5}
                      readOnly
                    />
                    <RatingNum>{toFixedNumber(data.attributes?.rating)}</RatingNum>
                  </RatingWrap>
                  <ListType>{data.attributes.people}명이 별점을 남겼어요</ListType>
                </ListContents>
              </HomeListItem>
            ))}
          </HomeList>
          <HomeTitle>리뷰가 많은 맥주</HomeTitle>
          <HomeList>
            {beerReviewList.map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images
                    src={`${IMG_HOST}${data.attributes.thumbnail.data.attributes.url}`}
                    style={{ objectFit: 'cover' }}
                  />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>{data.attributes.name}</ListName>
                    <ListType>{data.attributes.type}</ListType>
                  </ListNameWrap>
                  <RatingWrap>
                    <Rating
                      name="read-only"
                      value={toFixedNumber(data.attributes?.rating)}
                      precision={0.5}
                      readOnly
                    />
                    <RatingNum>{toFixedNumber(data.attributes?.rating)}</RatingNum>
                  </RatingWrap>
                  <ListType>{data.attributes.people}명이 별점을 남겼어요</ListType>
                </ListContents>
              </HomeListItem>
            ))}
          </HomeList>
        </MainWrap>
      </Main>
    </>
  );
}

const HomeTitle = styled.h3`
  ${({ theme }) => theme.textSize.S20W700};
`;

const HomeList = styled.ul`
  display: flex;
  gap: 16px;
  overflow-x: scroll;

  @media ${({ theme }) => theme.media.mobile} {
    margin-right: -24px;
  }
`;

const HomeListItem = styled.li`
  min-width: 250px;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  img:hover {
    transform: scale(1.04);
    transition: transform 0.5s ease-out;
  }

  img:not(:hover) {
    transition: 0.5s ease-out;
  }
`;

const ListImg = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 250px;
  background-color: white;
`;

const ListContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 2px;
`;

const ListName = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
  color: ${({ theme }) => theme.gray.gray20};
`;
const ListType = styled.div`
  ${({ theme }) => theme.textSize.S14W400};
  color: ${({ theme }) => theme.gray.gray40};
`;
const ListNameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RatingWrap = styled.div`
  display: flex;
  align-items: center;
`;

const RatingNum = styled.div`
  margin-left: 4px;
  color: ${({ theme }) => theme.gray.gray10};
  ${({ theme }) => theme.textSize.S16W400};
`;

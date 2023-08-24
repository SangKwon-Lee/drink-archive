'use client';
import { useEffect, useState } from 'react';

// components
import MainBanner from '@components/banner/MainBanner';
import RowScrollList from '@components/list/RowScrollList';

// utils
import useAPI from '@api/index';
import { BeerListType } from 'type';
import { Main, MainWrap } from '@styles/commonStyles';

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
          <RowScrollList title={'새로운 맥주'} list={beerList} isRating={false} />
          <RowScrollList title={'별점이 높은 맥주'} list={beerRatingList} isRating />
          <RowScrollList title={'리뷰가 많은 맥주'} list={beerReviewList} isRating />
        </MainWrap>
      </Main>
    </>
  );
}

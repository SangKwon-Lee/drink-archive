import dayjs from 'dayjs';
import Images from '@utils/images';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { BeerReviewRatingListType } from 'type';

interface Props {
  ratingList: BeerReviewRatingListType[];
}
const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

export default function RatingReviewList({ ratingList }: Props) {
  return (
    <RatingList>
      <RatingSub>최근 10개의 별점만 표시됩니다</RatingSub>
      {Array.isArray(ratingList) && ratingList.length > 0 ? (
        ratingList.map((rating, index) => (
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
                  {dayjs(rating.attributes.updatedAt).format('YYYY-MM-DD HH:mm')}
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
  );
}

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

const RecoTitle = styled.h3`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.gray.gray20};
  ${({ theme }) => theme.textSize.S18W700};
`;

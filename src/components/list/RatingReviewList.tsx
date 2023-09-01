import styled from 'styled-components';
import { BeerReviewRatingListType } from 'type';
import Review from '@components/card/Review';

interface Props {
  ratingList: BeerReviewRatingListType[];
}

export default function RatingReviewList({ ratingList }: Props) {
  return (
    <RatingList>
      <RatingSub>최근 10개의 별점만 표시됩니다</RatingSub>
      {Array.isArray(ratingList) && ratingList.length > 0 ? (
        ratingList.map((rating, index) => (
          <RatingItem key={index}>
            <Review
              rating={rating.attributes.rating}
              date={rating.attributes.updatedAt}
              nickname={rating.attributes.user.data?.attributes.nickname}
              profile={rating.attributes.user.data?.attributes.profile?.data?.attributes?.url}
            />
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

const RatingItem = styled.li``;

const RatingDate = styled.div`
  padding-top: 2px;
  color: ${({ theme }) => theme.gray.gray40};
  ${({ theme }) => theme.textSize.S14W400};
`;

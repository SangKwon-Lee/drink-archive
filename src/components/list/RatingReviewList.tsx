import styled from 'styled-components';
import { BeerReviewRatingListType } from 'type';
import Review from '@components/card/Review';

interface Props {
  ratingList: BeerReviewRatingListType[];
}

export default function RatingReviewList({ ratingList }: Props) {
  return (
    <>
      <RatingSub>최근 10개의 별점만 표시됩니다</RatingSub>
      <RatingList>
        {Array.isArray(ratingList) && ratingList.length > 0 ? (
          ratingList.map((rating, index) => (
            <RatingItem key={index}>
              <Review
                rating={rating.attributes.rating}
                date={rating.attributes.updatedAt}
                nickname={rating.attributes.user.data?.attributes.nickname}
              />
            </RatingItem>
          ))
        ) : (
          <RatingDate>아직 리뷰가 없습니다.</RatingDate>
        )}
      </RatingList>
    </>
  );
}

const RatingSub = styled.div`
  color: ${({ theme }) => theme.gray.gray30};
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.gray.gray80};
  ${({ theme }) => theme.textSize.S14W400};
`;

const RatingList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray80};
  gap: 24px;
`;

const RatingItem = styled.li`
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray90};

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

const RatingDate = styled.li`
  padding-top: 2px;
  color: ${({ theme }) => theme.gray.gray40};
  ${({ theme }) => theme.textSize.S14W400};
`;

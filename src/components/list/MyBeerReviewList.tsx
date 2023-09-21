import { MyRatingBeerList } from 'type';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ChangeUrl } from '@utils/urlRegex';
import styled from 'styled-components';
import { Rating } from '@mui/material';
interface Props {
  list: MyRatingBeerList[];
}

export default function MyBeerReviewList({ list }: Props) {
  return (
    <ReviewList>
      {Array.isArray(list) &&
        list.length > 0 &&
        list.map((data) => (
          <CustomLink
            href={`/beer/${ChangeUrl(data.beers[0].name)}-${data.beers[0].id}`}
            key={data.id}
          >
            <ReviewItem>
              <ReviewLeftWrap>
                <ReviewTitle>{data.beers[0].name}</ReviewTitle>
                <ReviewType>
                  {data.beers[0].type} / {data.beers[0].company}
                </ReviewType>
              </ReviewLeftWrap>
              <ReviewRightWrap>
                <Rating
                  name="read-only"
                  value={data.rating}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <ReviewType>{dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')}</ReviewType>
              </ReviewRightWrap>
            </ReviewItem>
          </CustomLink>
        ))}
    </ReviewList>
  );
}
const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 8px;
`;

const ReviewItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow10};
  cursor: pointer;
`;

const ReviewLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
const ReviewTitle = styled.div`
  ${({ theme }) => theme.textSize.S16W700}
`;
const ReviewType = styled.span`
  color: ${({ theme }) => theme.gray.gray50};
  ${({ theme }) => theme.textSize.S14W400};
`;

const CustomLink = styled(Link)`
  &:active {
    opacity: 0.7;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow20};
  }
`;

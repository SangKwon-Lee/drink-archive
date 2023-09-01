import dayjs from 'dayjs';
import Images from '@utils/images';
import { Rating } from '@mui/material';
import styled from 'styled-components';
const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

interface Props {
  profile: string;
  nickname: string;
  date: string;
  rating: number;
}

export default function Review({ profile, nickname, date, rating }: Props) {
  return (
    <RatingItem>
      <Images src={`${IMG_HOST}${profile}`} width={50} height={50} circle />
      <RatingStarWrap>
        <RatingNameWrap>
          <RatingName>{nickname}</RatingName>
          <RatingDate>{dayjs(date).format('YYYY-MM-DD HH:mm')}</RatingDate>
        </RatingNameWrap>
        <Rating name="read-only" value={rating} precision={0.5} readOnly size="large" />
      </RatingStarWrap>
    </RatingItem>
  );
}

const RatingItem = styled.div`
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

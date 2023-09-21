import Link from 'next/link';
import Images from '@utils/images';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { BeerRecomendType } from 'type';
import { toFixedNumber } from '@utils/toFixedNumber';
import { ChangeUrl } from '@utils/urlRegex';

interface Props {
  list: BeerRecomendType[];
}

const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

export default function RecoList({ list }: Props) {
  return (
    <ListWrap>
      {Array.isArray(list) &&
        list.length > 0 &&
        list.map((data) => (
          <Link href={`/beer/${ChangeUrl(data.name)}-${data.id}`} key={data.id}>
            <ListItem>
              <ListImg style={{ position: 'relative', width: '100%', height: '300px' }}>
                <Images style={{ objectFit: 'cover' }} src={`${IMG_HOST}${data.thumbnail.url}`} />
              </ListImg>
              <ListContents>
                <ListNameWrap>
                  <ListName>{data.name}</ListName>
                  <ListType>{data.type}</ListType>
                </ListNameWrap>
                <RatingWrap>
                  <Rating
                    name="read-only"
                    value={toFixedNumber(data?.rating)}
                    precision={0.5}
                    readOnly
                  />
                  <RatingNum>{toFixedNumber(data?.rating)}</RatingNum>
                </RatingWrap>
                <ListType>{data.people ? data.people : 0}명이 별점을 남겼어요</ListType>
              </ListContents>
            </ListItem>
          </Link>
        ))}
    </ListWrap>
  );
}

const ListWrap = styled.ul`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  gap: 16px;

  @media (width <= 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (width <= 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ListItem = styled.li`
  transition: all 0.5s;
  background-color: white;
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
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: white;
`;

const ListContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 4px;
`;

const ListNameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListName = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
  color: ${({ theme }) => theme.gray.gray20};
`;

const ListType = styled.div`
  ${({ theme }) => theme.textSize.S14W400};
  color: ${({ theme }) => theme.gray.gray40};
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

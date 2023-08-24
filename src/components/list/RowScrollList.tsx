import { Rating } from '@mui/material';
import Images from '@utils/images';
import { toFixedNumber } from '@utils/toFixedNumber';
import styled from 'styled-components';
import { BeerListType } from 'type';

interface Props {
  title: string;
  isRating?: boolean;
  list: BeerListType[];
}

const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

export default function RowScrollList({ list, title, isRating }: Props) {
  return (
    <>
      {title && <HomeTitle>{title}</HomeTitle>}
      <HomeList>
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((data, index) => (
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
                {isRating && (
                  <>
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
                  </>
                )}
              </ListContents>
            </HomeListItem>
          ))}
      </HomeList>
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

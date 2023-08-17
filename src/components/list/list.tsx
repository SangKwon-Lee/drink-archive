import Images from '@utils/images';
import styled from 'styled-components';
import { Rating } from '@mui/material';

export default function List() {
  return (
    <ListWrap>
      {new Array(12).fill(0).map((data, index) => (
        <ListItem key={index}>
          <ListImg style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Images src="/test.jpeg" style={{ objectFit: 'cover' }} />
          </ListImg>
          <ListContents>
            <ListNameWrap>
              <ListName>맥파이 첫차</ListName>
              <ListType>포터</ListType>
            </ListNameWrap>
            <RatingWrap>
              <Rating name="read-only" value={4.7} precision={0.5} readOnly />
              <RatingNum>4.7</RatingNum>
            </RatingWrap>
            <ListType>472명이 별점을 남겼어요</ListType>
          </ListContents>
        </ListItem>
      ))}
    </ListWrap>
  );
}

const ListWrap = styled.ul`
  display: inline-grid;
  margin-top: 24px;
  gap: 16px;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);

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
  background-color: white;
  cursor: pointer;
  transition: all 0.5s;

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
  height: 300px;
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
  ${({ theme }) => theme.textSize.S16W400};
`;

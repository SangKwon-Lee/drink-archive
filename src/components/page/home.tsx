'use client';
import styled from 'styled-components';
import { Main, MainWrap } from '@styles/styles';

// components
import MainBanner from '@components/banner/mainBanner';

// utils
import Images from '@utils/images';

export default function HomePage() {
  return (
    <>
      <MainBanner title="Drink Archive" src="/banner/home_banner.jpg" />
      <Main>
        <MainWrap>
          <HomeTitle>새로운 맥주</HomeTitle>
          <HomeList>
            {new Array(10).fill(0).map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images src="/test.jpeg" style={{ objectFit: 'cover' }} />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>맥파이 첫차</ListName>
                    <ListType>포터</ListType>
                  </ListNameWrap>
                </ListContents>
              </HomeListItem>
            ))}
          </HomeList>
          <HomeTitle>별점이 높은 맥주</HomeTitle>
          <HomeList>
            {new Array(10).fill(0).map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images src="/test.jpeg" style={{ objectFit: 'cover' }} />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>맥파이 첫차</ListName>
                    <ListType>포터</ListType>
                  </ListNameWrap>
                </ListContents>
              </HomeListItem>
            ))}
          </HomeList>
          <HomeTitle>리뷰가 많은 맥주</HomeTitle>
          <HomeList>
            {new Array(10).fill(0).map((data, index) => (
              <HomeListItem key={index}>
                <ListImg>
                  <Images src="/test.jpeg" style={{ objectFit: 'cover' }} />
                </ListImg>
                <ListContents>
                  <ListNameWrap>
                    <ListName>맥파이 첫차</ListName>
                    <ListType>포터</ListType>
                  </ListNameWrap>
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
  gap: 4px;
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

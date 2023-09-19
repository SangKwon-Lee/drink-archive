'use client';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterDiv>
      <Wrapper>Copyright © 2023 Powered by Kogong</Wrapper>
    </FooterDiv>
  );
}

const FooterDiv = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.gray.gray80};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.gray.gray90};
  background-color: ${({ theme }) => theme.gray.gray90};
  ${({ theme }) => theme.textSize.S14W400};
`;

'use client';
import { styled } from 'styled-components';

// ts-prune-ignore-next
export default function NotFound() {
  return (
    <Main>
      <Text>404 Not Found</Text>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 36px;
  min-height: calc(100vh - 120px);
`;

const Text = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  border-radius: 4px;
  margin-top: 32px;
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S20W700};
`;

'use client';
import { styled } from 'styled-components';
import { Main } from '@commonStyles/styles';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LoginSignupPage() {
  const pathname = usePathname();
  const BtnText = pathname === '/login' ? 'LOGIN' : 'SIGNUP';

  return (
    <Main>
      <Logo>Drink Acrhive</Logo>
      <LoginCard>
        <TextInput placeholder="ID" />
        <TextInput placeholder="PASSWORD" type="password" />
        {BtnText === 'SIGNUP' && (
          <>
            <TextInput placeholder="PASSWORD CONFIRM" type="password" />
            <TextInput placeholder="NICKNAME" type="password" />
          </>
        )}
        <BtnWrap>
          <Btn>{BtnText}</Btn>
        </BtnWrap>
      </LoginCard>
      {BtnText === 'LOGIN' && (
        <Link href={'/signup'} title="signup">
          <GoSignup>회원 가입 하러 가기</GoSignup>
        </Link>
      )}
    </Main>
  );
}

const Logo = styled.div`
  ${({ theme }) => theme.textSize.S32W700};
  margin-bottom: 24px;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 24px;
  border-radius: 36px;
  background-color: white;
  max-width: 400px;
  gap: 24px;
  box-shadow: ${({ theme }) => `2px 3px 10px ${theme.shadow}`};
`;

const BtnWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const TextInput = styled.input`
  padding: 16px;
  ${({ theme }) => theme.textSize.S14W400};
  border: none;
  border-radius: 24px;
  color: ${({ theme }) => theme.gray.gray10};
  background-color: ${({ theme }) => theme.gray.gray90};
`;

const Btn = styled.button`
  flex: 1;
  padding: 16px 36px;
  ${({ theme }) => theme.textSize.S16W700};
  border: 1px solid ${({ theme }) => theme.palette.orange};
  border-radius: 24px;
  transition: all 0.3s;
  color: ${({ theme }) => theme.palette.orange};
  background-color: white;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.orange};
    opacity: 0.5;
  }
`;

const GoSignup = styled.div`
  cursor: pointer;
  margin-top: 16px;
  ${({ theme }) => theme.textSize.S14W400};
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray70};
  color: ${({ theme }) => theme.gray.gray50};

  &:active {
    opacity: 0.5;
  }
`;

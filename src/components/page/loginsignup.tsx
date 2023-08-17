'use client';
import * as yup from 'yup';
import Link from 'next/link';
import useAPI from '@api/index';
import { useState } from 'react';
import { SignupShemeType } from 'type';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { Main } from '@commonStyles/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';

export default function LoginSignupPage() {
  const router = useRouter();
  const apiServer = useAPI();
  // * LOGIN, SIGNUP 페이지 별로 함수, UI 분기 처리
  const pathname = usePathname();
  const BtnText = pathname === '/login' ? 'LOGIN' : 'SIGNUP';

  //* 이미 존재하는 아이디, 닉네임 에러 메시지
  const [errorMsg, setErrorMsg] = useState('');

  // * yup schema 처리
  const schema = yup.object().shape({
    username: yup.string().required('ID는 필수입니다.'),
    nickname: yup.lazy(() => {
      if (BtnText === 'SIGNUP') {
        return yup.string().required('닉네임은 필수입니다.');
      } else {
        return yup.string().notRequired();
      }
    }),
    password: yup
      .string()
      .min(6, '비밀번호는 6자리 이상이어야 합니다.')
      .max(15, '비밀번호는 15자리 이하여야 합니다.')
      .required('비밀번호는 6~15자리 사이여야 합니다.'),
    confirmPassword: yup.lazy(() => {
      if (BtnText === 'SIGNUP') {
        return yup.string().oneOf([yup.ref('password'), ''], '비밀번호가 서로 다릅니다.');
      } else {
        return yup.string().notRequired();
      }
    })
  });

  // * 회원가입, 로그인 함수
  const handlePostSignupLogin = async (data: SignupShemeType) => {
    try {
      if (BtnText === 'LOGIN') {
        const { data: result } = await apiServer.post(`/auth/local`, {
          identifier: data.username.trim(),
          password: data.password.trim()
        });
        if (result.jwt) {
          localStorage.setItem('token', result.jwt);
          router.push('/');
        }
      } else {
        await apiServer.post(`/users`, {
          ...data,
          email: `${data.nickname}@drink.com`,
          role: 1
        });
        alert('회원가입을 축하합니다');
        router.push('/login');
      }
    } catch (e: AxiosError | unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error.message === 'Email already taken') {
          setErrorMsg('이미 존재하는 닉네임입니다');
        }
        if (e.response?.data.error.message === 'This attribute must be unique')
          setErrorMsg('이미 존재하는 아이디입니다');
      }
    }
  };

  // * react-hook-from
  const {
    register,
    handleSubmit,
    formState: { errors } // 버전 6라면 errors라고 작성함.
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Main>
      <Logo>Drink Acrhive</Logo>
      <LoginCard onSubmit={handleSubmit(handlePostSignupLogin)}>
        <TextInput placeholder="ID" {...register('username')} />
        {errorMsg.includes('아이디') && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {errors?.username && <ErrorMsg>{errors?.username.message}</ErrorMsg>}
        <TextInput
          placeholder="PASSWORD"
          type="password"
          autoComplete="off"
          {...register('password')}
        />
        {errors?.password && <ErrorMsg>{errors?.password?.message}</ErrorMsg>}
        {BtnText === 'SIGNUP' && (
          <>
            <TextInput
              placeholder="PASSWORD CONFIRM"
              type="password"
              autoComplete="off"
              {...register('confirmPassword')}
            />
            {errors?.confirmPassword && <ErrorMsg>{errors?.confirmPassword?.message}</ErrorMsg>}
            <TextInput placeholder="NICKNAME" {...register('nickname')} />
            {errors?.nickname && <ErrorMsg>{errors?.nickname?.message}</ErrorMsg>}
          </>
        )}
        {errorMsg.includes('닉네임') && <ErrorMsg>{errorMsg}</ErrorMsg>}
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

const LoginCard = styled.form`
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

const ErrorMsg = styled.div`
  margin-top: -16px;
  margin-bottom: -16px;
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.orange};
  ${({ theme }) => theme.textSize.S12W400};
`;

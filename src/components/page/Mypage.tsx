'use client';
import { useEffect } from 'react';
import { UserInfoType } from 'type';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { Main } from '@styles/commonStyles';

interface Props {
  userInfo: UserInfoType;
}

export default function MypagePage({ userInfo }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (userInfo.id === 0) {
      router.push('/login');
    }
  }, []);

  return (
    <Main>
      <MyCard>
        {/* <MyNick>{userInfo}</MyNick> */}
        <MyNick>Kogong</MyNick>
      </MyCard>
    </Main>
  );
}

const MyCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyNick = styled.div`
  ${({ theme }) => theme.textSize.S28W700}
`;

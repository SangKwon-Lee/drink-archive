'use client';
import { Main } from '@styles/commonStyles';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { UserInfoType } from 'type';

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

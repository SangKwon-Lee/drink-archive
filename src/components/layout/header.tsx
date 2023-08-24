'use client';
import Link from 'next/link';
import Images from '@utils/images';
import { styled } from 'styled-components';
import { deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuDrawer from '@components/drawer/menuDrawer';

const NavArr = [
  {
    href: '/beer',
    text: 'Beer'
  },
  {
    href: '/whiskey',
    text: 'Whiskey'
  },
  {
    href: '/wine',
    text: 'Wine'
  }
];

const LoginArr = [
  {
    href: '/login',
    text: 'Login'
  },
  {
    href: '/signup',
    text: 'Signup'
  }
];

interface Props {
  isLogin: boolean;
}

export default function Header({ isLogin }: Props) {
  const pathname = usePathname();
  // * 메뉴 열기
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    deleteCookie('_ga_t');
    window.location.reload();
  };

  useEffect(() => {
    if (!isLogin) {
      deleteCookie('_ga_t');
    }
  }, []);

  return (
    <HeaderLayout $path={pathname}>
      <HeaderWrap>
        <LogoWrap>
          <Link href={'/'} title="home">
            <Logo>Drink Archive</Logo>
          </Link>
          <NavWrap>
            {NavArr.map(({ href, text }, index) => (
              <NavItemWrap key={href}>
                <Link href={href} title={text}>
                  <NavItem $isPath={pathname.includes(text.toLowerCase())}>{text}</NavItem>
                </Link>
                {index !== NavArr.length - 1 && <NavBorder />}
              </NavItemWrap>
            ))}
          </NavWrap>
          {/* 모바일에서는 Menu가 햄버거 모양으로 바뀜 */}
          <Menu
            src="/icon/icon_menu.svg"
            width={28}
            height={32}
            onClick={() => setOpenDrawer(true)}
          />
        </LogoWrap>
        {!isLogin ? (
          <LoginWrap>
            {LoginArr.map(({ href, text }, index) => (
              <NavItemWrap key={href}>
                <Link href={href} title={text}>
                  <NavItem $isPath={pathname === href}>{text}</NavItem>
                </Link>
                {index !== LoginArr.length - 1 && <NavBorder />}
              </NavItemWrap>
            ))}
          </LoginWrap>
        ) : (
          <NavItemWrap>
            <Link href={'/mypage'} title={'mypage'}>
              <NavItem $isPath={pathname === '/mypage'}>{'Mypage'}</NavItem>
            </Link>
            <NavBorder />
            <NavItem onClick={handleLogout} style={{ marginLeft: '24px' }}>
              Logout
            </NavItem>
          </NavItemWrap>
        )}
      </HeaderWrap>
      {/* 모바일에서 열리는 메뉴 */}
      <MenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </HeaderLayout>
  );
}

export const HeaderLayout = styled.div<{ $path: string }>`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background-color: ${({ $path }) => ($path === '/beer' ? '#f7f7f7' : 'white')};
`;

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 32px;
  cursor: pointer;
  color: ${({ theme }) => theme.gray.gray20};

  ${({ theme }) => theme.textSize.S28W700};
  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const NavWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavItemWrap = styled.div`
  display: flex;
  align-items: center;
  text-transform: none;
`;

const NavBorder = styled.div`
  border-right: 1px solid ${({ theme }) => theme.gray.gray80};
  height: 12px;
  margin-left: 24px;
`;

const NavItem = styled.nav<{ $isPath?: boolean }>`
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};
  ${({ $isPath, theme }) => ($isPath ? theme.textSize.S18W700 : theme.textSize.S18W400)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    opacity: 0.5;
  }
`;

const Menu = styled(Images)`
  display: none;

  @media ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

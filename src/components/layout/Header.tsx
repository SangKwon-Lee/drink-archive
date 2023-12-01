'use client';
import Link from 'next/link';
import Images from '@utils/images';
import styled from 'styled-components';
import { deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuDrawer from '@components/drawer/MenuDrawer';

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
                <NavLink
                  aria-label={`${text}페이지로 이동`}
                  about={text}
                  href={href}
                  title={text}
                  $isPath={pathname.includes(text.toLowerCase())}
                >
                  {text}
                </NavLink>
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
        {isLogin ? (
          <LoginWrap>
            {LoginArr.map(({ href, text }, index) => (
              <NavItemWrap key={href}>
                <NavLink
                  href={href}
                  title={text}
                  $isPath={pathname === href}
                  aria-label={`${text}페이지로 이동`}
                >
                  {text}
                </NavLink>
                {index !== LoginArr.length - 1 && <NavBorder />}
              </NavItemWrap>
            ))}
          </LoginWrap>
        ) : (
          <NavItemWrap>
            <NavLink
              href={'/mypage'}
              title={'mypage'}
              aria-label={`마이페이지로 이동`}
              $isPath={pathname === '/mypage'}
            >
              {'Mypage'}
            </NavLink>
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

export const HeaderLayout = styled.header<{ $path: string }>`
  display: flex;
  position: sticky;
  z-index: 1;
  top: 0;
  justify-content: center;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background-color: ${({ $path }) => ($path === '/beer' ? '#f7f7f7' : 'white')};
`;

const HeaderWrap = styled.nav`
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
  color: ${({ theme }) => theme.gray.gray20};
  cursor: pointer;

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

const NavLink = styled(Link)<{ $isPath?: boolean }>`
  transition: all 0.2s;
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};
  cursor: pointer;
  ${({ $isPath, theme }) => ($isPath ? theme.textSize.S18W700 : theme.textSize.S18W400)};

  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    opacity: 0.5;
  }
`;

const NavItemWrap = styled.div`
  display: flex;
  align-items: center;
  text-transform: none;
`;

const NavBorder = styled.div`
  height: 12px;
  margin-left: 24px;
  border-right: 1px solid ${({ theme }) => theme.gray.gray80};
`;

const NavItem = styled.button<{ $isPath?: boolean }>`
  transition: all 0.2s;
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};
  cursor: pointer;
  ${({ $isPath, theme }) => ($isPath ? theme.textSize.S18W700 : theme.textSize.S18W400)};

  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  &:active {
    opacity: 0.5;
  }
`;

const Menu = styled.img`
  display: none;

  @media ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

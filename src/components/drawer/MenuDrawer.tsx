import Link from 'next/link';
import Images from '@utils/images';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { SwipeableDrawer } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface MenuDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavArr = [
  {
    href: '/beer',
    text: 'Beer',
    icon: '/icon/icon_beer.svg',
    alt: '맥주 아이콘'
  },
  {
    href: '/whiskey',
    text: 'Whiskey',
    icon: '/icon/icon_whiskey.svg',
    alt: '위스키 아이콘'
  },
  {
    href: '/wine',
    text: 'Wine',
    icon: '/icon/icon_wine.svg',
    alt: '와인 아이콘'
  }
];

const LinkWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default function MenuDrawer({ open, setOpen }: MenuDrawerProps) {
  const pathname = usePathname();
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <DrawerWrap>
        <DrawerLogoWrap>
          <LinkWrap>
            <NavItem href={'/'} title="home">
              Drink Archive
            </NavItem>
          </LinkWrap>
        </DrawerLogoWrap>
        <NavWrap>
          {NavArr.map(({ href, text, icon, alt }) => (
            <LinkWrap key={alt}>
              <Images alt={alt} src={icon} width={24} height={24} />
              <NavItem
                href={href}
                aria-label={`${text}페이지로 이동`}
                title={text}
                key={href}
                onClick={() => setOpen(false)}
                $isPath={pathname === href}
              >
                {text}
              </NavItem>
            </LinkWrap>
          ))}
        </NavWrap>
      </DrawerWrap>
    </SwipeableDrawer>
  );
}

const DrawerWrap = styled.aside`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 16px;
`;

const DrawerLogoWrap = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray80};
`;

const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const NavItem = styled(Link)<{ $isPath?: boolean }>`
  transition: all 0.2s;
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};

  ${({ theme }) => theme.textSize.S20W700};
  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }
`;

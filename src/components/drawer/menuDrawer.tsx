import Link from 'next/link';
import Images from '@utils/images';
import { styled } from 'styled-components';
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
    icon: '/icon/icon_beer.svg'
  },
  {
    href: '/whiskey',
    text: 'Whiskey',
    icon: '/icon/icon_whiskey.svg'
  },
  {
    href: '/wine',
    text: 'Wine',
    icon: '/icon/icon_wine.svg'
  }
];

const LinkStyle = styled(Link)`
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
          <LinkStyle href={'/'} title="home">
            <NavItem>Drink Archive</NavItem>
          </LinkStyle>
        </DrawerLogoWrap>
        <NavWrap>
          {NavArr.map(({ href, text, icon }) => (
            <LinkStyle href={href} title={text} key={href} onClick={() => setOpen(false)}>
              <Images src={icon} width={24} height={24} />
              <NavItem $isPath={pathname === href}>{text}</NavItem>
            </LinkStyle>
          ))}
        </NavWrap>
      </DrawerWrap>
    </SwipeableDrawer>
  );
}

const DrawerWrap = styled.div`
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

const DrawerLogo = styled.nav`
  ${({ theme }) => theme.textSize.S20W700};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  &:visited {
    color: ${({ theme }) => theme.gray.gray10};
  }

  transition: all 0.2s;
`;

const NavWrap = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const NavItem = styled.nav<{ $isPath?: boolean }>`
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};

  ${({ theme }) => theme.textSize.S20W700};
  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  transition: all 0.2s;
`;

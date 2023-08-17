import Link from 'next/link';
import Images from '@utils/images';
import { styled } from 'styled-components';
import { SwipeableDrawer } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';

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
          <DrawerLogo>Drink Archive</DrawerLogo>
        </DrawerLogoWrap>
        <NavWrap>
          {NavArr.map(({ href, text, icon }) => (
            <LinkStyle href={href} title={text} key={href}>
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

const DrawerLogo = styled.div`
  ${({ theme }) => theme.textSize.S20W700};
`;

const NavWrap = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const NavItem = styled.nav<{ $isPath: boolean }>`
  color: ${({ $isPath, theme }) => ($isPath ? theme.palette.orange : theme.gray.gray20)};

  ${({ theme }) => theme.textSize.S20W700};
  &:hover {
    color: ${({ theme }) => theme.palette.orange};
  }

  transition: all 0.2s;
`;

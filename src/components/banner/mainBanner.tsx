import Images from '@utils/images';
import styled from 'styled-components';

interface MainBannerProps {
  src: string;
  title: string;
}

export default function MainBanner({ src, title }: MainBannerProps) {
  return (
    <Banner>
      <Images src={src} style={{ objectFit: 'cover' }} />
      <BannerTitle>{title}</BannerTitle>
    </Banner>
  );
}

const Banner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
`;

const BannerTitle = styled.h2`
  z-index: 1;
  margin: 0;
  color: white;

  ${({ theme }) => theme.textSize.S64W700};
`;

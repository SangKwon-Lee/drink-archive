export const imageLoader = ({ src, width }: { src: string; width: any }) => {
  return `https://xeapi.pxd.co.kr${src}?w=${width}`;
};

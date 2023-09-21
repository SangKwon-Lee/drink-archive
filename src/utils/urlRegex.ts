const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;

export const ChangeUrl = (url: string) => {
  return url.replace(regex, '-').replace(/-$/, '');
};

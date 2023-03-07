import stringToColor from 'utils/stringToColor';

interface IStringAvatar {
  name: string;
  size: string;
  fontSize: string;
}

const StringAvatar = (props: IStringAvatar) => {
  const { name, size, fontSize } = props;
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: size ?? '35px',
      width: size ?? '35px',
      fontSize: fontSize ?? '1.25rem',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

export default StringAvatar;

import React, { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Link.module.scss';

export enum LinkTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum LinkSize {
  M = 'sizeM',
  L = 'sizeL',
  XL = 'sizeXl',
}
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  theme?: LinkTheme;
  children: ReactNode;
}

export const Link: FC<LinkProps> = (props) => {
  const {
    children,
    className,
    theme = LinkTheme.CLEAR,
    href = '',
  } = props;

  return (
    <a href={href} className={classNames(cls.link, {}, [className, cls[theme]])}>{children}</a>
  );
};

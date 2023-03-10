import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

export enum AppRoutes {
  MAIN = 'main',

  // last-one
  NOT_FOUND = 'not_found',
}

export interface RouteLink {
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export type RouteItem = RouteProps & {
  link?: RouteLink;
}

export const RouteElements: Record<AppRoutes, RouteItem> = {
  [AppRoutes.MAIN]: {
    path: '/',
    element: <MainPage />,
    link: {
      text: 'Main',
      Icon: MainIcon,
    },
  },

  // last-one
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};

export const routeItems:
RouteItem[] = Object.values(RouteElements).map((val) => val);

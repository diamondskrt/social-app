import type { Link } from '@/models';

export const links: Link[] = [
  {
    label: 'Home',
    route: '/',
    icon: 'house',
  },
  {
    label: 'Explore',
    route: '/explore',
    icon: 'search',
  },
  {
    label: 'People',
    route: '/all-users',
    icon: 'users',
  },
  {
    label: 'Saved Posts',
    route: '/saved-posts',
    icon: 'bookmark',
  },
  {
    label: 'Create Post',
    route: '/create-post',
    icon: 'image-plus',
  },
];

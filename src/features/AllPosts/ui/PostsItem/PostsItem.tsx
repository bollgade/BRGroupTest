import { ItemData } from 'features/AllPosts/model/services/AllPostsService';
import { t } from 'i18next';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import cls from './PostsItem.module.scss';

interface PostsItemProps {
  className?: string;
  post: ItemData
}

export const PostsItem: FC<PostsItemProps> = (props) => {
  const {
    className = '',
    post,
  } = props;

  const router = useNavigate();

  return (
    <div
      onClick={() => router(`/posts/${post.id}`)}
      className={classNames(cls.postsItem, {}, [className])}
    >
      <Text title={`Заголовок: ${post.title}`} />
      <Text text={`Рейтинг: ${post.score.toString()}`} />
      <Text text={`${t('Author')}: ${post.by}`} />
      <Text text={new Date(post.time * 1000).toLocaleString()} />
    </div>
  );
};

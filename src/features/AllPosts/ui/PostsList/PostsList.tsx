import { t } from 'i18next';
import {
  useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useFetching } from 'shared/lib/hooks/useFetching/useFetching';
import { useTimeout } from 'shared/lib/hooks/useTimeout/useTimeout';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { AllPosts, ItemData } from '../../model/services/AllPostsService';
import { PostsItem } from '../PostsItem/PostsItem';
import cls from './PostsList.module.scss';

interface PostsListProps {
  className?: string;
}

const UPDATE_DELAY = 60000;

export const PostsList = (props: PostsListProps) => {
  const { className = '' } = props;
  const PostsApi = new AllPosts();

  const [fetchPosts, isPostsLoading, , posts] = useFetching<ItemData[]>(async () => {
    await PostsApi.getLastItems();
    const response = await PostsApi.getLastStories();
    return response;
  });

  const [updatePostsOnTimer, deletePostsTimer] = useTimeout(
    () => { fetchPosts(); },
    UPDATE_DELAY,
  );

  const updatePosts = useCallback(() => {
    deletePostsTimer();
    fetchPosts();
    updatePostsOnTimer();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchPosts();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classNames(cls.posts, {}, [className])}>
      <Button onClick={updatePosts}>{t('Update')}</Button>
      { isPostsLoading && <Loader />}
      { posts?.map((stories) => (
        <PostsItem
          post={stories}
          key={stories.id}
        />
      ))}
    </div>
  );
};

import { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useFetching } from 'shared/lib/hooks/useFetching/useFetching';
import { Link } from 'shared/ui/Link/Link';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { CommentsList } from 'entities/Post/ui/Comment/CommentsList';
import { t } from 'i18next';
import { PostService, ItemData } from '../../model/services/PostService';
import cls from './Post.module.scss';

interface PostProps {
  className?: string;
}

export const Post: FC<PostProps> = (props) => {
  const { className = '' } = props;

  const params = useParams();

  const PostAPI = new PostService(Number(params.id));

  const [fetchPostById, isLoading,, post] = useFetching<ItemData>(async () => {
    const response = await PostAPI.getPost();

    return response;
  });

  const updatePost = useCallback(() => {
    fetchPostById();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchPostById();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classNames(cls.post, {}, [className])}>
      {isLoading && !post
      ? <Loader />
      : (post
        && (
          <>
            <Link href={post.url}>{t('Link to news')}</Link>
            <Text title={post.title} />
            <p>{`${t('Date of publication')}: ${new Date(post.time * 1000).toLocaleString()}`}</p>
            <Text text={`${t('Author')}: ${post.by}`} />
            <Text text={`${t('Comments count')}: ${post.descendants}`} />
            {post.kids && (
              <>
                <Text text={`${t('Comments')}:`} />
                <Button onClick={updatePost}>{t('Update')}</Button>
                <CommentsList
                  commentsId={post.kids}
                />
              </>
            )}

          </>
        )
      )}
    </div>
  );
};

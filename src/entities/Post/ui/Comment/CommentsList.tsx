import { useEffect } from 'react';
import { useFetching } from 'shared/lib/hooks/useFetching/useFetching';
import { Loader } from 'shared/ui/Loader/Loader';
import { Comment } from './Comment';
import { ItemData, PostService } from '../../model/services/PostService';

interface CommentsListProps {
  className?: string;
  commentsId: number[];
}

export interface CommentData extends ItemData
{
  deleted: boolean
}

export const CommentsList = (props: CommentsListProps) => {
  const {
    className = '',
    commentsId,
  } = props;

  const [fetchComments, isComLoading, , comments] = useFetching<CommentData[]>(async (commentsId) => {
    const response = await PostService.getComments(commentsId);
    return response;
  });

  useEffect(() => {
    fetchComments(commentsId);
  }, commentsId);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      {isComLoading && <Loader />}
      {comments?.map((comment) => {
        if (!comment.deleted) {
          return (
            <Comment
              key={comment.id}
              comment={comment}
            />
          );
        }
        return null;
      })}

    </div>
  );
};

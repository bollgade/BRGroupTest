import { FC, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { CommentData, CommentsList } from './CommentsList';
import cls from './Comment.module.scss';

interface CommentProps {
  comment: CommentData;
}

export const Comment: FC<CommentProps> = (props) => {
  const {
    comment,
  } = props;

  const [showKids, setShowKids] = useState(false);

  return (
    <div className={cls.comment}>
      <Button
        theme={ButtonTheme.CLEAR}
        onClick={() => {
          setShowKids((prev) => !prev);
        }}
      >
        <span className={cls.commentText}>
          {showKids && comment.kids ? '- ' : '+ '}
          {comment.by}
          :
          {' '}
          {comment?.text}
        </span>
      </Button>
      {showKids && comment.kids && (
        <CommentsList
          className={cls.kids}
          commentsId={comment.kids}
        />
      )}
    </div>
  );
};

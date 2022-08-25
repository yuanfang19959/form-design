import { Draggable } from 'react-beautiful-dnd';
import styles from './style/seed.less';

export default (props: any) => {
  const { data, index } = props;
  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided: any, snapshot: any) => (
          <div
            className={styles.eachTag}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {data.label}
          </div>
        )}
      </Draggable>
    </>
  );
};

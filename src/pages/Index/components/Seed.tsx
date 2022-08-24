import { Draggable } from 'react-beautiful-dnd';
import './style/seed.less';

export default (props: any) => {
  const { data, index } = props;
  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided: any, snapshot: any) => (
          <div
            className="cell"
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

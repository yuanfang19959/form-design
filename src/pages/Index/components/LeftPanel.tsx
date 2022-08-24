import { Droppable } from 'react-beautiful-dnd';
import formItemList from '@/constant/generator';
import Seed from './Seed';
import '././style/rightPanel.less';

export default (props) => {
  console.log('left', props.content)
  return (
    <>
      <div className="left">
        {formItemList.map((el, i) => (
          <>
            <h3 className="title">{el.title}</h3>
            <Droppable droppableId={el.id}>
              {(provided, snapshot) => {
                return (
                  <div
                    className="shell"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {el.items.map((el, index) => (
                      <Seed key={el.id} data={el} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </>
        ))}
      </div>
    </>
  );
};

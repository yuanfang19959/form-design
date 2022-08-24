/**
 * 中间区域
 * 渲染对应子表单组件
 */
import { Form } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import FormItem from './FormItem';

export default (props: any) => {
  const {
    content = [],
  } = props;
  return (
    <>
    <h3 style={{textAlign:'center'}}>表单内容</h3>
    <Droppable droppableId={'content'}>
      {(provided: any, snapshot: any) => {
        return (
          <div
          style={{ height: '100%' }}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          >
            <Form style={{ backgroundColor: '#FFF' }}>
              {content.map((el: any, index) => (
                <FormItem key={el.id} data={el} index={index} />
                ))}
            </Form>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
      </>
  );
};

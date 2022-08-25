/**
 * 中间区域
 * 渲染对应子表单组件
 */
import { Form } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import FormItem from './FormItem';

export default (props: any) => {
  const { content = [], setNowClick, nowClick } = props;
  return (
    <>
      <Droppable droppableId={'content'}>
        {(provided: any, snapshot: any) => {
          return (
            <div
              style={{ height: '100%' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <Form
                style={{ backgroundColor: '#FFF' }}
                labelCol={{ span: 2 }}
                requiredMark={true}
              >
                {content.map((el: any, index) => (
                  <div
                    onClick={() => {
                      setNowClick(el.id);
                    }}
                  >
                    <FormItem
                      key={el.id}
                      detail={el}
                      index={index}
                      nowClick={nowClick}
                    />
                  </div>
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

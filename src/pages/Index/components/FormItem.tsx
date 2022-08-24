// 表单单个组件
import { Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

export default (props: any) => {
  const { data, index, placeholder, size, defaultValue, type, isRequired } = props;
  const isActive = false;
  return (
    <>
      <Draggable draggableId={data.id} index={index} direction="vertical">
        {(provided: any, snapshot: any) => (
          <div
            className={`cell ${isActive ? 'cell-active' : ''}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Form.Item
              label={data.label}
              name={data.name}
              rules={[{ required: isRequired, message: '不能为空' }]}
            >
              {(() => {
                switch (data.type) {
                  case 'input':
                    return (
                      <Input
                        // style={{ width: data.options.width }}
                        placeholder={placeholder}
                        value={defaultValue}
                      />
                    );
                  case 'textarea':
                    return (
                      <Input.TextArea
                        // style={{ width: data.options.width }}
                        rows={4}
                        size={size}
                        placeholder={placeholder}
                        value={defaultValue}
                      />
                    );
                  case 'radio':
                    return (
                      <Radio.Group value={defaultValue}>
                        {data?.options?.options.map((el, i) => (
                          <Radio value={el.value} key={i} size={size}>
                            {el.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    );
                  case 'checkbox':
                    return (
                      <Checkbox.Group
                        options={data?.options?.options}
                        size={size}
                        value={defaultValue}
                      />
                    );
                  case 'select':
                    return (
                      <Select
                        // style={{ width: data.options.width, minWidth: '180px' }}
                        size={size}
                        placeholder={placeholder}
                      >
                        {data?.options?.options.map((el, i) => (
                          <Select.Option value={el.value} key={i}>
                            {el.label}
                          </Select.Option>
                        ))}
                      </Select>
                    );
                  case 'date':
                    return (
                      <DatePicker
                        // style={{ width: data.options.width }}
                        size={size}
                        showTime={data.options.format === 'YYYY-MM-DD HH:mm'}
                        format={data.options.format}
                      />
                    );
                  default:
                    break;
                }
              })()}
            </Form.Item>
          </div>
        )}
      </Draggable>
    </>
  );
};

// 表单单个组件
import { Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import './style/seed.less';

export default (props: any) => {
  const { detail, index, size, defaultValue, isRequired, nowClick } = props;

  const isActive = detail.id === nowClick;
  return (
    <>
      <Draggable draggableId={detail.id} index={index} direction="vertical">
        {(provided: any, snapshot: any) => (
          <div
            className={`cell ${isActive ? 'active' : ''}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Form.Item
              label={detail.label}
              name={detail.code}
              rules={[
                { required: detail?.options?.required, message: '不能为空' },
              ]}
              initialValue={detail?.options?.defaultValue}
            >
              {(() => {
                switch (detail.type) {
                  case 'input':
                    return (
                      <Input
                        style={{ width: detail?.options?.width }}
                        placeholder={detail?.options?.placeholder}
                        value={defaultValue}
                      />
                    );
                  case 'textarea':
                    return (
                      <Input.TextArea
                        style={{ width: detail?.options?.width }}
                        rows={4}
                        size={size}
                        placeholder={detail.placeholder}
                        value={defaultValue}
                      />
                    );
                  case 'radio':
                    return (
                      <Radio.Group value={defaultValue}>
                        {detail?.options?.options.map((el, i) => (
                          <Radio value={el.value} key={i} size={size}>
                            {el.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    );
                  case 'checkbox':
                    return (
                      <Checkbox.Group
                        options={detail?.options?.options}
                        size={size}
                        value={defaultValue}
                      />
                    );
                  case 'select':
                    return (
                      <Select
                        style={{ width: detail?.options?.width }}
                        size={size}
                        placeholder={detail.placeholder}
                      >
                        {detail?.options?.options.map((el, i) => (
                          <Select.Option value={el.value} key={i}>
                            {el.label}
                          </Select.Option>
                        ))}
                      </Select>
                    );
                  case 'date':
                    return (
                      <DatePicker
                        style={{ width: detail?.options?.width }}
                        size={size}
                        showTime={detail.options.format === 'YYYY-MM-DD HH:mm'}
                        format={detail.options.format}
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

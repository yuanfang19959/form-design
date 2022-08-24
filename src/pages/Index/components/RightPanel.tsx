import {
  FDInput,
  FDTextArea,
  FDRadio,
  FDCheckbox,
  FDSelect,
  FDSwitch,
  FDDate,
} from './config/Index';
import { Tabs } from 'antd';
import './style/rightPanel.less'
export default (props: any) => {
  const { activeId, content= [] } = props;
  const common = {
    isEmpty: () => {},
  };

  const updateItem = (key: any, value: any) => {
    let target = content.find((el: any) => el.id === activeId);
    if (key === 'label') {
      target.label = value;
    } else {
      target.options[key] = value;
    }
    // props.store.content.set(content);
  };
  return (
    <>
      <div className="right">
        <h3 className="title">表单配置</h3>
        <Tabs defaultActiveKey="2" style={{ padding: '8px' }}>
          <Tabs.TabPane tab="字段属性" key="1">
            {(() => {
              if (common.isEmpty(activeId)) return;
              let target = content.find((el) => el.id === activeId);
              target = {type:'input', options: {width: 20, defaultValue:"", required: true, placeholder:""}}
              if (target)
                switch (target.type) {
                  case 'input':
                    return <FDInput item={target} callback={updateItem} />;
                  case 'textarea':
                    return (
                      <FDTextArea item={target} callback={updateItem} />
                    );
                  case 'radio':
                    return <FDRadio item={target} callback={updateItem} />;
                  case 'checkbox':
                    return (
                      <FDCheckbox item={target} callback={updateItem} />
                    );
                  case 'select':
                    return (
                      <FDSelect item={target} callback={updateItem} />
                    );
                  case 'switch':
                    return (
                      <FDSwitch item={target} callback={updateItem} />
                    );
                  case 'date':
                    return <FDDate item={target} callback={updateItem} />;
                  case 'title':
                    return <FDTitle item={target} callback={updateItem} />;
                  default:
                    break;
                }
            })()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

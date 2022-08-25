import {
  FDInput,
  FDTextArea,
  FDRadio,
  FDCheckbox,
  FDSelect,
  FDDate,
} from './config/Index';
import { Tabs } from 'antd';
import './style/rightPanel.less';
export default (props: any) => {
  const { nowClick, content = [], setContent } = props;

  /**
   * 更新数组项
   * @param key
   * @param value
   */
  const updateItem = (key: any, value: any) => {
    let target = content.find((el: any) => el.id === nowClick);
    if (key === 'label') {
      target.label = value;
    } else {
      target.options[key] = value;
    }
    setContent(content);
  };

  return (
    <>
      <div className="right">
        <h3 className="title">配置</h3>
        <Tabs defaultActiveKey="2" style={{ padding: '8px' }}>
          <Tabs.TabPane tab="组件属性" key="1">
            {(() => {
              if (!nowClick) return;
              let target = content.find((el: any) => el.id === nowClick);
              if (target)
                switch (target.type) {
                  case 'input':
                    return <FDInput item={target} callback={updateItem} />;
                  case 'textarea':
                    return <FDTextArea item={target} callback={updateItem} />;
                  case 'radio':
                    return <FDRadio item={target} callback={updateItem} />;
                  case 'checkbox':
                    return <FDCheckbox item={target} callback={updateItem} />;
                  case 'select':
                    return <FDSelect item={target} callback={updateItem} />;
                  case 'date':
                    return <FDDate item={target} callback={updateItem} />;
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

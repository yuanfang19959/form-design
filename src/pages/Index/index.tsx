import { DragDropContext } from 'react-beautiful-dnd';
import './components/style/index.less';
import MidContent from './components/MidContent';
import RightPanel from './components/RightPanel';
import LeftPanel from './components/LeftPanel';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep as deepClone } from 'lodash';
import { Button } from 'antd';
import { connect } from 'umi';
import generator from '@/constant/generator';

const FormDesign = ({ FromDesignData, dispatch }) => {
  const { content, nowClick } = FromDesignData;
  /**
   * 设置全局的list
   * @param list
   */
  const setContent = (list: []) => {
    dispatch({
      type: 'FromDesignData/setContent',
      payload: list,
    });
  };

  /**
   * 当前被选中项
   * @param id
   */
  const setNowClick = (id: string) => {
    dispatch({
      type: 'FromDesignData/setNowClick',
      payload: id,
    });
  };

  /**
   * 开始移动
   */
  const onDragStart = (result) => {
    const { destination, source, draggableId } = result;

    let start;
    if (source.droppableId.indexOf('seeds') !== -1) {
      start = deepClone(generator[0].items[source.index]);
    }
    if (source.droppableId.indexOf('content') !== -1) {
      start = deepClone(content[source.index]);
      setNowClick(start.id);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    let start;
    if (source.droppableId.indexOf('seeds') !== -1) {
      start = deepClone(generator[0].items[source.index]);
    }
    if (source.droppableId.indexOf('content') !== -1) {
      start = deepClone(content[source.index]);
    }

    if (!destination) {
      // 表单原先为空
      start.id = `content-${uuidv4()}`;
      start.code = `code_${uuidv4()}$`;
      delete start.icon;
    } else {
      if (destination.droppableId.indexOf('seeds') !== -1) return; // 任何地方拖放到菜单，不处理

      const finish = deepClone(content[destination.index]); // 结束地必是表单面板
      const startIndex = source.index;
      const finishIndex = destination.index;

      if (finish && start.id === finish.id) return; // 无拖动

      if (source.droppableId.indexOf('content') !== -1) {
        // 起点在表单面板
        content.splice(startIndex, 1);
        content.splice(finishIndex, 0, start);
      } else if (source.droppableId.indexOf('seeds') !== -1) {
        // 起点在菜单
        start.id = `content-${uuidv4()}`;
        start.code = `code_${uuidv4()}$`;
        delete start.icon;
        content.splice(finishIndex, 0, start);
      }
    }
    console.warn('最新content', content);
    setNowClick(start.id);
    setContent(content);
  };

  /**
   * 预览表单
   */
  const previewForm = () => {};

  /**
   * 清空表单
   */
  const clearForm = () => {
    setContent([]);
    setNowClick('');
  };

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="customizeForm">
          {/* 左侧面板 */}
          <div className="sideBar">
            <LeftPanel content={content} />
          </div>

          {/* 中间区域 */}
          <div className="main">
            <div className="btnBox">
              <Button type="link" onClick={previewForm}>
                预览
              </Button>
              <Button type="link" onClick={clearForm} danger>
                清空
              </Button>
            </div>
            <MidContent
              content={content}
              nowClick={nowClick}
              setNowClick={setNowClick}
            />
          </div>

          {/* 右侧属性面板 */}
          <div className="sideBar">
            <RightPanel
              content={content}
              nowClick={nowClick}
              setContent={setContent}
            />
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default connect(({ FromDesignData }) => ({
  FromDesignData,
}))(FormDesign);

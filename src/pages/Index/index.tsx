import { DragDropContext } from 'react-beautiful-dnd';
import './components/style/index.less';
import MidContent from './components/MidContent';
import RightPanel from './components/RightPanel';
import LeftPanel from './components/LeftPanel';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep as deepClone } from 'lodash'
import { connect } from 'umi';
import generator from '@/constant/generator';

const FormDesign = ({ FromDesignData, dispatch }) => {
  const { content } = FromDesignData;

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
      console.warn('finishIndex', finishIndex);

      if (finish && start.id === finish.id) return; // 无拖动

      if (source.droppableId.indexOf('content') !== -1) {
        // 起点在表单面板
        console.warn('start', start);
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
    // this.props.store.activeId.set(start.id);
    setContent(content);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="customizeForm">
          {/* 左侧面板 */}
          <div className="sideBar">
            <LeftPanel content={content} />
          </div>

          {/* 中间区域 */}
          <div className="main">
            <MidContent content={content} />
          </div>

          {/* 右侧属性面板 */}
          <div className="sideBar">
            <RightPanel />
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default connect(({ FromDesignData }) => ({
  FromDesignData,
}))(FormDesign);

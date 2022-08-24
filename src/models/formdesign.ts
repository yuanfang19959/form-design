const FromDesignModel = {
  namespace: 'FromDesignData',
  state: {
    content: [],
  },
  // 异步处理数据
  effects: {
    // *addFormItem({ payload }, { call, put }) {
    //   console.log(payload)
    //   put({
    //     type: 'adds',
    //     payload: { payload }
    //   })
    // },
  },
  
  // 同步处理数据
  reducers: {
    addFormItem(state: any, { payload }: any) {
      const content = state.content;
      content.push(payload)
      return {
        ...state,
        content
      }
    },
    setContent(state: any, { payload }: any) {
      const content = [...payload];
      return {
        ...state,
        content
      }
    }
  },
};

export default FromDesignModel;
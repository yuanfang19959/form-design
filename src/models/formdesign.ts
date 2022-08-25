const FromDesignModel = {
  namespace: 'FromDesignData',
  state: {
    content: [
      {
        code: 'code_b3971422-7ab2-4cbb-af42-68ade4196fc2$',
        id: 'content-c3a35ee9-9091-4286-bcfa-a650734ef070',
        label: '单行文本',
        options: {
          dataType: 'text',
          defaultValue: '',
          disabled: false,
          placeholder: '请输入',
          required: false,
          width: '100%',
        },
        type: 'input',
      },
    ],
    nowClick: 'content-c3a35ee9-9091-4286-bcfa-a650734ef070',
  },

  // 同步处理数据
  reducers: {
    addFormItem(state: any, { payload }: any) {
      const content = state.content;
      content.push(payload);
      return {
        ...state,
        content,
      };
    },
    setContent(state: any, { payload }: any) {
      const content = [...payload];
      return {
        ...state,
        content,
      };
    },
    setNowClick(state: any, { payload }: any) {
      return {
        ...state,
        nowClick: payload,
      };
    },
  },
};

export default FromDesignModel;

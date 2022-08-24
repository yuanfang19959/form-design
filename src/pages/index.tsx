import React, { FC, useEffect } from 'react';
import { IndexModelState, ConnectProps, Loading, connect, useHistory } from 'umi';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const { name } = index;
  const history = useHistory();

  useEffect(() => {
    history.push('/index')
  })
  const kapa = () => {
    dispatch({
      type: 'index/query',
      payload: {
        name: '123321'
      }
    })
    
  }

  return <div onClick={kapa}>Hello {name}</div>;
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(IndexPage);
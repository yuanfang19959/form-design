// 文件upload
// import { UOLOADURL } from "@/constants/index";
import { InboxOutlined } from '@ant-design/icons';
import { message, UploadProps } from 'antd';
import { Progress, Table, Upload, Button } from 'antd';
import axios from 'axios';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { request } from 'umi';

const UOLOADURL = '!@#';
const { Dragger } = Upload;
const FileUpload = (props: any, ref: any) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      render: (_: any, record: any) => {
        if (_) {
          return (
            <>
              <a href={record?.response?.data} target="blank">
                {_}
              </a>
            </>
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: '资料标题',
      dataIndex: 'name',
      render: (_: any) => {
        if (_) {
          return <>{_.split('.')[0]}</>;
        } else {
          return '-';
        }
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      render: (_: any) => <> {(_ / 1024 / 1024).toFixed(2)}MB</>,
    },
    {
      title: '状态',
      dataIndex: 'size',
      render: (_: any, record) => (
        <>
          {record?.status === 'done' ? (
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => remove(_)}
            >
              上传成功
            </span>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'uid',
      render: (_: any, record) => (
        <div>
          <span
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => remove(_)}
          >
            移除
          </span>
          <Progress
            type="circle"
            percent={record.percent.toFixed(0)}
            width={15}
            strokeWidth={15}
            showInfo={false}
          />
        </div>
      ),
    },
  ];

  const [fileList, setFileList] = useState([]);
  const remove = (_) => {
    const tmp = fileList.filter((v) => v.uid != _);
    setFileList([...tmp]);
  };

  const UploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: UOLOADURL,
    customRequest: () => {},
    showUploadList: false,
    fileList,
    accept: '*',
    onChange(f: any) {
      setFileList(f.fileList);
      console.log(f);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useImperativeHandle(ref, () => {
    return {
      getVal: () => {
        const res = fileList.find((v) => v.status != 'done');
        if (res) {
          message.warning('资料还没传好，请稍等');
          return false;
        }
        return fileList;
      },
    };
  });

  /**
   * 上传函数
   * @param file
   * @returns
   */
  const batchuploadFn = (file, formData) => {
    return axios({
      url: '/nimabi/img/imgload/upload.json',
      method: 'post',
      data: formData,
      onUploadProgress: (progressEvent) => {
        console.log('进度', progressEvent);
        const { loaded, total } = progressEvent;
        console.log((loaded / total).toFixed(1));
        file.percent = (loaded / total) * 100;
        setFileList([...fileList]);
      },
    });
  };

  const handleOk = () => {
    Promise.all(
      fileList.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file.originFileObj);

        const res = await batchuploadFn(file, formData);
        file.status = res;
        console.log('res', file);
        setFileList([...fileList]);
      }),
    );
  };

  return (
    <>
      <Button onClick={handleOk}>上传</Button>
      {/* 拖拽组件 */}
      <div style={{ maxHeight: 240, marginBottom: 20 }}>
        <Dragger {...UploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">将文件拖拽至此处</p>
          <p className="ant-upload-hint">
            文件命名规范：1 使用UTF-8 编码 2.区分大小写 3. 不能以特殊字符开头
          </p>
        </Dragger>
      </div>

      {/* 表格 */}
      <Table
        rowKey={(record, index) => record.uid}
        dataSource={fileList}
        columns={columns}
        pagination={false}
        locale={{ emptyText: '无待上传文件' }}
      />
    </>
  );
};

export default forwardRef(FileUpload);

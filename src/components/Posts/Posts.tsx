import React, { useState } from 'react';

import { useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } from '../../Redux/PostsSlice';
import Spinner from '../Spinner/Spinner';
import EditablePostCell from './components/EditablePostCell';
import Message from '../Message/Message';

import { Form, Popconfirm, Table, Typography } from 'antd';
import { useParams } from "react-router-dom";

import { IPost } from '../../interfaces/index';

const Posts: React.FC = () => {
    const params: any = useParams();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const { data: posts = [], isLoading, isError } = useGetPostQuery(params.id || 0);

    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <Message status="error" title="Something went wrong, contact the administrators."
            label="Refresh Page" />
    }

    const isEditing = (record: IPost) => record.id.toString() === editingKey;

    const edit = (record: Partial<IPost> & { id: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id.toString());
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as IPost;
            // Important: resource will not be really updated on the server but it will be faked as if.
            await updatePost({ ...row, id: +key });

            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (id: number) => {
        await deletePost(id);
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            width: '15%',
            editable: false,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '25%',
            editable: true,
        },
        {
            title: 'Body',
            dataIndex: 'body',
            width: '40%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_: any, record: IPost) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <div>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </Typography.Link>
                        </div>
                        <div>
                            <Popconfirm
                                title="Are you sure to delete this post?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Typography.Link>Delete</Typography.Link>
                            </Popconfirm>
                        </div>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col, idx) => {
        if (!col.editable) {
            return col;
        }
        return {
            key: idx,
            ...col,
            onCell: (record: IPost) => ({
                record,
                inputType: col.dataIndex === 'userId' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditablePostCell,
                    },
                }}
                bordered
                dataSource={posts.map((post) => ({ ...post, key: post.id }))}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default Posts;

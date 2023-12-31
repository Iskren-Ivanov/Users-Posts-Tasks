import React, { useMemo } from "react";
import Spinner from '../Spinner/Spinner';
import UserData from "./components/UserData";
import Message from "../Message/Message";

import { useGetUsersQuery } from '../../Redux/UsersSlice';
import { Collapse, CollapseProps } from "antd";

import styles from './User.module.css';
const Users: React.FC = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const defaultActiveKey = 1;

    // With useMemo reduced the render count of the component from 8 to 6
    const renderedContent = useMemo(() => {
        if (isLoading) {
            return <Spinner />;
        }

        if (isError) {
            return <Message status="error" title="Something went wrong, contact the administrators." label="Refresh Page" />;
        }

        const mappedUsers: CollapseProps['items'] = users.map((user) => ({
            key: user.id.toString(),
            label: user.name,
            children: <UserData user={user} />,
        }));

        return (
            <div className={styles.user}>
                <Collapse items={mappedUsers} defaultActiveKey={[defaultActiveKey]} />
            </div>
        );
    }, [users, isLoading, isError, defaultActiveKey]);

    return renderedContent;
};

export default Users;

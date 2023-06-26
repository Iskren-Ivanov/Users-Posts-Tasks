import React from "react";
import Spinner from '../Spinner/Spinner';
import Error from '../../Error/Error';
import UserData from "./components/UserData";

import { useGetUsersQuery } from '../../Redux/UsersSlice';
import { Collapse, CollapseProps } from "antd";

import styles from './User.module.css'

const Users: React.FC = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const defaultActiveKey = 1;

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <Error />
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
    )
}

export default Users;
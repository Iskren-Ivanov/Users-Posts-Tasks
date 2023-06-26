import { Fragment, useState } from 'react';
import UsersFields from './UsersFields';
import EditUserPopUp from '../../EditUserPopUp/EditUserPopUp';
import { IFlatUser } from '../../../interfaces';
import { Button, Form } from "antd";
import { Link } from "react-router-dom";

import styles from './UserData.module.css';

const UserData = ({ user }: { user: IFlatUser | undefined }) => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    if (!user) {
        return null;
    }

    const onEditClick = () => setIsPopUpOpen(true);

    return (
        <Fragment>
            <div className={styles.user}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <div className={styles.gridContainer}>
                        <EditUserPopUp
                            isOpen={isPopUpOpen}
                            setIsOpen={setIsPopUpOpen}
                            user={user}
                        />
                        <UsersFields user={user} />
                    </div>
                    <Form.Item className={styles.formItem}>
                        <Button onClick={onEditClick}>
                            Edit
                        </Button>
                        <Link className={styles.link} to={`/posts/${user.id}`}>
                            See posts
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </ Fragment >
    )
};

export default UserData;
import React from "react";
import UserInput from './components/UserInput';
import { useUpdateUserMutation } from '../../Redux/UsersSlice';
import Error from '../../Error/Error';
import { convertToUser } from "../../helpers/userHelper";
import { Button, Modal, Form } from 'antd';
import { IEditUserPopUp, IMapUserPropsToLabels, IUser } from '../../interfaces';

import styles from './EditUserPopUp.module.css';

const mapPropsToLabels: IMapUserPropsToLabels = {
    id: 'Id',
    name: 'Name',
    username: 'Username',
    email: 'Email',
    street: 'Street',
    suite: 'Suite',
    city: 'City',
    zipcode: 'Zip Code',
    lat: 'Lat',
    lng: 'Lng',
    phone: 'Phone',
    website: 'Website',
    companyName: 'Company Name',
    catchPhrase: 'Catch Phrase',
    bs: 'BS',
}

const EditUserPopUp: React.FC<IEditUserPopUp> = ({ user, isOpen, setIsOpen }) => {
    const [form] = Form.useForm();
    const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

    if (isError) {
        return <Error />
    }

    const handleSubmit = async () => {
        try {
            const validateResults = await form.validateFields();
            const editedUser: IUser = convertToUser(validateResults);
            // Important: resource will not be really updated on the server but it will be faked as if.
            const updatedUser = await updateUser(editedUser);
            setIsOpen(false);
        } catch (error) {
            console.log('Validation error in handleSubmit is:', JSON.stringify(error, null, 2));
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                className={styles.modal}
                open={isOpen}
                title="Title"
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" disabled={false} onClick={handleSubmit}>
                        Submit
                    </Button>,
                    <Button key="cancel" type="primary" disabled={false} onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}
                bodyStyle={{
                    height: '350px',
                    overflow: 'auto'
                }}
            >
                <Form form={form} initialValues={user}>
                    <div>
                        <UserInput user={user} mapPropsToLabels={mapPropsToLabels} />
                    </div>
                </Form>
            </Modal>
        </>
    );
};


export default EditUserPopUp;
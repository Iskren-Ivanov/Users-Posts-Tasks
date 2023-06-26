import React from "react";
import { Form, Input } from 'antd';
import { IFlatUser, IMapUserPropsToLabels } from '../../../interfaces/index';

interface RenderInputProps {
    user: IFlatUser | { [key: string]: any };
    mapPropsToLabels: IMapUserPropsToLabels
}

// Required fields 
const requiredFields = ['username', 'email', 'street', 'suite', 'city'];

const RenderInput: React.FC<RenderInputProps> = (
    {
        user,
        mapPropsToLabels,
    }
) => {
    const userKeys = Object.keys(user);
    const getRules = (key: string, label: string) => {
        const currentRules = [];
        const hasRequiredFields = requiredFields.includes(key);
        currentRules.push({
            message: `Please enter ${label}`,
            required: hasRequiredFields
        });

        return currentRules;
    }

    return (
        <>
            {userKeys.map((key: string) => {
                const userData = user[key];
                // it should not be possible to change the id
                const isDisabled = key === 'id' && true;
                const label = mapPropsToLabels[key];
                let rules = getRules(key, label);
                return (
                    <Form.Item key={key} name={key} label={label} rules={rules}>
                        <Input disabled={isDisabled} value={userData} />
                    </Form.Item>
                );
            })}
        </>
    );
}

export default RenderInput;
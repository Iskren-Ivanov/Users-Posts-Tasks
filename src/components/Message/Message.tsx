import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Result } from "antd";
import { IMessageProps } from '../../interfaces/Message/IMessage';

const Message: React.FC<IMessageProps> = ({ status, title, subTitle, label }) => {
    const history = useHistory();
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={[
                <Button onClick={() => history.push("/")}>{label}</Button>
            ]}
        />
    );
};

export default Message;
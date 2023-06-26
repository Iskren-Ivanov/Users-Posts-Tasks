import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Result } from "antd";


const Error: React.FC = () => {
    const history = useHistory();
    return (
        <Result
            status="error"
            title="Something went wrong, contact the administrators."
            extra={[
                <Button onClick={() => history.push("/")}>Refresh Page</Button>
            ]}
        />
    );
};

export default Error;
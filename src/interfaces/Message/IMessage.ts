
import { ResultProps, ResultStatusType } from "antd/lib/result";

export interface IMessageProps extends ResultProps {
    status?: ResultStatusType;
    title?: React.ReactNode;
    label?: React.ReactNode;
    subTitle?: React.ReactNode;
}
import {IFlatUser} from "../Users/IFlatUser";

export interface IEditUserPopUp {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    user: IFlatUser | {},
}
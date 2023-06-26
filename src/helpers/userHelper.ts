import {IFlatUser, IUser} from "../interfaces";

export const convertToUser = (flatUser: IFlatUser): IUser => {
    const user: IUser = {
        id: flatUser.id,
        name: flatUser.name,
        username: flatUser.username,
        email: flatUser.email,
        address: {
            street: flatUser.street,
            suite: flatUser.suite,
            city: flatUser.city,
            zipcode: flatUser.zipcode,
            geo: {
                lat: flatUser.lat,
                lng: flatUser.lng,
            },
        },
        phone: flatUser.phone,
        website: flatUser.website,
        company: {
            name: flatUser.companyName,
            catchPhrase: flatUser.catchPhrase,
            bs: flatUser.bs,
        },
    };

    return user;
}

export const convertToFlatUser = (user: IUser): IFlatUser => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
        phone: user.phone,
        website: user.website,
        companyName: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
    };
}
interface IMapUserPropsToLabels {
    id: string;
    name: string;
    username: string;
    email: string;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    lat: string;
    lng: string;
    phone: string;
    website: string;
    companyName: string;
    catchPhrase: string;
    bs: string;
    [key: string]: string;
}

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


const UsersFields = ({ user }: any) => {
    const userKeys = Object.keys(user);

    return (
        <>
            {userKeys.map((key: string) => {
                const userData = user[key];
                const labelWithUpperCase = mapPropsToLabels[key];
                return (
                    <div key={key} >
                        {`${labelWithUpperCase}: ${userData}`}
                    </div>
                );
            })}
        </>
    )
};

export default UsersFields;
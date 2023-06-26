import Posts from "../components/Posts/Posts";
import Users from "../components/Users/Users";
import Tasks from "../components/Tasks/Tasks";

import Navigation from "../components/Navigation/Navigation";

import { Switch, Route, useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

const Router = () => {
    const history = useHistory();
    return (
        <div>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Users} />
                <Route path="/posts/:id" component={Posts} />
                <Route path="/tasks" component={Tasks} />
                <Route path="*" render={() => <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => history.push('/')}>Back Home</Button>}
                />} />
            </Switch>
        </div>
    )
}
export default Router;
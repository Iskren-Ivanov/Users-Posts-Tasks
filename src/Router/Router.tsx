import Posts from "../components/Posts/Posts";
import Users from "../components/Users/Users";
import Tasks from "../components/Tasks/Tasks";
import Message from '../components/Message/Message';
import { Switch, Route } from 'react-router-dom';

const Router = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Users} />
                <Route path="/posts/:id" component={Posts} />
                <Route path="/tasks" component={Tasks} />
                <Route path="*" render={() => <Message
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    label="Back Home."
                />} />
            </Switch>
        </div>
    )
}
export default Router;
import { UseAuth } from '../customHooks';
import { withRouter } from 'react-router';

const WithAuth = (props) => UseAuth(props) && props.children;

export default withRouter(WithAuth);

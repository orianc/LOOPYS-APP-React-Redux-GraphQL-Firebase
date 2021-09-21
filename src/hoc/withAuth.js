import { UseAuth } from '../customHooks';

const WithAuth = (props) => UseAuth(props) && props.children;

export default WithAuth;

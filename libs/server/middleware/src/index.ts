import { auth } from './lib/auth';
import { verification } from './lib/verification';

const middleware = { auth, verification };

export default middleware;

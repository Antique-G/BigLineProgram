import { environment } from "./environments/environment";




let api=environment.baseUrl;

export class API{
    Admin_Login_Post_API=api+'/admin/login';
}


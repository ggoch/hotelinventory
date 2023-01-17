import {InjectionToken} from '@angular/core';
import { IAppConfig } from './appconfig.interface';
import { environment } from '../../../environments/environments'; 
 
export const APP_SERVICE_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const APP_CONFIG:IAppConfig = {
    apiEndpoint:environment.apiEndpoint
}
// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAaa = require('../../../app/service/aaa');
import ExportAppLicense = require('../../../app/service/appLicense');
import ExportBase = require('../../../app/service/base');
import ExportMember = require('../../../app/service/member');
import ExportSendEmail = require('../../../app/service/sendEmail');

declare module 'egg' {
  interface IService {
    aaa: AutoInstanceType<typeof ExportAaa>;
    appLicense: AutoInstanceType<typeof ExportAppLicense>;
    base: AutoInstanceType<typeof ExportBase>;
    member: AutoInstanceType<typeof ExportMember>;
    sendEmail: AutoInstanceType<typeof ExportSendEmail>;
  }
}

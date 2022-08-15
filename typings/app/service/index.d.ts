// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAaa = require('../../../app/service/aaa');
import ExportBase = require('../../../app/service/base');
import ExportMember = require('../../../app/service/member');

declare module 'egg' {
  interface IService {
    aaa: AutoInstanceType<typeof ExportAaa>;
    base: AutoInstanceType<typeof ExportBase>;
    member: AutoInstanceType<typeof ExportMember>;
  }
}

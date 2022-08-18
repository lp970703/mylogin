import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBase = require('../../../app/dao/base');
import ExportBaseDB = require('../../../app/dao/basedb');
import ExportTableUserMylogin = require('../../../app/dao/table/user/mylogin');
import ExportTableUserCycMobileLicense = require('../../../app/dao/table/user/cyc_mobile_license');

declare module 'egg' {
  interface IDao {
    base: AutoInstanceType<typeof ExportBase>;
    basedb: AutoInstanceType<typeof ExportBaseDB>;
    table: {
      user: {
        mylogin: AutoInstanceType<typeof ExportTableUserMylogin>;
        cycMobileLicense: AutoInstanceType<typeof ExportTableUserCycMobileLicense>;
      }
    }
  }
}

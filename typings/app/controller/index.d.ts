// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAppLicense = require('../../../app/controller/appLicense');
import ExportBase = require('../../../app/controller/base');
import ExportHome = require('../../../app/controller/home');
import ExportMember = require('../../../app/controller/member');
import ExportSendEmail = require('../../../app/controller/sendEmail');

declare module 'egg' {
  interface IController {
    appLicense: ExportAppLicense;
    base: ExportBase;
    home: ExportHome;
    member: ExportMember;
    sendEmail: ExportSendEmail;
  }
}

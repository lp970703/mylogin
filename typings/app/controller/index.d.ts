// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportHome = require('../../../app/controller/home');
import ExportMember = require('../../../app/controller/member');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    member: ExportMember;
  }
}

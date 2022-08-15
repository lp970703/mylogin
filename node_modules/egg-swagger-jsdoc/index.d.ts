import { Options } from 'swagger-jsdoc'

declare module 'egg' {
    interface EggAppConfig {
        swagger: Options,
    }
}

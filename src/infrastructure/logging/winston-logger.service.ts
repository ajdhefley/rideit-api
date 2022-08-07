import { addColors, createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { Colorizer, TransformableInfo } from 'logform';
import { LoggerService } from '@nestjs/common';
import { Configuration } from 'src/infrastructure/configuration';

export class WinstonLoggerService implements LoggerService {
    private winstonLogger: WinstonLogger;
    private colorizer: Colorizer;

    constructor(private config: Configuration) {
        this.winstonLogger = createLogger();
        this.colorizer = format.colorize();

        addColors({
            'level-error': 'bold red',
            'level-warn': 'bold yellow',
            'level-debug': 'bold blue',
            'level-info': 'bold white',
            'level-verbose': 'white',
            'message-error': 'red',
            'message-warn': 'yellow',
            'message-debug': 'blue',
            'message-info': 'white',
            'message-verbose': 'white',
            'date': 'grey'
        });

        if (config.isProduction) {
            this.winstonLogger.add(
                new transports.Console({
                    level: 'info',
                    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.printf((ti: TransformableInfo) => {
                        return ''
                            .concat(this.colorizer.colorize('date', ti.timestamp))
                            .concat(this.colorizer.colorize(`level-${ti.level}`, ` [${ti.level}] `))
                            .concat(this.colorizer.colorize(`message-${ti.level}`, ti.message));
                    }))
                })
            );
        }
        else {

        }

        // Log errors to target file
        this.winstonLogger.add(
            new transports.File({
                level: 'error',
                filename: 'logs/message.error.log',
                format: format.simple()
            })
        );

        // Log ALL messages to target file
        this.winstonLogger.add(
            new transports.File({
                filename: 'logs/message.log',
                format: format.simple()
            })
        );
    }

    error(message: any, ...optionalParams: any[]) {
        this.winstonLogger.error(message);
    }
    
    warn(message: any, ...optionalParams: any[]) {
        this.winstonLogger.warn(message);
    }
    
    debug(message: any, ...optionalParams: any[]) {
        this.winstonLogger.debug(message);
    }

    log(message: any, ...optionalParams: any[]) {
        this.winstonLogger.info(message);
    }
    
    verbose(message: any, ...optionalParams: any[]) {
        this.winstonLogger.verbose(message);
    }
}

package ro.uTech;

import org.apache.log4j.Logger;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

public class CustomAsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    private Logger logger = Logger.getLogger(getClass().getName());

    @Override
    public void handleUncaughtException(Throwable throwable, Method method, Object... obj) {

        logger.error("Exception message - " + throwable.getMessage(), throwable);
        logger.error(("Method name - " + method.getName()));
        for (Object param : obj) {
            logger.error(("Parameter value - " + param));
        }
    }

}
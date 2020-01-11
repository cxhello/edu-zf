package com.cxhello.edu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author CaiXiaoHui
 * @create 2020/1/11 13:00
 */
@Configuration
public class SessionConfiguration implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new SysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**","/js/**","/img/**")
                .excludePathPatterns("/toLogin")
                .excludePathPatterns("/login");
    }
}

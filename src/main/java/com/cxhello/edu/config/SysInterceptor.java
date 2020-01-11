package com.cxhello.edu.config;

import com.cxhello.edu.entity.User;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author CaiXiaoHui
 * @create 2020/1/11 12:58
 */
public class SysInterceptor extends HandlerInterceptorAdapter {

    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler)throws Exception {
        HttpSession session = request.getSession();
        User userInfo = (User) session.getAttribute("userInfo");
        if (userInfo != null) {
            return true;
        } else {
            response.sendRedirect(request.getContextPath() + "/toLogin");
            return false;
        }
    }
}

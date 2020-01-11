package com.cxhello.edu.controller;

import com.cxhello.edu.entity.Score;
import com.cxhello.edu.entity.User;
import com.cxhello.edu.utils.ZFsoft;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @author CaiXiaoHui
 * @create 2020/1/10 22:23
 */
@Controller
public class StudentController {

    @RequestMapping(value = {"/","/index"})
    public String index(Model model,HttpSession session){
        User userInfo = (User) session.getAttribute("userInfo");
        if (userInfo != null){
            ZFsoft zFsoft = new ZFsoft();
            List<Score> scoreList = zFsoft
                    .login(userInfo.getUsername(),userInfo.getPassword())
                    .checkScore(userInfo.getXnm(),userInfo.getXqm());
            model.addAttribute("scoreList",scoreList);
        }
        return "index";
    }

    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping("/login")
    public String getSoreList(String username, String password, String xnm, String xqm ,Model model,HttpSession session){
        List<Score> scoreList = null;
        try {
            ZFsoft zFsoft = new ZFsoft();
            scoreList = zFsoft
                    .login(username,password)
                    .checkScore(xnm,xqm);
            User userInfo = new User();
            if (scoreList.size() == 0){
                throw new RuntimeException();
            }
            userInfo.setUsername(username);
            userInfo.setPassword(password);
            userInfo.setXnm(xnm);
            userInfo.setXqm(xqm);
            session.setAttribute("userInfo",userInfo);
            model.addAttribute("scoreList",scoreList);
            return "index";
        } catch (Exception e) {
            model.addAttribute("message","没有查询到您的成绩信息或学号、密码不正确！");
            e.printStackTrace();
        }
        return "login";
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session){
        User userInfo = (User) session.getAttribute("userInfo");
        if(userInfo != null) {
            session.removeAttribute("userInfo");
        }
        return "redirect" + "/toLogin";
    }

}

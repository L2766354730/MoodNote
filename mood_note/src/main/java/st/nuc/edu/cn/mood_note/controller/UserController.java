package st.nuc.edu.cn.mood_note.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RestController;
import st.nuc.edu.cn.mood_note.config.AppConfig;
import st.nuc.edu.cn.mood_note.service.UserService;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/login")
    public Object login(String nickName, String avatarUrl, String code) {

        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();

            String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + AppConfig.appId + "&secret=" + AppConfig.secret + "&js_code=" + code + "&grant_type=authorization_code";
            HttpGet get = new HttpGet(url);
            CloseableHttpResponse response = httpclient.execute(get);
            String result = EntityUtils.toString(response.getEntity(), "utf-8");
            JSONObject json = JSONObject.parseObject(result);
            if (!json.containsKey("errcode")) {
                String openid = json.getString("openid");
                Object object = userService.operate(openid);
                if(userService.operate(openid) != null) {
                    return object;
                }
                return null;
            }
            return "false";

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "error";
    }
}
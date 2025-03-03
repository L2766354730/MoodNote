package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.mapper.UserMapper;
import st.nuc.edu.cn.mood_note.entity.User;
import st.nuc.edu.cn.mood_note.service.UserService;

import java.util.UUID;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    @Override
    public Object operate(String openid) {
        User user = userMapper.select(openid);
        if (user != null) {
            JSONObject object = new JSONObject();
            object.put("uid",user.getUid());
            return object;
        } else {
            String uid = UUID.randomUUID().toString();
            User user1 = new User(uid, openid);
            boolean b = userMapper.add(user1);
            if (b == true) {
                JSONObject object = new JSONObject();
                object.put("uid",user.getUid());
                return object;
            } else {
                return null;
            }

        }
    }


}

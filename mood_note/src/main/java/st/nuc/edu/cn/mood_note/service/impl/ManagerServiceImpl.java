package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.entity.Manager;
import st.nuc.edu.cn.mood_note.mapper.ManagerMapper;
import st.nuc.edu.cn.mood_note.service.ManagerService;

@Component
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    ManagerMapper managerMapper;

    @Override
    public Object operate(String openid, String password) {
        if (password.equals("123456")) {
            Manager manager = managerMapper.select(openid);
            if (manager != null) {
                JSONObject object = new JSONObject();
                object.put("mid", manager.getMid());
                return object;
            } else {
                boolean b = managerMapper.add(openid);
                if (b == true) {
                    JSONObject object = new JSONObject();
                    Manager manager1 = managerMapper.select(openid);
                    object.put("mid", manager1.getMid());
                    return object;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    }
}

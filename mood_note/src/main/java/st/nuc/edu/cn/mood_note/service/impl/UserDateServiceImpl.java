package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.entity.UserDate;
import st.nuc.edu.cn.mood_note.mapper.UserDateMapper;
import st.nuc.edu.cn.mood_note.service.UserDateService;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Component
public class UserDateServiceImpl implements UserDateService {
    @Autowired
    UserDateMapper userDateMapper;
    @Override
    public Object gDateMood(String uid, String date) {
        UserDate userDate = userDateMapper.gDateMood(uid, date);
        if (userDate != null) {
            JSONObject object = new JSONObject();
            object.put("daymood",userDate.getDateMood());
            return object;
        } else {
            return null;
        }
    }

    @Override
    public boolean mixOperate(UserDate userDate) {
        UserDate userDate1 = userDateMapper.gDateMood(userDate.getUid(), userDate.getDate());
        if (userDate1 == null) {
            return userDateMapper.insert(userDate);
        } else {
            return userDateMapper.update(userDate);
        }
    }

    @Override
    public Object selectAllMood(String uid, String year, String month) {
        int month1 = Integer.parseInt(month);
        String s = null;
        if ((month1>0)&&(month1<10)) {
            s = "0" + month1;
        } else {
            s = month;
        }
        List<UserDate> userDateList = userDateMapper.gAllDateMood(uid, year, s);
        if(!userDateList.isEmpty()) {
            List<String> moodList = new ArrayList();
            JSONObject object = new JSONObject();
            for (UserDate userDate : userDateList) {
                if (userDate.getDateMood() == null) {
                    moodList.add(null);
                } else {
                    moodList.add(userDate.getDateMood());
                }
            }
            object.put("moodList", moodList);
            return object;
        }
        return null;
    }
}

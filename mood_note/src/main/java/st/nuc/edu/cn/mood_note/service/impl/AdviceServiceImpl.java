package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.mapper.AdviceMapper;
import st.nuc.edu.cn.mood_note.entity.Advice;
import st.nuc.edu.cn.mood_note.mapper.ExtraMapper;
import st.nuc.edu.cn.mood_note.service.AdviceService;
import java.util.ArrayList;
import java.util.List;

@Component
public class AdviceServiceImpl implements AdviceService {
    @Autowired
    AdviceMapper adviceMapper;
    @Autowired
    ExtraMapper extraMapper;


    @Override
    public Object showList(int mid) {
        if (extraMapper.select(mid) == null) {
            return null;
        }
        List<Object> simpleList = new ArrayList();
        List<Advice> adviceList = adviceMapper.showList();
        JSONObject object1 = new JSONObject();
        if(!adviceList.isEmpty()) {
            for (Advice advice : adviceList) {
                JSONObject object = new JSONObject();
                String s = null;
                String context = advice.getContext();
                if (context.length() > 11) {
                    s = context.substring(0,12);
                } else {
                    s = context.substring(0, context.length());
                }

                object.put("aid", advice.getAid());
                object.put("date", advice.getDate());
                object.put("context", s);

                simpleList.add(object);

            }
            object1.put("adviceList", simpleList);
        }
        return object1;
    }

    @Override
    public Object showOne(int aid) {
        Advice advice = adviceMapper.showOne(aid);
        if (advice == null) {
            return null;
        } else {
            adviceMapper.updateRead(aid, "true");
            JSONObject object = new JSONObject();
            object.put("context", advice.getContext());
            return object;
        }
    }

    @Override
    public boolean addAdvice(int mid, String date, String context) {
        if (extraMapper.select(mid) == null) {
            return false;
        }
        return adviceMapper.addAdvice(date, context);
    }

    @Override
    public Object mshowOne(int aid, int mid) {
        if (extraMapper.select(mid) == null) {
            return null;
        }
        Advice advice = adviceMapper.showOne(aid);
        if (advice == null) {
            return null;
        } else {
            JSONObject object = new JSONObject();
            object.put("context", advice.getContext());
            return object;
        }
    }

    @Override
    public Object ushowList(String uid) {
        if (extraMapper.selectUser(uid) == null){
            return null;
        }
        List<Object> simpleList = new ArrayList();
        List<Advice> adviceList = adviceMapper.showList();
        JSONObject object1 = new JSONObject();
        if(!adviceList.isEmpty()) {
            for (Advice advice : adviceList) {
                JSONObject object = new JSONObject();
                String s = null;
                String context = advice.getContext();
                if (context.length() > 11) {
                    s = context.substring(0,12);
                } else {
                    s = context.substring(0, context.length());
                }

                object.put("aid", advice.getAid());
                object.put("date", advice.getDate());
                object.put("isRead",advice.getIsRead());
                object.put("context", s);

                simpleList.add(object);

            }
            object1.put("adviceList", simpleList);
        }
        return object1;
    }
}

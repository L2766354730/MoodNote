package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.mapper.FeedBackMapper;
import st.nuc.edu.cn.mood_note.entity.FeedBack;
import st.nuc.edu.cn.mood_note.mapper.Simple2Mapper;
import st.nuc.edu.cn.mood_note.mapper.SimpleMapper;
import st.nuc.edu.cn.mood_note.service.FeedBackService;
import java.util.ArrayList;
import java.util.List;

@Component
public class FeedBackServiceImpl implements FeedBackService {
    @Autowired
    FeedBackMapper feedBackMapper;
    @Autowired
    SimpleMapper simpleMapper;
    @Autowired
    Simple2Mapper simple2Mapper;

    @Override
    public boolean add(String uid, String date, String context) {
        return feedBackMapper.add(uid, date, context);
    }

    @Override
    public boolean mupdate(int mid, int fid, String rdate, String rcontext) {
        return feedBackMapper.mupdate(fid, rdate, rcontext);
    }

    @Override
    public Object getFeedBackContext(int fid) {
        FeedBack feedBack = feedBackMapper.getFeedBack(fid);
        JSONObject object = new JSONObject();
        object.put("context", feedBack.getContext());
        return object;
    }

    @Override
    public Object rshowFeedBack(int fid) {
        FeedBack feedBack = feedBackMapper.getFeedBack(fid);
        JSONObject object = new JSONObject();
        object.put("context", feedBack.getContext());
        object.put("rcontext", feedBack.getRcontext());
        object.put("rdate", feedBack.getRdate());
        return object;
    }

    @Override
    public Object respondedList(int mid) {
        if (feedBackMapper.respondedList() == null) {
            return null;
        }
        List<Object> simpleList = new ArrayList();
        List<FeedBack> feedBackList = feedBackMapper.respondedList();
        JSONObject object1 = new JSONObject();
        if(!feedBackList.isEmpty()) {
            for (FeedBack feedBack : feedBackList) {
                JSONObject object = new JSONObject();
                String s = null;
                String context = feedBack.getContext();
                if (context.length() > 11) {
                    s = context.substring(0,12);
                } else {
                    s = context.substring(0, context.length());
                }

                object.put("fid", feedBack.getFid());
                object.put("date", feedBack.getDate());
                object.put("context", s);

                simpleList.add(object);

            }
            object1.put("respondedList", simpleList);
        }
        return object1;
    }

    @Override
    public Object feedList(int mid) {
        if (feedBackMapper.respondedList() == null) {
            return null;
        }
        List<Object> simpleList = new ArrayList();
        List<FeedBack> feedBackList = feedBackMapper.feedList();
        JSONObject object1 = new JSONObject();
        if(!feedBackList.isEmpty()) {
            for (FeedBack feedBack : feedBackList) {
                JSONObject object = new JSONObject();
                String s = null;
                String context = feedBack.getContext();
                if (context.length() > 11) {
                    s = context.substring(0,12);
                } else {
                    s = context.substring(0, context.length());
                }

                object.put("fid", feedBack.getFid());
                object.put("date", feedBack.getDate());
                object.put("context", s);

                simpleList.add(object);

            }
            object1.put("feedbackList", simpleList);
        }
        return object1;
    }

    @Override
    public Object showFeedBack(int fid) {
        FeedBack feedBack = feedBackMapper.getFeedBack(fid);
        feedBackMapper.updateRead(fid,"true");
        JSONObject object = new JSONObject();
        object.put("context", feedBack.getContext());
        object.put("rcontext", feedBack.getRcontext());
        object.put("date", feedBack.getDate());
        return object;
    }

    @Override
    public Object showFeedBackList(String uid) {
        if (simple2Mapper.selectUser(uid) == null){
            return null;
        }
        List<Object> simpleList = new ArrayList();
        List<FeedBack> feedBackList = feedBackMapper.showFeedBackList();
        JSONObject object1 = new JSONObject();
        if(!feedBackList.isEmpty()) {
            for (FeedBack feedBack : feedBackList) {
                JSONObject object = new JSONObject();
                String s = null;
                String rcontext = feedBack.getRcontext();
                if (rcontext != null) {
                    if (rcontext.length() > 11) {
                        s = rcontext.substring(0, 12);
                    } else {
                        s = rcontext.substring(0, rcontext.length());
                    }
                }

                object.put("fid", feedBack.getFid());
                object.put("rdate", feedBack.getRdate());
                object.put("rcontext", s);
                object.put("isRead", feedBack.getIsRead());

                simpleList.add(object);

            }
            object1.put("feedbackList", simpleList);
        }
        return object1;
    }


}

package st.nuc.edu.cn.mood_note.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import st.nuc.edu.cn.mood_note.entity.UserDate;
import st.nuc.edu.cn.mood_note.service.UserDateService;

@RestController
public class UserDateController {
    @Autowired
    UserDateService userDateService;

    @RequestMapping("/gDateMood")
    public Object gDateMood(String uid, String date) {
        return userDateService.gDateMood(uid, date);
    }

    @RequestMapping("/mixOperate")
    public void mixOperate(UserDate userDate) {
        userDateService.mixOperate(userDate);
    }

    @RequestMapping("/selectAllMood")
    public Object selectAllMood(String uid, String year, String month) {
        return userDateService.selectAllMood(uid, year, month);
    }

}

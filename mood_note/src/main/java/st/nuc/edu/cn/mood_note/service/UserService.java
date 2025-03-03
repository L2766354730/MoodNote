package st.nuc.edu.cn.mood_note.service;

import org.springframework.stereotype.Service;


@Service
public interface UserService {

    Object operate(String openid);
}

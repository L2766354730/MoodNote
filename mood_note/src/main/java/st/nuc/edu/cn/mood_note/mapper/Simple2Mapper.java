package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import st.nuc.edu.cn.mood_note.entity.Manager;
import st.nuc.edu.cn.mood_note.entity.User;

@Mapper
public interface Simple2Mapper {
    @Select("select * from user where uid = #{uid}")
    User selectUser(@Param("uid") String uid);
}

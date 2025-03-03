package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import st.nuc.edu.cn.mood_note.entity.User;

@Mapper
public interface UserMapper {
    @Select("select * from user where openid = #{openid}")
    User select(@Param("openid") String openid);
    @Insert("insert into user (openid,uid) values (#{openid},#{uid})")
    boolean add(User user);
}

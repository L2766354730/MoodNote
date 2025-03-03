package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import st.nuc.edu.cn.mood_note.entity.Manager;

@Mapper
public interface ManagerMapper {
    @Select("select * from manager where openid = #{openid}")
    Manager select(@Param("openid") String openid);
    @Insert("insert into manager (openid) values (#{openid})")
    boolean add(@Param("openid")String openid);
}

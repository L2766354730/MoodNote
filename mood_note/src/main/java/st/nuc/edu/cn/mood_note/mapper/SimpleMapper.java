package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import st.nuc.edu.cn.mood_note.entity.Manager;

@Mapper
public interface SimpleMapper {
    @Select("select * from manager where mid = #{mid}")
    Manager select(@Param("mid") int mid);
}

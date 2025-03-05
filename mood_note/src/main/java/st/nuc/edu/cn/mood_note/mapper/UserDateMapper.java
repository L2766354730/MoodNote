package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.*;
import st.nuc.edu.cn.mood_note.entity.UserDate;

import java.util.List;

@Mapper
public interface UserDateMapper {
    @Select("select * from user_date where uid = #{uid} and date = #{date}")
    UserDate gDateMood(@Param("uid")String uid, @Param("date")String date);

    List<UserDate> gAllDateMood(@Param("uid")String uid, @Param("year")String year, @Param("month")String month);

    @Insert("insert into user_date (uid,date,date_mood) values (#{uid},#{date},#{dateMood})")
    boolean insert(UserDate userDate);

    @Update("update user_date set date_mood=#{dateMood} where uid = #{uid} and date = #{date}")
    boolean update(UserDate userDate);

}


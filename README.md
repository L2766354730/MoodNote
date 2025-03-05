# MoodNote

### 项目概述

心情笔记小程序是一个帮助用户记录每日心情和笔记的应用。用户可以通过小程序记录每天的心情状态和笔记内容，并查看历史记录。该项目分为前端和后端两部分，前端使用微信小程序开发，后端使用Spring Boot框架。

### 运行环境

- **后端**：Java 8+，Spring Boot 2.x，MySQL 5.7+
- **前端**：微信开发者工具

### 运行步骤

#### 1. 后端程序运行

1. **克隆项目**：将项目代码克隆到本地。

   bash

   复制

   ```
   git clone <项目仓库地址>
   ```

2. **配置数据库**：

   - 在MySQL中创建名为`mood_note`的数据库。

   - 修改`application.yaml`文件中的数据库连接信息，确保与本地MySQL配置一致。

     yaml

     复制

     ```
     spring:
       datasource:
         url: jdbc:mysql://localhost:3306/mood_note?useUnicode=true&characterEncoding=utf8&useSSL=false
         username: root
         password: 123456
     ```

3. **启动后端服务**：

   - 在项目根目录下运行以下命令启动Spring Boot应用：

     bash

     复制

     ```
     mvn spring-boot:run
     ```

   - 确保后端服务在`localhost:8080`上正常运行。

#### 2. 前端小程序运行

1. **打开微信开发者工具**：
   - 下载并安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. **导入项目**：
   - 打开微信开发者工具，选择“导入项目”，选择前端代码所在的目录。
   - 确保AppID已正确配置（可以使用测试号）。
3. **配置后端地址**：
   - 在前端代码中，找到`main.js`文件，确保`app.globalData.url`指向后端服务的地址（如`http://localhost:8080`）。
4. **编译运行**：
   - 点击微信开发者工具中的“编译”按钮，确保没有错误。
   - 点击“预览”按钮，生成小程序二维码。

#### 3. 手机端使用

1. **扫描二维码**：
   - 使用微信扫描开发者工具生成的小程序二维码。
2. **使用小程序**：
   - 在手机上打开小程序，即可开始记录心情和笔记。

### 注意事项

- 确保后端服务在运行状态，前端小程序才能正常访问数据。
- 如果后端服务部署在远程服务器，请确保服务器端口开放，并修改前端代码中的`app.globalData.url`为服务器地址。
- 数据库初始化时，确保表结构与项目中的`UserDateMapper.xml`和实体类一致。

### 项目结构

- **后端**：Spring Boot项目，包含控制器、服务、数据访问层等。
- **前端**：微信小程序项目，包含页面、组件、工具类等。
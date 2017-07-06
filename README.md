# my-webpack2-config
## 写这个仓库的目的

1.学习亲手配置webpack。

    · 熟悉各配置属性的作用
    · 了解各loader和plugin之间的相互配合
    · 按照开发环境编写配置文件和编译命令
    · 了解怎么使用更好的方法优化分割依赖库和开发代码

2.方便今后新建项目时能够快速配置使用（当然，这个目的貌似要重要一些😄）

## 使用

1.npm install，惯例

2.npm run build:dll，使用dllPlugin和dllReferencePlugin对第三方库进行分离，这样最后打包以后的代码会大大缩小，同时打包效率也提高了

3.npm命令解释

        npm run start       --本地环境
        npm run build:dev   --模拟正式环境的打包，包含map文件
        npm run build:prod  --正式环境打包，去掉map文件、console、文件中的注释
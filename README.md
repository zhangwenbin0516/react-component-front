# react-component-front

### webpack配置

* 开发依赖包

        webpack 基础工具    
        webpack-dev-server 本地开发服务   
        webpack 打包依赖库
    
* 文件目录说明

        build  webpack配置
        dist   打包输出
        src    项目主目录
        
* webpack参数说明

        --config 执行另一份配置文件
        --watch 监听文件并执行打包
        -p 混淆脚本
        -d 生产map映射文件
        --progress 显示进度条
        --color 添加颜色
        --open 启动打开浏览器
        
* [webpack指导文档](https://www.webpackjs.com)

* React钩子介绍

        1.组件在初始化时触发的5个钩子函数
        
        getDefaultProps()       设置默认的props，也可以用dufaultProps设置组件的默认属性
        getInitialState()       class语法时是没有这个钩子函数的，在constructor中定义this.state
        componentWillMount()    组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state
        render()                react创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state
        componentDidMount()     组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次
        
        2.组件在数据更新时触发的5个钩子函数
        
        componentWillReceivePorps(nextProps)        组件初始化时不调用，组件接受新的props时调用
        shouldComponentUpdate(nextProps, nextState) 组件接受新的state或者props时调用
        componentWillUpdata(nextProps, nextState)   组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
        componentDidUpdate()                        组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点
        componentWillUnmount()                      组件将要卸载时调用，一些事件监听和定时器需要在此时清除
 
 * Redux介绍

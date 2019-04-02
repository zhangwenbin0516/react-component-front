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
 
        redux主要有store、reducer、action组成
        
        1. store是一个对象，主要由四个函数组成
        
        1> dispatch
        用于action的分发，在createStore中可以用middleware中间件对dispatch进行改造
        
        2> subscribe
        监听state的变化,函数在store调用dispatch时会注册一个listener监听state变化，当我们需要知道state是否变化时可以调用
        
        3> getState
        获取store中的state,getState主要在两个地方需要用到，一是在dispatch拿到action后store需要用它来获取state里的数据，并把这个数据传给reducer，这个过程是自动执行的，二是在我们利用subscribe监听到state发生变化后调用它来获取新的state数据
        
        4> replaceReducer
        替换reducer，改变state修改的逻辑
        
        2. action是一个对象，其中type属性是必须的，同时可以传入一些数据,action可以用actionCreactor进行创造,dispatch就是把action对象发送出去
        
        3. reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，state树中有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义

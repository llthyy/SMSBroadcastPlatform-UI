module.exports = {
    // publicPath:'',
    // 打包时去掉.map文件
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
}
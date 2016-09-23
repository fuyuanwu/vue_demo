$.extend(window[RO], {
    // 为了检测一个对象的类型，强烈推荐使用 Object.prototype.toString 方法； 因为这是唯一一个可依赖的方式。typeof 的一些返回值在标准文档中并未定义， 因此不同的引擎实现可能不同。除非为了检测一个变量是否已经定义，我们应尽量避免使用 typeof 操作符。
    type: function(stuff) {
        return Object.prototype.toString.call(stuff).slice(8, -1).toLowerCase();
    }
});
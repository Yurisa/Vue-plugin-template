import PluginComponent from './vue-plugin.vue'

let Plugin = {}

Plugin.install = (Vue, options) => {
    var opt = {
        duration:3000
    }
    for(let key in options){
        opt[key] = options[key];
    }
    Vue.prototype.$plugin = (message, options) => {
        if(typeof options == 'object'){
            for(let key in options){
                opt[key] = options[key];
            }
        }
        const pluginController = Vue.extend(PluginComponent);
        var instance = new pluginController().$mount(document.createElement("div"));
        instance.message = message;
        instance.visible = true;
        document.body.appendChild(instance.$el);
        setTimeout(() => {
            instance.visible = false;
            document.body.removeChild(instance.$el);
        }, opt.duration);
    }
    Vue.prototype.$plugin['show'] = (message, options) => {
        Vue.prototype.$plugin(message, options) 
    }
}

if(window.Vue){
    Vue.use(Plugin)
}
export default Plugin
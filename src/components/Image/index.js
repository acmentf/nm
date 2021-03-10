import MyImage from './MyImage.vue';

const ImageComponents  = {
    install:function(Vue) {
        Vue.component('MyImage', MyImage)
    }
}

export default ImageComponents;
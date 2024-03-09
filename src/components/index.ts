import svgIcon from '@/components/SvgIcon/index.vue'
import child from '@/components/child/index.vue'
const allGlobalComponents: any = { 
    svgIcon,child
}
export default {
    install(app:any) {
        Object.keys(allGlobalComponents).forEach((key) => {
            app.component(key, allGlobalComponents[key] )
        })}
}

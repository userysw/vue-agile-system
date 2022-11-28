const components: any = {}
const files = import.meta.glob('./*/*.vue')
Object.keys(files).forEach((file) => {
    const name = 'vv-' + file.replace(/\.\/|\.vue/g, '').split('/')[0];
    components[name] = files[file];
})

export default components